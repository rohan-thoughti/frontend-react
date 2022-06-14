import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Posts from "./components/Posts";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div>
      <ToastContainer position="top-center" />
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/posts" element={<Posts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
