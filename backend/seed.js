const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const { DEFAULT_PROJECTS } = require('./seedData'); // Import your data

const dbPath = path.join(__dirname, './database/database.db');

const seedProjects = async () => {
    let database = null;

    try {
        // 1. Open the database connection
        database = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log('✅ Database connection successful.');

        // 2. Check if the default projects have already been added
        // We use the custom string ID 'def-101' as a marker
        const markerProject = await database.get("SELECT id FROM projects WHERE posted_by = 'GlobalCommerce Inc.'");

        if (markerProject) {
            console.log('ℹ️ Default projects already exist in the database. Skipping seed.');
            return;
        }

        console.log(`Starting to insert ${DEFAULT_PROJECTS.length} default projects...`);

        // 3. Prepare the SQL statement for insertion
        const insertQuery = `
            INSERT INTO projects (title, banner_url, description, max_budget, category, posted_by)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        // We use a transaction for speed and reliability
        await database.run("BEGIN TRANSACTION");

        // 4. Loop through the data and execute the insert statement
        for (const project of DEFAULT_PROJECTS) {
            // Note: We are letting SQLite auto-increment the ID, 
            // but you might want to consider adding time_commitment and level columns to your DB schema
            await database.run(insertQuery, [
                project.title,
                project.banner_url,
                project.description,
                project.max_budget,
                project.category,
                project.posted_by // Use posted_by as a unique marker if needed
            ]);
        }

        await database.run("COMMIT");
        console.log(`🎉 Successfully inserted ${DEFAULT_PROJECTS.length} default projects.`);

    } catch (e) {
        if (database) {
            await database.run("ROLLBACK");
        }
        console.error(`❌ DB Seeding Failed: ${e.message}`);
    } finally {
        if (database) {
            await database.close();
            console.log('Database connection closed.');
        }
    }
};

seedProjects();