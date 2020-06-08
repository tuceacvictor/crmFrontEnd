import request from "./wrapper/request";

function login (formData) {
    return request({
        url: "api/users/login",
        method: "POST",
        data: formData
    });
}

function logout(id) {
    return request({
        url: "user/logout",
        method: "POST",
        data: {id: id}
    })
}


const LoginService = {
    login, logout
};

export default LoginService;