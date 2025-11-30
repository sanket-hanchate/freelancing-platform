import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Profile from "./components/Profile/Profile"
import PostProjectApp from "./components/PostProjectApp/PostProjectApp";
import ProjectsList from "./components/ProjectsList/ProjectsList";
import Cookies from "js-cookie";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("jwt_token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/post-project" element={<PostProjectApp />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
