import React, { useState } from "react"
import UserService from "../services/UserService"

const Login = () => {
    const [user, setUser] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");


    const onChangeId = e => {
        const id = e.target.value
        setId(id);
    }

    const onChangePassword = e => {
        const password = e.target.value
        setPassword(password)
    }

    const findById = () => {
        UserService.findById(id, password)
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
            <div className="login-box">
                <div>
                    <label htmlFor="id">ID</label>
                    <input
                    type="text"
                    className="form-control"
                    required
                    value={id}
                    onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="password">PASSWORD</label>
                    <input
                    type="password"
                    className="form-control"
                    required
                    value={password}
                    onChange={onChangePassword} />
                </div>
                
                <div className="search-buttonbox">
                    <button
                      className="btn"
                      type="button"
                      onClick={findById}
                    >
                        검색
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Login