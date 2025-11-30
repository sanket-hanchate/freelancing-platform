import { Link } from 'react-router-dom'
import './index.css'
import React from 'react'

const Header = () => (
  <div className='bg-container'>
    <nav className="bg-white shadow-md p-3 flex justify-between items-center">

      <Link to="/">
        <img
          className="h-8 w-32"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
        />
      </Link>

      <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
        <Link to="/" className="hover:text-blue-600"><li>Home</li></Link>
        <Link to="/about" className="hover:text-blue-600"><li>About</li></Link> 
        <Link to="/contact" className="hover:text-blue-600"><li>Contact</li></Link>
      </ul>
      <div>

        <Link to="/login">
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 ml-2">Login</button>
        </Link>
        <Link to="/signup">
          <button className="register-btn bg-white text-blue-600 px-4 py-1 rounded hover:bg-white ml-2">Register</button>
        </Link>
      </div>
    </nav>
    <div className='nav-2 h-14 w-full md:hidden'>
      <ul className="flex justify-around items-center h-full text-gray-800 font-medium">
        <Link to="/" className="hover:text-blue-600"><li>Home</li></Link>
        <Link to="/about" className="hover:text-blue-600"><li>About</li></Link>
        <Link to="/contact" className="hover:text-blue-600"><li>Contact</li></Link>
      </ul>
    </div>
  </div>
)

export default Header

export const ContactCard = ({ icon, title, children, colorClass, delay }) => (
    <div
        className={`bg-white rounded-xl shadow-xl p-8 flex flex-col items-center text-center 
                    border-b-4 ${colorClass} transition-all duration-500 ease-out 
                    hover:shadow-2xl hover:-translate-y-1`}
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className={`text-4xl ${colorClass.replace('border-b-4', 'text')} mb-4`}>
            {icon}
        </div>
        <h3 className="font-extrabold text-2xl text-gray-900 mb-4">{title}</h3>
        <div className="text-gray-700 space-y-2 w-full">
            {children}
        </div>
    </div>
);