import request from "./wrapper/request";

function updateProfile (data) {
    return request({
        url: "api/users/updateProfile",
        method: "POST",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    });
}

function changePassword (data) {
    return request({
        url: "api/users/changePassword",
        method: "POST",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    });
}

function getUsers() {
    return request({
        url: "api/users",
        method: "GET",
        data: {},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}


function createUser(data) {
    return request({
        url: "api/users",
        method: "POST",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

const UserService = {
    updateProfile,
    changePassword,
    getUsers,
    createUser
};

export default UserService;