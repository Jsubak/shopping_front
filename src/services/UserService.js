import http from "../http-common";

// const create = data => {
//     return http.post("/user", data);
// }

// const findById = userid => {
//     return http.get(`/user?userid=${userid}`);
// }

// const finduser = (params) => {
//     return http.get( "/user", )
// }

const update = (data) => {
    return http.put('/user', data);
}

const UserService = {
    // create,
    // findById,
    // finduser,
    update
}

export default UserService