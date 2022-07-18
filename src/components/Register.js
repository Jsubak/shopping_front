import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  let navigate = useNavigate();

  const [userInput, setUserinput] = useState({
    userid: "",
    username: "",
    email: "",
    password: "",
  })

  const {userid, username, email, password} = userInput;

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  // 처음 들어갔을 때 버튼 밑에 글자가 안뜨도록 설정
  // useEffect(() => {
  //   setMessage(" ");
  // }, [])

  const onChangeInput = (e) => {
    setUserinput({
      ...userInput,
      [e.target.name]: e.target.value
    }) 
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    if (checkBtn) {
      AuthService.register(userid, username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          alert("회원가입 성공!")
          navigate("/login");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="">
                <label htmlFor="userid">Userid</label>
                <input
                  type="text"
                  className="form-control"
                  name="userid"
                  required
                  value={userid}
                  onChange={onChangeInput}
                />
              </div>

              <div className="">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  required
                  value={username}
                  onChange={onChangeInput}
                />
              </div>

              <div className="">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  required
                  value={email}
                  onChange={onChangeInput}
                />
              </div>

              <div className="">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  name="password"
                  value={password}
                  onChange={onChangeInput}
                />
              </div>

              <div className="">
                <button className="">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="">
                <div>
                  {message}
                </div>
            </div>
            ) 
          }
          <button style={{ display: "none" }} ref={checkBtn} />
        </form>
      </div>
    </div>
  );
};

export default Register;