import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (userid, username, email, password) => {
  return axios.post(API_URL + "signup", {
    userid,
    username,
    email,
    password,
  });
};

const login = (userid, password) => {
  return axios
    .post(API_URL + "signin", {
      userid,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;