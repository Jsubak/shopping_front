import React, { useState } from "react";
import UserService from "../services/UserService";

const MypageTwo = () => {
    const [test, setTest] = useState("")

    const getCurrentUser = JSON.parse(localStorage.getItem("user"));
    
    const updateTest = () => {
        UserService.update(test)
          .then(response => {
            console.log(response.data);
            // setMessage("updated successfully!");
          })
          .catch(e => {
            console.log(e);
          });
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTest({ ...test, [name]: value });
    };

    return<><input name="username" onChange={handleInputChange}></input><button type="submit" onClick={updateTest}>변경</button></>
}

export default MypageTwo