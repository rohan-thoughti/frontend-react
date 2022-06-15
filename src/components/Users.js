import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  fetchUsers,
  saveUsers,
  updateUsers,
  deleteUsers,
} from "../app/slice/userSlice";
import { signout } from "../app/slice/loginThunk";

const Users = () => {
  const user = useSelector((state) => state.users.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_id, setUserId] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const editUser = (item) => {
    setUserId(item.user_id);
    setName(item.name);
    setEmail(item.email);
    setPassword(item.password);
  };

  const saveUpdateUser = () => {
    if (user_id == null) {
      let payload = {
        user_id: null,
        name: name,
        email: email,
        password: password,
      };
      dispatch(saveUsers(payload));
    } else {
      let payload = {
        user_id: user_id,
        name: name,
        email: email,
        password: password,
      };
      dispatch(updateUsers(payload));
      window.location.reload(false);
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleName = (value) => {
    let max = 15;
    let min = 4;
    setName(value);
    if (!value.trim()) {
      setNameError("Name is Required");
    } else if (min != null && min > value.length) {
      setNameError("Minimum " + min + " Characters Required!");
    } else if (max != null && max < value.length) {
      setNameError("Maximum " + max + " Characters are allowed!");
    } else {
      setNameError(null);
    }
  };
  const handleEmail = (value) => {
    const emailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmail(value);
    if (!emailReg.test(value)) {
      setEmailError("Enter Valid Email!");
    } else {
      setEmailError(null);
    }
  };

  const handlePassword = (_value) => {
    let max = 15;
    let min = 4;
    setPassword(_value);
    if (!_value.trim()) {
      setPasswordError("Password is Required");
    } else if (min != null && min > _value.length) {
      setPasswordError("Minimum " + min + " Characters Required!");
    } else if (max != null && max < _value.length) {
      setPasswordError("Maximum " + max + " Characters are allowed!");
    } else {
      setPasswordError(null);
    }
  };

  return (
    <div className="user-section">
      <h1>Users</h1>
      <Form>
        <div className="logout-btn">
          <Button
            onClick={() => {
              dispatch(signout());
              navigate("/login");
            }}
            variant="outline-danger"
          >
            Logout
          </Button>
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(evt) => handleName(evt.target.value)}
          />
          {nameError && <p className="error-msg">{nameError}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(evt) => handleEmail(evt.target.value)}
          />
          {emailError && <p className="error-msg">{emailError}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(evt) => handlePassword(evt.target.value)}
          />
          {passwordError && (
            <p className="error-msg" id="passwordError">
              {passwordError}
            </p>
          )}
        </Form.Group>

        <Button
          variant="primary"
          onClick={() => {
            saveUpdateUser();
          }}
          disabled={
            !nameError &&
            !emailError &&
            !passwordError &&
            name &&
            email &&
            password
              ? false
              : true
          }
        >
          Submit
        </Button>
      </Form>
      <div className="user-cards-container">
        {user.map((item) => (
          <Card key={item.user_id}>
            <Card.Body>
              <Card.Title>{item.user_id}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.name}
              </Card.Subtitle>
              <Card.Subtitle>{item.email}</Card.Subtitle>
              <div className="user-btns">
                <Button variant="primary" onClick={() => editUser(item)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch(deleteUsers({ user_id: item.user_id }));
                    window.location.reload(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Users;
