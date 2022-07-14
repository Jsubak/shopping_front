import React, { useState } from "react";
import UserService from "../services/UserService";

const Signup = () => {

    const initalUserState = {
        userid: "",
        username: "",
        userpassword: "",
        useremail: ""
    }
    
    const [user, setUser] = useState(initalUserState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const saveUser = () => {
        var data = {
            userid: user.userid,
            username: user.username,
            userpassword: user.userpassword,
            useremail: user.useremail
        }
        UserService.create(data)
        .then(response => {
            setUser({
                userid: response.data.userid,
                username: response.data.username,
                userpassword: response.data.userpassword,
                useremail: response.data.useremail
            })
            setSubmitted(true)
            console.log(response.data);
        })
        .catch(e => {
            console.log(e)
        })
    }

    const newUser = () => {
        setUser(initalUserState);
        setSubmitted(false)
        window.location.href="/login"
    };

    return (
        <div>
           {submitted ? (
                <div>
                    <h3>회원가입 완료!</h3>
                    <button onClick={newUser}>로그인 화면으로</button>
                </div>
            ):(
                <div>
                    <div>
                        <label htmlFor="userid">ID</label>
                        <input
                            type="text"
                            className="form"
                            id="userid"
                            required
                            value={user.userid}
                            onChange={handleInputChange}
                            name="userid"
                        />
                    </div>

                    <div>
                        <label htmlFor="username">NAME</label>
                        <input
                            type="text"
                            className="form"
                            id="username"
                            required
                            value={user.username}
                            onChange={handleInputChange}
                            name="username"
                        />
                    </div>
                    <div>
                        <label htmlFor="userpassword">PASSWORD</label>
                        <input
                            type="password"
                            className="form"
                            id="userpassword"
                            required
                            value={user.userpassword}
                            onChange={handleInputChange}
                            name="userpassword"
                        />
                    </div>
                    <div>
                        <label htmlFor="useremail">EMAIL</label>
                        <input
                            type="text"
                            className="form"
                            id="useremail"
                            required
                            value={user.useremail}
                            onChange={handleInputChange}
                            name="useremail"
                        />
                    </div>
                    <button onClick={saveUser}>
                        Submit
                    </button>
                </div>
            )} 
        </div>

    )
}
export default Signup
