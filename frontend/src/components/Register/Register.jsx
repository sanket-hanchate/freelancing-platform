import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    role: "",
    location: "",
    skills: "",
    successMsg: "",
    errorMsg: "",
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, role, location, skills } = this.state;

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, role, location, skills }),
      });

      const data = await response.json();
      if (response.ok) {
        this.setState({ successMsg: "Signup successful! Redirecting to login...", redirect: true });
        setTimeout(() => this.setState({ redirect: true }), 1500);
      } else {
        this.setState({ errorMsg: data.message });
      }
    } catch (err) {
      this.setState({ errorMsg: "Server error" });
    }
  };

  render() {
    const { username, email, password, role, location, skills, successMsg, errorMsg, redirect } = this.state;

    if (redirect) {
      return <Navigate to="/login" />;
    }

    return (
     <div className="min-h-screen bg-gray-100">
        {/* Desktop View */}
        <div className="hidden md:flex h-screen">
          {/* Left Info Section */}
          <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center px-12">
            <h1 className="text-3xl font-bold mb-4">Join Our Freelancer Platform</h1>
            <p className="mb-6">
              Create an account to find clients, post projects, and start collaborating on amazing opportunities.
            </p>
            <button className="w-40 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Learn More
            </button>
          </div>

          {/* Right Section - Registration Form */}
          <div className="w-1/2 flex justify-center items-center bg-white shadow-lg">
            <div className="w-96">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sign Up</h2>
              <form onSubmit={this.handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={role}
                  onChange={this.handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={location}
                  onChange={this.handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="skills"
                  placeholder="Skills"
                  value={skills}
                  onChange={this.handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {successMsg && <p className="text-green-500 text-center text-sm">{successMsg}</p>}
                {errorMsg && <p className="text-red-500 text-center text-sm">{errorMsg}</p>}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </form>
              <p className="mt-4 text-center text-sm">
                Already have an account? <a href="/login" className="text-blue-600">Login</a>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex items-center justify-center min-h-screen px-4 md:hidden">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
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
                type="email"
                name="email"
                placeholder="Email"
                value={email}
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
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={role}
                onChange={this.handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={location}
                onChange={this.handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="skills"
                placeholder="Skills"
                value={skills}
                onChange={this.handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              {successMsg && <p className="text-green-600 text-center text-sm">{successMsg}</p>}
              {errorMsg && <p className="text-red-600 text-center text-sm">{errorMsg}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
