import axios from "axios";
// import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/test/";
const getPublicContent = () => {
    return axios.get(API_URL+ "all")
}

const Userservice = {
    getPublicContent,
};
export default Userservice;