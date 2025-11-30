import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle } from "react-icons/fa"

const CustomNavbar = ({ handleLogout }) => {
    return (
        <Navbar expand="lg" className="bg-white shadow-md">
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
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                        <button>
                            <Nav.Link href="/profile"><FaUserCircle size={40} color="blue" className="ml-4 cursor-pointer" /></Nav.Link>
                        </button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
