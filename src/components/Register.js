import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "./css/register.css"
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const Register = () => {
  let navigate = useNavigate();

  const [userInput, setUserinput] = useState({
    userid: "",
    username: "",
    email: "",
    password: "",
    passwordconfirm: ""
  })

  const onChangeValue = e => {
    const { name, value } = e.target
    setUserinput({...userInput, [name]: value})
  }

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  // 가입 부분
  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

      AuthService.register(userInput.userid, userInput.username, userInput.email, userInput.password).then(
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
  };

  // 유효성 검사

  // 이메일 검사: '@', '.' 이 둘다 포함될것.
  const isValidEmail = userInput.email.includes('@') && userInput.email.includes('.');
  // 비밀번호 특수문자 검사를 위한 정규식표현.
  const specialLetter = userInput.password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  // 특수문자 1자 이상, 전체 8자 이상일것.
  const isValidPassword = userInput.password.length >= 8 && specialLetter >= 1;
  // 비밀번호랑 비밀번호 확인이 동일할것.
  const isValidPasswordRight = userInput.password === userInput.passwordconfirm
  // 검사한 모든 로직의 유효성 검사가 true가 될때 getIsActive함수가 작동한다. 버튼 클릭 이벤트가 발생할때 넣어줄 함수.
  const getIsActive = isValidEmail && isValidPassword && isValidPasswordRight === true;

  const handleButtonValid = () => {
    if (
      !isValidEmail ||
      !isValidPassword ||
      !isValidPasswordRight
      ) {
      console.log('올바르게 작성해주세요');}
  }

  return (
    <div>
      <div>
        <form className="registerbox" onSubmit={handleRegister}>
          {!successful && (
            <div>
              <div className="register-item">
                <label className="register-item-label" htmlFor="userid">아이디</label>
                <div className="reg-input">
                  <TextField id="Userid" label="Userid" name="userid" required onChange={onChangeValue} variant="outlined" />
                </div>
              </div>

              <div className="register-item">
                <label className="register-item-label" htmlFor="username">닉네임</label>
                <div className="reg-input">
                  <TextField id="Username" label="Username" name="username" required onChange={onChangeValue} variant="outlined" />
                </div>
              </div>

              <div className="register-item">
                <label className="register-item-label" htmlFor="email">이메일</label>
                <div className="reg-input">
                  <TextField id="Email" label="Email" name="email" required onChange={onChangeValue} variant="outlined" />
                </div>
              </div>

              <div className="register-item">
                <label className="register-item-label" htmlFor="password">비밀번호</label>
                <div className="reg-input">
                  <TextField type="password" id="Password" label="Password" name="password" required onChange={onChangeValue} variant="outlined" />
                </div>
              </div>

              <div className="register-item">
                <label className="register-item-label" htmlFor="passwordconfirm">비밀번호 확인</label>
                <div className="reg-input">
                  <TextField type="password" id="passwordconfirm" label="passwordconfirm" name="passwordconfirm" required onChange={onChangeValue} variant="outlined" />
                </div>
              </div>

              <div className="register-item">
                <Button type="submit" variant="contained" disabled={!getIsActive} onClick={handleButtonValid}>회원가입</Button>
              </div>
            </div>
          )}

          {message && (
            <div className="error-mes">
                <div>
                  {message}
                </div>
            </div>
            ) 
          }

        </form>
      </div>
    </div>
  );
};

export default Register;