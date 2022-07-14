import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

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

  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  // 처음 들어갔을 때 버튼 밑에 글자가 안뜨도록 설정
  useEffect(() => {
    setMessage(" ");
  }, [])

  const onChangeUserid = (e) => {
    const userid = e.target.value;
    setUserid(userid)
  }

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    if (checkBtn) {
      AuthService.register(userid, username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
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
                  onChange={onChangeUserid}
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
                  onChange={onChangeUsername}
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
                  onChange={onChangeEmail}
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
                  onChange={onChangePassword}
                />
              </div>

              <div className="">
                <button className="">Sign Up</button>
              </div>
            </div>
          )}

          {message ? (
            <div className="">
                <div>
                  {message}
                </div>
            </div>
            ) : (
            <div>
              <div>회원가입 완료</div>
              <Link to={"/login"}>로그인화면으로 가기</Link>
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