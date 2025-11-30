import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomNavbar from "../CustomNavbar/CustomNavbar";
import ProjectsNavbar from "../ProjectsNavbar/ProjectsNavbar";

// --- Default Project Data ---
const DEFAULT_PROJECTS = [
    {
        id: 'def-101',
        category: 'Web Development',
        title: 'High-Performance E-commerce Platform Build',
        description: 'Develop a custom, scalable e-commerce website using Next.js and headless commerce APIs.',
        max_budget: 6500,
        posted_by: 'GlobalCommerce Inc.',
        banner_url: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=',
    },
    {
        id: 'def-102',
        category: 'Design',
        title: 'Mobile App UI/UX Redesign',
        description: 'Complete redesign of an existing fitness tracking mobile app to improve user engagement and usability.',
        max_budget: 3200,
        posted_by: 'FitTrack Solutions',
        banner_url: 'https://www.aufaitux.com/wp-content/uploads/2020/05/UIUX-designing-1.jpg',
    },
    {
        id: 'def-103',
        category: 'Content Writing',
        title: 'SEO-Optimized Tech Blog Content',
        description: 'Need a writer for 10 high-quality, long-form articles focused on AI and Machine Learning trends.',
        max_budget: 1800,
        posted_by: 'AITrends Magazine',
        banner_url: 'https://media.istockphoto.com/id/902787158/photo/woman-hands-with-pen-writing-on-notebook-in-the-office.jpg?s=612x612&w=0&k=20&c=AFrTZ8bU1XrEifN4GU57k9PK8HYd3a3whGB_0pFp29E=',
    },
    {
        id: 'def-104',
        category: 'Data Science',
        title: 'Predictive Sales Forecasting Model',
        description: 'Build and validate a Python-based predictive model to forecast quarterly sales based on historical data.',
        max_budget: 4800,
        posted_by: 'DataCorp Analysts',
        banner_url: 'https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D',
    },
    // Add more categories and projects as needed (e.g., Marketing & Sales, Others)
    {
        id: 'def-105',
        category: 'Web Development',
        title: 'Landing Page Optimization & A/B Testing',
        description: 'Design and implement two variations of a landing page for conversion rate optimization.',
        max_budget: 900,
        posted_by: 'Marketing Pros',
        banner_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUaWanp_Q6Glp0JGy1eHZ-QJ-iBnoCk5SDQ&s',
    },
    {
        id: 'def-106',
        category: 'Marketing & Sales',
        title: 'Google Ads Campaign Setup & Management',
        description: 'Set up, launch, and manage a new search and display campaign for a SaaS product launch.',
        max_budget: 2100,
        posted_by: 'CloudStartups LLC',
        banner_url: 'https://img.freepik.com/premium-photo/marketing-digital-technology-business-concept-uds_31965-305041.jpg?semt=ais_hybrid&w=740&q=80',
    },
    {
        id: 'def-107',
        category: 'Design',
        title: '3D Mockup and Animation for Product',
        description: 'Create photorealistic 3D models and short animated videos for a new line of electronic gadgets.',
        max_budget: 4500,
        posted_by: 'Gadget Makers',
        banner_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMWrU085MStjVj16kgKsQsOStea_8oQshrw&s',
    },
    {
        id: 'def-108',
        category: 'Web Development',
        title: 'Backend API Migration to Microservices',
        description: 'Migrate a monolithic Python/Django backend to a modern, scalable microservices architecture using Docker and Kubernetes.',
        max_budget: 8000,
        posted_by: 'Tech Innovators',
        banner_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhbANFPDI-qc0tGsjwG1G6xt10TfN5ktd6fSTIBkctbXqli6wxJuLhnZF5PZ7sgW1AbhI&usqp=CAU',
    },
    {
        id: 'def-109',
        category: 'Writing / Content',
        title: 'E-book Ghostwriting: Finance Guide',
        description: 'Write a comprehensive 50-page e-book on personal finance and investment strategies.',
        max_budget: 2800,
        posted_by: 'Finance Educators',
        banner_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbe9etU76MCMG2JSOTXp3ZRReTmm4rMjH7G-sckrUQGHRhAAY5pc1n6ZWTWia4Xc3NKg&usqp=CAU',
    },
    {
        id: 'def-110',
        category: 'Data Science',
        title: 'Natural Language Processing (NLP) Sentiment Analysis',
        description: 'Develop an NLP model to analyze customer sentiment from social media posts and reviews.',
        max_budget: 5500,
        posted_by: 'SocialMetrics Co.',
        banner_url: 'https://t4.ftcdn.net/jpg/04/11/50/99/360_F_411509944_NHQwlYfg1td6fBQyyHLdlfltmlv8cmAp.jpg',
    },
    {
        id: 'def-111',
        category: 'Marketing & Sales',
        title: 'LinkedIn Lead Generation Strategy',
        description: 'Develop and execute a targeted LinkedIn strategy to generate qualified B2B sales leads.',
        max_budget: 1500,
        posted_by: 'B2B Connect',
        banner_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPbJ7WXVETcz7uB1CX2QIYbLNVWNzKG30uCKLTGv-EafibbYfkLs0fMy5_oDi2L-eNIyY&usqp=CAU',
    },
    {
        id: 'def-112',
        category: 'Design',
        title: 'Company Rebranding & Style Guide',
        description: 'Create a new logo, color palette, typography, and a detailed brand style guide.',
        max_budget: 3800,
        posted_by: 'Brand Revival',
        banner_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHG-x5a01GBmiV1FfYtVAYBXVONe59xILgsw&s',
    },
    {
        id: 'def-113',
        category: 'Web Development',
        title: 'Accessibility Audit (WCAG 2.1) & Implementation',
        description: 'Conduct a full accessibility audit of existing corporate site and implement required changes to meet WCAG 2.1 AA standards.',
        max_budget: 4000,
        posted_by: 'AccessForAll NGO',
        banner_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5RDI_MOIIFFydha1aRa78iwhHddG8ffCOgvaGR5s9mNs2BjeLOWXQTBg7tQMYLxA6vY&usqp=CAU',
    },
    {
        id: 'def-114',
        category: 'Data Science',
        title: 'Data Pipeline Setup (ETL) on AWS',
        description: 'Set up an automated ETL pipeline to ingest data from various sources into a centralized AWS Redshift warehouse.',
        max_budget: 6000,
        posted_by: 'DataFlow Systems',
        banner_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSkO9wRMl9SstWLR1mO1Ytst0obqi72mpzVw&s',
    },
    {
        id: 'def-115',
        category: 'Writing / Content',
        title: 'Video Scriptwriting for Explainer Videos',
        description: 'Write engaging and concise scripts for a series of five 90-second animated explainer videos.',
        max_budget: 1100,
        posted_by: 'Animation Studio X',
        banner_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRINFdUvz1ypDOu0_24zoNY4BkoHXUy3H-uCw&s',
    },
    {
        id: 'def-116',
        category: 'Marketing & Sales',
        title: 'Email Newsletter Design & Automation',
        description: 'Design a responsive email template and set up automation workflows in Mailchimp/Klaviyo.',
        max_budget: 1300,
        posted_by: 'E-com Boosters',
        banner_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlW4JtB-0dslAasiWzjFcpwYX8cKEgysiL1Q&s',
    },
    {
        id: 'def-117',
        category: 'Web Development',
        title: 'Technical Documentation & API Reference',
        description: 'Create comprehensive and clear technical documentation for a new public-facing REST API.',
        max_budget: 2500,
        posted_by: 'DevTools Corp.',
        banner_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe_YorWFDWE7luNnwWVx-ygomn80lY8g5-AA&s',
    },
];

