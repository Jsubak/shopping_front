import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";

const Login = () => {
  let navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [userInput, setUserinput] = useState({
    userid: "",
    password: ""
  })

  const {userid, password} = userInput

  const onChange = (e) => {
    const { name, value } = e.target
    setUserinput({...userInput, [name]: value})
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");

      AuthService.login(userid, password).then(
        () => {
          navigate("/product");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
        }
    );
  }


  return (
    <div>
      <div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="userid">Userid</label>
            <input
              type="text"
              className="form-control"
              name="userid"
              required
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              onChange={onChange}
            />
          </div>
          <div className="">
            <button className="btn">
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

        </form>
      </div>
    </div>
  )
}

export default Login