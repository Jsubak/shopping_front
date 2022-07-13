import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          필수사항입니다
        </div>
      );
    }
  };

const Login = () => {
    let navigate = useNavigate();

    const form = useRef();
    const checkbtn = useRef();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username);
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        // form.current.validateAll();

        if (checkbtn) {
            AuthService.login(username, password).then(
              () => {
                navigate("/product");
                window.location.reload();
              },
              (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                setLoading(false);
                setMessage(resMessage);
              }
            );
        } else {
            setLoading(false)
        }
    }

    return (
        <div>
            <div>
                profile img
        
            <form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <button style={{ display: "none" }} ref={checkbtn} />
        </form>
      </div>
    </div>
    )
}

export default Login