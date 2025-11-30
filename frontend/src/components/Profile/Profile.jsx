import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("jwt_token");
        if (!token) {
          setError("No token found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
        setFormData(response.data); // Pre-fill edit form
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile. Please login again.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("jwt_token");
      const response = await axios.put(
        "http://localhost:3000/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setProfile(response.data.user);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed. Please try again.");
    }
  };

  if (loading)
    return (
      <h3 className="text-center mt-10 text-xl font-semibold">
        Loading profile...
      </h3>
    );
  if (error)
    return <h3 className="text-center text-red-500 mt-10">{error}</h3>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 h-64 flex flex-col justify-center px-8">
        <h1 className="text-4xl font-bold text-white">
          Hello {profile.username} 👋
        </h1>
        <p className="text-white mt-2 max-w-2xl">
          Welcome to your profile page. Here you can manage your freelancing
          account, showcase your skills, and track your projects.
        </p>
        <button
          onClick={() => setIsEditing(true)}
          className=" w-60 mt-4 bg-white text-purple-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 shadow-md"
        >
          Edit Profile
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              My Account
            </h2>

            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-600">Username:</span>
                  <span>{profile.username}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-600">Email:</span>
                  <span>{profile.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-600">Role:</span>
                  <span>{profile.role}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-600">Location:</span>
                  <span>{profile.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Skills:</span>
                  <span>{profile.skills}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border rounded p-2"
                />
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Role"
                  className="w-full border rounded p-2"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full border rounded p-2"
                />
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Skills"
                  className="w-full border rounded p-2"
                />

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button> 
                </div>
              </div>
            )}
          </div>

          {/* Right Section (Profile Card) */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg -mt-16"
            />
            <h3 className="text-lg font-bold mt-4">{profile.username}</h3>
            <p className="text-gray-500">{profile.role}</p>

            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <p className="font-bold text-xl text-purple-600">12</p>
                <p className="text-sm text-gray-500">Projects</p>
              </div>
              <div>
                <p className="font-bold text-xl text-pink-600">7</p>
                <p className="text-sm text-gray-500">Clients</p>
              </div>
              <div>
                <p className="font-bold text-xl text-red-600">24</p>
                <p className="text-sm text-gray-500">Reviews</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700">
                Connect
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300">
                Messages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default Profile;