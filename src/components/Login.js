import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkbtn = useRef();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userInput, setUserinput] = useState({
    userid: "",
    password: "",
  })

  const {userid, password} = userInput

  const onChange = (e) => {
    setUserinput({
      ...userInput,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (checkbtn) {
      AuthService.login(userid, password).then(
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
        <form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="userid">Userid</label>
            <input
              type="text"
              className="form-control"
              name="userid"
              value={userid}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="">
            <button className="btn" disabled={loading}>
              {loading && (
                <span className=""></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className="">
              <div className="" role="alert">
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