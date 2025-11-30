import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaLinkedin, FaFacebook, FaInstagram, FaEnvelope, FaGlobe } from 'react-icons/fa'; // Import professional icons
import Header, { ContactCard } from '../Header/Header';

const Contact = () => {
    return (
        <>
            <Header />
            <div className='bg-gray-50 min-h-screen py-16'>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-gray-900">Get In Touch 📧</h1>
                        <p className='text-lg text-gray-600 mt-3'>
                            Have any questions? We'd love to hear from you. Find the best way to reach us below.
                        </p>
                    </div>

                    {/* Contact Cards Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        
                        {/* 1. Address Card */}
                        <ContactCard 
                            icon={<FaMapMarkerAlt />} 
                            title="Office Location" 
                            colorClass="border-indigo-600 text-indigo-600"
                            delay={0}
                        >
                            <p className='text-md font-semibold'>Freelancer Hub HQ</p>
                            <p className='text-sm'>123 Global Work St</p>
                            <p className='text-sm'>Worktown, WT 45678, Earth</p>
                            <a
                                href="https://maps.google.com/?q=123+Freelancer+St" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
                            >
                                <FaGlobe className="mr-1" /> View on Map
                            </a> 
                        </ContactCard>
                        
                        {/* 2. Phone & Email Card (Combined for efficiency) */}
                        <ContactCard 
                            icon={<FaPhone />} 
                            title="Call or Email Us" 
                            colorClass="border-green-600 text-green-600"
                            delay={100}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <FaPhone className="text-lg" />
                                <a href="tel:0123456789" className="text-md font-semibold hover:underline">
                                    +1 (012) 345-6789
                                </a>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <FaEnvelope className="text-lg" />
                                <a href="mailto:support@freelancerhub.com" className="text-md font-semibold hover:underline">
                                    support@freelancerhub.com
                                </a>
                            </div>
                            <p className='text-xs text-gray-500 pt-3'>
                                Available Mon - Fri, 9:00 AM - 5:00 PM
                            </p>
                        </ContactCard>

                        {/* 3. Social Media Card */}
                        <ContactCard 
                            icon={<FaGlobe />} 
                            title="Connect Online" 
                            colorClass="border-purple-600 text-purple-600"
                            delay={200}
                        >
                            <SocialLink icon={<FaLinkedin />} name="LinkedIn" url="https://linkedin.com/yourprofile" />
                            <SocialLink icon={<FaFacebook />} name="Facebook" url="https://facebook.com/yourpage" />
                            <SocialLink icon={<FaInstagram />} name="Instagram" url="https://instagram.com/yourhandle" />
                            <p className='text-xs text-gray-500 pt-3'>
                                Follow us for updates and project tips!
                            </p>
                        </ContactCard>
                    </div>
                </div>
            </div>
        </>
    );
};

// Helper component for social links
const SocialLink = ({ icon, name, url }) => (
    <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150"
    >
        <span className="text-lg mr-2">{icon}</span>
        <span className="font-medium text-sm">{name}</span>
    </a>
);

export default Contact;