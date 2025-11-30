// ProjectsNavbar.jsx
import React from "react";
import { Navbar, Nav, NavDropdown, Container, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle, FaSearch } from "react-icons/fa";

// This component accepts the search state and handler from Projects.jsx
const ProjectsNavbar = ({ handleLogout, searchText, onSearchChange }) => {
    return (
        <Navbar expand="lg" className="bg-white shadow-md sticky top-0 z-10">
            <Container>
                <Navbar.Brand href="/dashboard" className="text-2xl font-bold text-blue-600">
                    <img
                        className="h-8 w-32"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                        alt="website logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto space-x-4">
                        <Nav.Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                            Home
                        </Nav.Link>
                        <NavDropdown title="Services" id="services-dropdown">
                            <NavDropdown.Item href="/post-project">Post a Project</NavDropdown.Item>
                            <NavDropdown.Item href="/projects">Find Work Today</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    {/* Search Bar */}
                    <Form className="d-flex mx-4" style={{ flexGrow: 1, maxWidth: '400px' }} onSubmit={(e) => e.preventDefault()}>
                        <div className="relative w-full">
                            <FormControl
                                type="search"
                                placeholder="Search projects by title or category..."
                                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition w-full"
                                aria-label="Search"
                                value={searchText}
                                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                            />
                            <FaSearch
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </Form>

                    <div className="flex items-center gap-3 ml-auto">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                        <Nav.Link href="/profile" className="p-0">
                            <FaUserCircle size={40} color="#3b82f6" className="ml-4 cursor-pointer" />
                        </Nav.Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default ProjectsNavbar;
