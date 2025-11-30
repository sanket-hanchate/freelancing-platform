import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDollarSign, FaUserTie, FaClock, FaCheckCircle, FaPaperPlane, FaTimes } from 'react-icons/fa';

// --- Default Project Data (Copied from ProjectsList.jsx) ---
const DEFAULT_PROJECTS = [
    {
        id: 'def-101',
        category: 'Web Development',
        title: 'High-Performance E-commerce Platform Build',
        description: 'Develop a custom, scalable e-commerce website using Next.js and headless commerce APIs.',
        max_budget: 6500,
        posted_by: 'GlobalCommerce Inc.',
        time_commitment: '3-6 Months',
        level: 'Expert',
        is_verified: true,
    },
    {
        id: 'def-102',
        category: 'Design',
        title: 'Mobile App UI/UX Redesign',
        description: 'Complete redesign of an existing fitness tracking mobile app to improve user engagement and usability.',
        max_budget: 3200,
        posted_by: 'FitTrack Solutions',
        time_commitment: '1 Month',
        level: 'Mid-Senior',
        is_verified: true,
    },
    {
        id: 'def-103',
        category: 'Writing / Content',
        title: 'SEO-Optimized Tech Blog Content',
        description: 'Need a writer for 10 high-quality, long-form articles focused on AI and Machine Learning trends.',
        max_budget: 1800,
        posted_by: 'AITrends Magazine',
        time_commitment: '1-2 Weeks',
        level: 'Intermediate',
        is_verified: true,
    },
    {
        id: 'def-104',
        category: 'Data Science',
        title: 'Predictive Sales Forecasting Model',
        description: 'Build and validate a Python-based predictive model to forecast quarterly sales based on historical data.',
        max_budget: 4800,
        posted_by: 'DataCorp Analysts',
        time_commitment: '2 Months',
        level: 'Expert',
        is_verified: true,
    },
    {
        id: 'def-105',
        category: 'Web Development',
        title: 'Landing Page Optimization & A/B Testing',
        description: 'Design and implement two variations of a landing page for conversion rate optimization.',
        max_budget: 900,
        posted_by: 'Marketing Pros',
        time_commitment: '1 Week',
        level: 'Junior',
        is_verified: true,
    },
    {
        id: 'def-106',
        category: 'Marketing & Sales',
        title: 'Google Ads Campaign Setup & Management',
        description: 'Set up, launch, and manage a new search and display campaign for a SaaS product launch.',
        max_budget: 2100,
        posted_by: 'CloudStartups LLC',
        time_commitment: 'Ongoing',
        level: 'Mid-Senior',
        is_verified: true,
    },
    {
        id: 'def-107',
        category: 'Design',
        title: '3D Mockup and Animation for Product',
        description: 'Create photorealistic 3D models and short animated videos for a new line of electronic gadgets.',
        max_budget: 4500,
        posted_by: 'Gadget Makers',
        time_commitment: '4 Weeks',
        level: 'Expert',
        is_verified: true,
    },
    {
        id: 'def-108',
        category: 'Web Development',
        title: 'Backend API Migration to Microservices',
        description: 'Migrate a monolithic Python/Django backend to a modern, scalable microservices architecture using Docker and Kubernetes.',
        max_budget: 8000,
        posted_by: 'Tech Innovators',
        time_commitment: '6 Months',
        level: 'Expert',
        is_verified: true,
    },
    {
        id: 'def-109',
        category: 'Writing / Content',
        title: 'E-book Ghostwriting: Finance Guide',
        description: 'Write a comprehensive 50-page e-book on personal finance and investment strategies.',
        max_budget: 2800,
        posted_by: 'Finance Educators',
        time_commitment: '3 Weeks',
        level: 'Mid-Senior',
        is_verified: true,
    },
    {
        id: 'def-110',
        category: 'Data Science',
        title: 'Natural Language Processing (NLP) Sentiment Analysis',
        description: 'Develop an NLP model to analyze customer sentiment from social media posts and reviews.',
        max_budget: 5500,
        posted_by: 'SocialMetrics Co.',
        time_commitment: '2 Months',
        level: 'Expert',
        is_verified: true,
    },
    {
        id: 'def-111',
        category: 'Marketing & Sales',
        title: 'LinkedIn Lead Generation Strategy',
        description: 'Develop and execute a targeted LinkedIn strategy to generate qualified B2B sales leads.',
        max_budget: 1500,
        posted_by: 'B2B Connect',
        time_commitment: '1 Month',
        level: 'Intermediate',
        is_verified: true,
    },
    {
        id: 'def-112',
        category: 'Design',
        title: 'Company Rebranding & Style Guide',
        description: 'Create a new logo, color palette, typography, and a detailed brand style guide.',
        max_budget: 3800,
        posted_by: 'Brand Revival',
        time_commitment: '5 Weeks',
        level: 'Mid-Senior',
        is_verified: true,
    },
    {
        id: 'def-113',
        category: 'Web Development',
        title: 'Accessibility Audit (WCAG 2.1) & Implementation',
        description: 'Conduct a full accessibility audit of existing corporate site and implement required changes to meet WCAG 2.1 AA standards.',
        max_budget: 4000,
        posted_by: 'AccessForAll NGO',
        time_commitment: '3 Weeks',
        level: 'Expert',
        is_verified: true,
    },
    {
        id: 'def-114',
        category: 'Data Science',
        title: 'Data Pipeline Setup (ETL) on AWS',
        description: 'Set up an automated ETL pipeline to ingest data from various sources into a centralized AWS Redshift warehouse.',
        max_budget: 6000,
        posted_by: 'DataFlow Systems',
        time_commitment: '4 Weeks',
        level: 'Expert',
        is_verified: true,
    },
    {
        id: 'def-115',
        category: 'Writing / Content',
        title: 'Video Scriptwriting for Explainer Videos',
        description: 'Write engaging and concise scripts for a series of five 90-second animated explainer videos.',
        max_budget: 1100,
        posted_by: 'Animation Studio X',
        time_commitment: '1 Week',
        level: 'Junior',
        is_verified: true,
    },
    {
        id: 'def-116',
        category: 'Marketing & Sales',
        title: 'Email Newsletter Design & Automation',
        description: 'Design a responsive email template and set up automation workflows in Mailchimp/Klaviyo.',
        max_budget: 1300,
        posted_by: 'E-com Boosters',
        time_commitment: '2 Weeks',
        level: 'Intermediate',
        is_verified: true,
    },
    {
        id: 'def-117',
        category: 'Web Development',
        title: 'Technical Documentation & API Reference',
        description: 'Create comprehensive and clear technical documentation for a new public-facing REST API.',
        max_budget: 2500,
        posted_by: 'DevTools Corp.',
        time_commitment: '3 Weeks',
        level: 'Mid-Senior',
        is_verified: true,
    },
];

