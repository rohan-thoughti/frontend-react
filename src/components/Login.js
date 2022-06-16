import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../app/helper/helperFunction";
import { login } from "../app/slice/loginThunk";
import { Button, Form } from "react-bootstrap";
import "./css/style.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { token } = useSelector((state) => state.login);

  useEffect(() => {
    if (token || getToken()) {
      navigate("/users");
    }
  }, []);

  const handleEmail = (value) => {
    const emailReg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  const loginUser = (e) => {
    e.preventDefault();
    let payload = {
      email: email,
      password: password,
    };

    dispatch(login(payload));
    setTimeout(() => {
      navigate("/users", { replace: true });
    }, 1000);
  };
  return (
    <div className="login-form">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            id="email"
            type="email"
            value={email}
            onChange={(evt) => handleEmail(evt.target.value)}
            placeholder="Enter email"
          />
          {emailError && <p className="error-msg">{emailError}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            onChange={(evt) => handlePassword(evt.target.value)}
            placeholder="Password"
          />
          {passwordError && (
            <p className="error-msg" id="passwordError">
              {passwordError}
            </p>
          )}
        </Form.Group>
        {/* <Link to="/users"> */}
        <Button
          variant="primary"
          id="loginBtn"
          onClick={(evt) => {
            loginUser(evt);
          }}
          disabled={
            !emailError && !passwordError && email && password ? false : true
          }
        >
          Submit
        </Button>
        {/* </Link> */}
      </Form>
    </div>
  );
};

export default Login;
