const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const JWT_SECRET = "sanketbro";

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Use ONE database for both users and projects
const dbPath = path.join(__dirname, './database/database.db');
let database = null;

// ✅ Initialize DB and Create Tables
const initializeServer = async () => {
  try {
    database = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    await database.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        email TEXT,
        role TEXT,
        location TEXT,
        skills TEXT
      )
    `);

    await database.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        banner_url TEXT,
        description TEXT,
        max_budget REAL,  
        category TEXT,
        posted_by TEXT
      )
    `);

    await database.run(`
        CREATE TABLE IF NOT EXISTS proposals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        freelancer_username TEXT,
        proposal_text TEXT,
        bid_amount REAL,
        delivery_time TEXT,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
      `);

    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });

  } catch (e) {
    console.error(`❌ DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeServer();


// ✅ Signup Route
app.post('/signup', async (req, res) => {
  const { username, password, email, role, location, skills } = req.body;

  try {
    const existingUser = await database.get('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await database.run(
      `INSERT INTO users (username, password, email, role, location, skills) VALUES (?, ?, ?, ?, ?, ?)`,
      [username, hashedPassword, email, role, location, skills]
    );

    res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await database.get('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid username or password" });

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Get Profile
app.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await database.get(
      'SELECT id, username, email, role, location, skills FROM users WHERE username=?',
      [decoded.username]
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);

  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
});


// ✅ Update Profile
app.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, JWT_SECRET);

    const { email, role, location, skills, password } = req.body;

    const updates = [];
    const values = [];

    if (email) { updates.push("email = ?"); values.push(email); }
    if (role) { updates.push("role = ?"); values.push(role); }
    if (location) { updates.push("location = ?"); values.push(location); }
    if (skills) { updates.push("skills = ?"); values.push(skills); }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push("password = ?");
      values.push(hashedPassword);
    }

    if (updates.length === 0) return res.status(400).json({ message: "No fields to update" });

    values.push(decoded.username);

    const query = `UPDATE users SET ${updates.join(", ")} WHERE username = ?`;
    await database.run(query, values);

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Create Project
app.post('/projects', async (req, res) => {
  try {
    const { title, banner_url, description, max_budget, category, posted_by } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const result = await database.run(
      `INSERT INTO projects (title, banner_url, description, max_budget, category, posted_by)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, banner_url, description, max_budget, category, posted_by]
    );

    res.status(201).json({ message: "Project added successfully", id: result.lastID });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// ✅ Fetch All Projects
app.get('/projects', async (req, res) => {
  try {
    const projects = await database.all(`SELECT * FROM projects ORDER BY id DESC`);
    res.status(200).json(projects);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/proposals", (req, res) => {
  const { project_id, freelancer_username, proposal_text, bid_amount, delivery_time } = req.body;

  if (!project_id || !freelancer_username || !proposal_text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    INSERT INTO proposals (project_id, freelancer_username, proposal_text, bid_amount, delivery_time)
    VALUES (?, ?, ?, ?, ?)
  `;

  database.run(
    query,
    [project_id, freelancer_username, proposal_text, bid_amount, delivery_time],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database insert failed" });
      }
      res.status(201).json({ success: true, proposal_id: this.lastID });
    }
  );
});

// Get a single project by ID
app.get("/projects/:id", async (req, res) => {
  try {
    const projectId = req.params.id;

    const row = await database.get(
      "SELECT * FROM projects WHERE id = ?",
      [projectId]
    );

    if (!row) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(row);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

