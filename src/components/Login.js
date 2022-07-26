import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import "./css/login.css"
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const Login = ({setCurrentUser}) => {
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
          setUserinput(setCurrentUser)
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
        <form className="loginbox" onSubmit={handleLogin}>
          <div className="login-item">
            <label className="login-item-label" htmlFor="userid">로그인</label>
            <div className="log-input">
              <TextField id="Userid" label="Userid" name="userid" required onChange={onChange} variant="outlined" />
            </div>
          </div>
          <div className="login-item">
            <label className="login-item-label" htmlFor="password">비밀번호</label>
            <div className="log-input">
              <TextField type="password" id="Password" label="Password" name="password" required onChange={onChange} variant="outlined" />
            </div>
          </div>
          <div className="login-item">
            <Button variant="contained"  type="submit">
              <span>로그인</span>
            </Button>
          </div>

          {message && (
            <div className="error-mes">
              <div>
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