// --- Skill Mapping Function (Same as before) ---
const getSkillsByCategory = (category) => {
    switch (category) {
        case 'Web Development':
            return ['React.js', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'TypeScript'];
        case 'Design':
            return ['UI/UX Design', 'Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'Branding', 'Illustrator', 'Wireframing'];
        case 'Data Science':
            return ['Python', 'R', 'Machine Learning', 'Data Analysis', 'SQL', 'TensorFlow', 'Pandas', 'Data Visualization'];
        case 'Writing / Content':
            return ['SEO Writing', 'Copywriting', 'Blog Posts', 'Editing', 'Technical Writing', 'Grammarly', 'Research'];
        case 'Marketing & Sales':
            return ['SEO/SEM', 'Social Media Marketing', 'Google Ads', 'Email Marketing', 'Content Strategy', 'Sales Funnels'];
        default:
            return ['Project Management', 'Communication', 'Problem Solving'];
    }
};

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('idle');

    useEffect(() => {
        // Step 1: Attempt to fetch from the REAL API (database)
        fetch(`http://localhost:3000/projects/${id}`)
            .then((res) => {
                if (!res.ok) {
                    // If API fails to find the project, throw error to trigger catch block
                    throw new Error('Project not found in database');
                }
                return res.json();
            })
            .then((data) => {
                // Success: Project is from the database
                setProject({
                    ...data,
                    posted_by: data.posted_by || 'Confidential Client',
                    max_budget: data.max_budget || 'Negotiable',
                    time_commitment: data.time_commitment || 'TBD',
                    level: data.level || 'Mid-Senior',
                    is_verified: data.is_verified || true,
                    category: data.category || 'Web Development'
                });
                setLoading(false);
            })
            .catch(() => {
                // Step 2: API failed, now check the local DEFAULT_PROJECTS
                const defaultProject = DEFAULT_PROJECTS.find(p => p.id === id);

                if (defaultProject) {
                    // Success: Project found in default list
                    setProject({
                        ...defaultProject,
                        // Ensure all display fields are populated from the default object
                        is_verified: true, 
                    });
                } else {
                    // Failure: Project not found anywhere
                    console.error("Error: Project not found in DB or default list.");
                    // You might want to navigate to a 404 page here
                }
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => { 
        e.preventDefault();
        setSubmissionStatus('submitting');
        
        // MOCK SUBMISSION
        setTimeout(() => {
            setSubmissionStatus('success');
            setIsApplying(false); 
            setTimeout(() => {
                setSubmissionStatus('idle');
            }, 5000);
        }, 1500);
    };

    const ApplicationForm = () => (
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg mt-8">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">Submit Your Proposal</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                        Cover Letter / Pitch <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="coverLetter"
                        rows="5"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Tell us why you are the best fit for this project..."
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Proposed Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={`Maximum budget is $${project.max_budget || 'N/A'}`}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={submissionStatus === 'submitting'}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                    {submissionStatus === 'submitting' ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Submitting...
                        </>
                    ) : (
                        <>
                            <FaPaperPlane className="mr-2" />
                            Submit Application
                        </>
                    )}
                </button>
            </form>
        </div>
    );

    if (loading || !project) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                {/* Updated message based on current logic */}
                <p className="ml-3 text-lg text-gray-600">{!project && !loading ? "Project Details Not Found" : "Loading Project Details..."}</p> 
            </div>
        );
    }

    const requiredSkills = getSkillsByCategory(project.category);

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Project Header and Main Details */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-indigo-600">
                    <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                        {project.title}
                    </h1>
                    
                    {/* --- POSTED BY & VERIFICATION --- */}
                    <div className="flex items-center mt-2 text-sm font-medium text-gray-500">
                        Posted by: <strong className="ml-1 text-gray-700">{project.posted_by}</strong>
                        {project.is_verified && ( 
                            <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <FaCheckCircle className="mr-1 h-3 w-3" />
                                Verified Client
                            </span>
                        )}
                    </div>
                    
                    {/* --- DETAIL CARDS --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 border-t pt-4">
                        
                        {/* Budget Card */}
                        <div className="flex items-center p-4 bg-indigo-50 rounded-lg">
                            <FaDollarSign className="text-3xl text-indigo-600 mr-4" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Budget</p>
                                <p className="text-xl font-bold text-indigo-700">${project.max_budget}</p>
                            </div>
                        </div>
                        
                        {/* Timeline Card */}
                        <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                            <FaClock className="text-3xl text-yellow-600 mr-4" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Estimated Duration</p>
                                <p className="text-xl font-bold text-yellow-700">{project.time_commitment}</p>
                            </div>
                        </div>

                        {/* Experience Level Card */}
                        <div className="flex items-center p-4 bg-green-50 rounded-lg">
                            <FaUserTie className="text-3xl text-green-600 mr-4" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Experience Level</p>
                                <p className="text-xl font-bold text-green-700">{project.level}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Main CTA Button (Toggles isApplying) */}
                    <div className="mt-8">
                        <button
                            onClick={() => setIsApplying(!isApplying)}
                            className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-[1.01]"
                        >
                            {isApplying ? "Hide Application Form" : "Apply for this Project Now"}
                        </button>
                    </div>
                </div>
                
                {/* Project Description Section */}
                <div className="mt-10 bg-white p-8 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b pb-3">Project Scope & Details</h2>
                    <p className="text-sm font-medium text-indigo-600 mb-4">Category: {project.category}</p>
                    <p className="text-lg text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {project.description}
                    </p>
                    
                    {/* Required Skills Section */}
                    {requiredSkills.length > 0 && (
                        <>
                            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Key Skills Required:</h3>
                            <div className="flex flex-wrap gap-2">
                                {requiredSkills.map((skill) => (
                                    <span 
                                        key={skill} 
                                        className="px-4 py-1.5 text-sm font-medium rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Application Form (Conditionally Rendered) */}
                {isApplying && <ApplicationForm />}
            </div>

            {/* --- GREEN SUCCESS ALERT FOOTER --- */}
            {submissionStatus === 'success' && (
                <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4 shadow-2xl transition-all duration-500 ease-in-out z-50">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <div className="flex items-center">
                            <FaCheckCircle className="h-6 w-6 mr-3 animate-pulse" />
                            <p className="font-semibold text-lg">
                                Application Submitted Successfully! 🎉
                            </p>
                            <p className="ml-4 text-sm opacity-90 hidden sm:block">
                                Thank you for your interest. The client will review your proposal shortly.
                            </p>
                        </div>
                        <button
                            onClick={() => setSubmissionStatus('idle')}
                            className="p-2 rounded-full hover:bg-green-700 transition"
                        >
                            <FaTimes className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;