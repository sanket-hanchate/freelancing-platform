import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const PostProjectApp = () => {

    const navigate = useNavigate();

    const [project, setProject] = useState({
        title: '',
        description: '',
        budget: '',
        category: '',
        imgUrl: '',
        postedBy: ''
    });

    const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        const payload = {
            title: project.title,
            banner_url: project.imgUrl,
            description: project.description,
            max_budget: project.budget,
            category: project.category,
            posted_by: project.postedBy
        };

        const res = await fetch("http://localhost:3000/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert("✅ Project Posted Successfully!");
            navigate("/projects");
        } else {
            alert("❌ Failed to post project.");
        }
    };

    return (
        <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
                Create a New Project Listing
            </h1>
            
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-xl transition-all duration-300 hover:shadow-3xl border border-blue-100"
            >
                <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-100 pb-2">
                    Project Details
                </h2>

                <InputField 
                    label="Project Title"
                    name="title"
                    value={project.title}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g., Custom WordPress Theme Development"
                    required
                />
                
                <InputField 
                    label="Banner Image URL"
                    name="imgUrl"
                    value={project.imgUrl}
                    onChange={handleChange}
                    type="url"
                    placeholder="e.g., https://example.com/project-image.png"
                />

                <label className="block mb-6">
                    <span className="text-gray-700 font-semibold mb-2 block">Description</span>
                    <textarea
                        name="description"
                        value={project.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none"
                        placeholder="Describe the scope, deliverables, and requirements for the project."
                        required
                    />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InputField 
                        label="Maximum Budget ($)"
                        name="budget"
                        value={project.budget}
                        onChange={handleChange}
                        type="number"
                        placeholder="e.g., 2500"
                        min="1"
                        required
                    />

                    <label className="block">
                        <span className="text-gray-700 font-semibold mb-2 block">Category</span>
                        <select
                            name="category"
                            value={project.category}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition duration-150"
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Design">Design</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Writing">Writing / Content</option>
                            <option value="Marketing">Marketing & Sales</option>
                        </select>
                    </label>
                </div>

                <InputField 
                    label="Posted By (Your Name/Company)"
                    name="postedBy"
                    value={project.postedBy}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g., Blogging Platform"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl mt-8 hover:bg-blue-700 transition duration-200 transform hover:scale-[1.01] shadow-lg shadow-blue-200"
                >
                    Post Project Listing
                </button>
            </form>
        </div>
    );
}

const InputField = ({ label, name, value, onChange, type, placeholder, required, ...props }) => (
    <label className="block mb-6">
        <span className="text-gray-700 font-semibold mb-2 block">{label}</span>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            placeholder={placeholder}
            required={required}
            {...props}
        />
    </label>
);

export default PostProjectApp;