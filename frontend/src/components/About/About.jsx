import Header from "../Header/Header";
import './index.css'

const About = () => (
    <>
        <Header />
        <div className='bg-container pb-4'>
            <h1 className="text-3xl font-bold mb-4 text-center py-4">About Us</h1>

            <div className="mobile-img-div md:hidden flex flex-col items-center justify-center text-center">
                <img src="https://imageio.forbes.com/specials-images/imageserve/66068ccc844095fde2804d7d/Young-freelance-worker-thoughtfully-smiling-to-the-side-while-doing-remote-work-at-a/960x0.jpg?format=jpg&width=960" alt="about-img" className="image-1" />
                <p className="ara-1 mt-4 max-w-md">Welcome to Nxt Trendz Freelance Hub, the bridge between talent and opportunity! Our platform empowers freelancers to showcase their skills, find exciting projects, and build meaningful careers — all while giving employers easy access to the right talent at the right time.
                    Whether you’re a creative designer, a coding wizard, or a business looking for expert help, we bring you a seamless way to connect, collaborate, and succeed. With a user-friendly interface, secure payments, and a growing community, Nxt Trendz is here to transform how work gets done in the digital era.</p>
            </div>

            <div className="mobile-img-div md:hidden flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold mb-4 text-center py-4">Easy Hiring</h1>
                <img src="https://easy.jobs/wp-content/uploads/2021/07/How-To-Hire-Your-First-Employee-For-Your-Startup-Using-Easy.jobs-Within-A-Day_1280_720.jpg" alt="about-img" className="image-1" />
            </div>

            <div className="mobile-img-div md:hidden flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold mb-4 text-center py-4">Secure Payments</h1>
                <img src="https://www.nicepng.com/png/detail/959-9591464_secure-payment-logo-png.png" alt="about-img" className="image-1" />
            </div>
             
            <div className="mobile-img-div md:hidden flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold mb-4 text-center py-4">Global Talents</h1>
                <img src="https://www.global-talents.com/images/iStock_000029719376Small.jpg" alt="about-img" className="image-1" />
            </div>

            <div className="mobile-img-div md:hidden flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold mb-4 text-center py-4">24/7 Support</h1>
                <img src="https://img.freepik.com/premium-vector/24-7-support-icon-online-support-twenty-four-seven-vector_608466-89.jpg" alt="about-img" className="image-1" />
            </div> 

            <div className="desktop-img-div hidden md:flex flex-row items-center justify-center p-4 gap-24">

                <p className="para-1 mt-4 max-w-md">Welcome to Nxt Trendz Freelance Hub, the bridge between talent and opportunity! Our platform empowers freelancers to showcase their skills, find exciting projects, and build meaningful careers — all while giving employers easy access to the right talent at the right time.
                    Whether you’re a creative designer, a coding wizard, or a business looking for expert help, we bring you a seamless way to connect, collaborate, and succeed. With a user-friendly interface, secure payments, and a growing community, Nxt Trendz is here to transform how work gets done in the digital era.</p>
                <img src="https://imageio.forbes.com/specials-images/imageserve/66068ccc844095fde2804d7d/Young-freelance-worker-thoughtfully-smiling-to-the-side-while-doing-remote-work-at-a/960x0.jpg?format=jpg&width=960" alt="about-img" className="image-desktop" />
            </div>
            
            <div className="desktop-img-div hidden md:flex flex-wrap justify-center gap-8 p-4">
                {/* Image 1 */}
                <div className="flex flex-col items-center mt-4">
                    <img
                        src="https://easy.jobs/wp-content/uploads/2021/07/How-To-Hire-Your-First-Employee-For-Your-Startup-Using-Easy.jobs-Within-A-Day_1280_720.jpg"
                        className="w-60 h-40 object-cover rounded"
                    />
                    <h1 className="text-xl font-bold mt-2 text-center">Easy Hiring</h1>
                </div>

                {/* Image 2 */}
                <div className="flex flex-col items-center mt-4">
                    <img
                        src="https://www.nicepng.com/png/detail/959-9591464_secure-payment-logo-png.png"
                        alt="about-img"
                        className="w-60 h-40 object-cover rounded"
                    />
                    <h1 className="text-xl font-bold mt-2 text-center">Secure Payment</h1>
                </div>

                {/* Image 3 */}
                <div className="flex flex-col items-center mt-4">
                    <img
                        src="https://www.global-talents.com/images/iStock_000029719376Small.jpg"
                        alt="about-img"
                        className="w-60 h-40 object-cover rounded"
                    />
                    <h1 className="text-xl font-bold mt-2 text-center">Global Talents</h1>
                </div>

                {/* Image 4 */} 
                 
                <div className="flex flex-col items-center mt-4">
                    <img
                        src="https://img.freepik.com/premium-vector/24-7-support-icon-online-support-twenty-four-seven-vector_608466-89.jpg"
                        alt="about-img"
                        className="w-60 h-40 object-cover rounded"
                    />
                    <h1 className="text-xl font-bold mt-2 text-center">24/7 Support</h1>
                </div>
            </div>

            {/* How it works */}
            <div className="bg-gray-100 py-10 mt-6">
                <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:scale-105 transition duration-300">
                        <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 text-lg font-bold">1</div>
                        <h3 className="font-semibold text-xl mb-2">Sign Up</h3>
                        <p className="text-gray-600 text-sm">Create your free account as a freelancer or employer.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:scale-105 transition duration-300">
                        <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 text-lg font-bold">2</div>
                        <h3 className="font-semibold text-xl mb-2">Post / Find Jobs</h3>
                        <p className="text-gray-600 text-sm">Employers post jobs, freelancers apply easily.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:scale-105 transition duration-300">
                        <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 text-lg font-bold">3</div>
                        <h3 className="font-semibold text-xl mb-2">Collaborate</h3>
                        <p className="text-gray-600 text-sm">Chat, share files, and manage tasks in one place.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:scale-105 transition duration-300">
                        <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 text-lg font-bold">4</div>
                        <h3 className="font-semibold text-xl mb-2">Get Paid</h3>
                        <p className="text-gray-600 text-sm">Secure payments after project completion.</p>
                    </div>
                </div>
            </div>
        </div>
    </>
)

export default About;