const ProjectsList = ({ handleLogout }) => {
    const navigate = useNavigate();
    const [projectsData, setProjectsData] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/projects")
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                const apiProjectIds = new Set((data || []).map(p => p.id));
                const uniqueDefaultProjects = DEFAULT_PROJECTS.filter(p => !apiProjectIds.has(p.id));
                setProjectsData([...(data || []), ...uniqueDefaultProjects]);
            })
            .catch(err => {
                console.log("Fetch Error:", err);
                setProjectsData(DEFAULT_PROJECTS);
            });
    }, []);

    // Normalize search
    const normalizedSearch = (searchText || "").trim().toLowerCase();

    // FILTER: show only projects that match the search (title OR category OR description)
    const filteredProjects = projectsData.filter(project => {
        if (!normalizedSearch) return true; // no filter => all
        const title = (project.title || "").toLowerCase();
        const category = (project.category || "").toLowerCase();
        const desc = (project.description || "").toLowerCase();
        return title.includes(normalizedSearch) ||
               category.includes(normalizedSearch) ||
               desc.includes(normalizedSearch);
    });

    // GROUP the filtered results by category
    const groupedProjects = filteredProjects.reduce((groups, project) => {
        const category = project.category || "Others";
        if (!groups[category]) groups[category] = [];
        groups[category].push(project);
        return groups;
    }, {});

    const carouselSettings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const handleApplyClick = (projectId) => {
        navigate(`/project/${projectId}`);
    }

    return (
        <>
            <ProjectsNavbar
                handleLogout={handleLogout}
                searchText={searchText}
                onSearchChange={setSearchText}
            />

            <div className="px-8 py-10 bg-gradient-to-r from-blue-50 to-indigo-100">
                <Slider {...carouselSettings}>
                    <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                            alt="Team Collaboration"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-8">
                            <h2 className="text-3xl font-bold mb-3">Hire the Best Freelancers</h2>
                            <p className="text-lg max-w-2xl">
                                Post your project today and find top-rated talent within minutes.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                            alt="Work Projects"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-8">
                            <h2 className="text-3xl font-bold mb-3">Find Projects That Inspire You</h2>
                            <p className="text-lg max-w-2xl">
                                Discover exciting freelance opportunities across multiple industries.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0"
                            alt="Global Talent"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-8">
                            <h2 className="text-3xl font-bold mb-3">Trusted by 5,000+ Professionals</h2>
                            <p className="text-lg max-w-2xl">
                                Join a global network of freelancers and businesses growing together.
                            </p>
                        </div>
                    </div>
                </Slider>
            </div>

            <div className="p-8 bg-gray-100 min-h-screen">
                {/* If search is active but nothing found */}
                {normalizedSearch && filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
                        <p className="text-gray-600">Try different keywords or clear the search.</p>
                    </div>
                )}

                {/* Render grouped categories (only groups that have at least one project) */}
                {Object.keys(groupedProjects).length === 0 && !normalizedSearch ? (
                    <div>Loading projects...</div>
                ) : (
                    Object.keys(groupedProjects).map((category) => (
                        <div key={category} className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 border-b-4 border-blue-500 inline-block pb-1">
                                {category}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                {groupedProjects[category].map((project) => (
                                    <div
                                        key={project.id}
                                        className="bg-white shadow-md rounded-xl p-6 hover:shadow-2xl transition duration-300"
                                    >
                                        <img
                                            src={project.banner_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4U7PtYZ3rEuNimCfj31Z42pr7Ln8Pd_7fg&s"}
                                            alt={project.title}
                                            className="w-full h-40 object-cover rounded-lg mb-4"
                                        />
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 mt-2 text-sm">{project.description}</p>

                                        <p className="mt-3 text-sm">
                                            <strong>Budget:</strong> ${project.max_budget || 1200}
                                        </p>

                                        <p className="text-sm">
                                            <strong>Posted By:</strong> {project.postedBy || project.posted_by || "sanket hanchate"}
                                        </p>

                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
                                            onClick={() => handleApplyClick(project.id)}
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default ProjectsList;