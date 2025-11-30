import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("jwt_token", data.token, { expires: 1 }); 
        this.setState({ redirect: true });
      } else {
        this.setState({ errorMsg: data.message });
      }
    } catch (err) { 
      this.setState({ errorMsg: "Server error" });
    }
  };
  
  render() {
    const { username, password, errorMsg, redirect } = this.state;

    if (redirect || Cookies.get("jwt_token")) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="min-h-screen bg-gray-100">
        {/* Desktop View */}
        <div className="hidden md:flex h-screen">
          {/* Left Section */}
          <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center px-12">
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="mb-6">
              Access your freelancer account to manage projects, check updates, and connect with clients.
            </p>
            <button className="w-40 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Learn More
            </button>
          </div>

          {/* Right Section - Login Form */}
          <div className="w-1/2 flex justify-center items-center bg-white shadow-lg">
            <div className="w-96">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
              <form onSubmit={this.handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  placeholder="Username"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Password"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Login
                </button>
              </form>
              <p className="mt-4 text-center text-sm">
                Don’t have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex items-center justify-center min-h-screen px-4 md:hidden">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
            <form onSubmit={this.handleSubmit} className="space-y-3">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Login
              </button>
              {errorMsg && <p className="text-red-600 text-center text-sm">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;