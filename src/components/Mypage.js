import { useEffect, useState } from "react";
import axios from "axios";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";
// import MypageService from "../services/mypage.service"

const Mypage = () => {
    const [users, setUser] = useState({})
    
    const getCurrentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        finduser()
    }, [])
    
    const finduser = () => {
        axios.get("http://localhost:8080/api/user", {params : getCurrentUser})
        .then(response => {
            setUser(response.data)
            console.log(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    }
    
    return (
        <div>
            <div>
                {users.userid}
            </div>
            <div>
                {users.username}
            </div>
                {/* {orders.address} */}
                <Link to={"/orderinfo"}>이동</Link>
        </div>
    )
}

export default Mypage