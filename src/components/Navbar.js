import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
const Navbar = () => {
  const loggedInUser = useSelector((state) => state.login.userData);

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
        <Nav className="profile-name">
          <h6 key={loggedInUser.user_id}>{loggedInUser.name}</h6>
        </Nav>
      </Nav>
    </div>
  );
};

export default Navbar;
