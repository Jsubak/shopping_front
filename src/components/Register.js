import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

//비밀번호 유효성 검사
// const checkPassword = (e) => {
//   //  8 ~ 10자 영문, 숫자 조합
//   var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
//   // 형식에 맞는 경우 true 리턴
//  console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
// }

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
        <form onSubmit={handleRegister}>
          {!successful && (
            <div>
              <div className="">
                <label htmlFor="userid">Userid</label>
                <input
                  type="text"
                  className="form-control"
                  name="userid"
                  required
                  onChange={onChangeValue}
                />
              </div>

              <div className="">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  required
                  onChange={onChangeValue}
                />
              </div>

              <div className="">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  required
                  onChange={onChangeValue}
                />
              </div>

              <div className="">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  name="password"
                  // onBlur={checkPassword}
                  onChange={onChangeValue}
                />
              </div>

              <div className="">
                <label htmlFor="passwordconfirm">Passwordconfirm</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  name="passwordconfirm"
                  onChange={onChangeValue}
                />
              </div>

              <div className="">
                <button className="" disabled={!getIsActive} onClick={handleButtonValid}>회원가입</button>
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

        </form>
      </div>
    </div>
  );
};

export default Register;