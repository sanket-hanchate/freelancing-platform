import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie'

const EditProfile = () => {
    const [formData, setFormData] = useState({
        email: '',
        role: "",
        location: "",
        skills: "",
        password: "",
    });

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = Cookies.get('jwt_token');
                const response = await axios.get('http://localhost:3000/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setFormData({
                    email: response.data.email || "",
                    role: response.data.role || "",
                    location: response.data.location || "",
                    skills: response.data.skills || "",
                    password: "",
                })
                setLoading(false)
            }
            catch (err) {
                setMessage("Failed to load profile. Please login again.");
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

     const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = Cookies.get("jwt_token");
      const response = await axios.put("http://localhost:3000/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage("Error updating profile");
    }
  };

  if (loading) return <h3 className="text-center mt-10 text-xl font-semibold">Loading...</h3>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>

        {message && (
          <p className={`mb-4 text-center font-semibold ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-1">New Password (optional)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;