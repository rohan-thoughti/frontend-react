import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
const Navbar = () => {
  return (
    <div className="navBar">
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Link to="/login">Login</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/users">Users</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/posts">Posts</Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Navbar;
