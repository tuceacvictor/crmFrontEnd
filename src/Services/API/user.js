import request from "./wrapper/request";

function updateProfile (data) {
    return request({
        url: "api/users/changeTheme",
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

function updateUser(data) {
    return request({
        url: "api/users/update",
        method: "PUT",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function deleteUser(id) {
    return request({
        url: "api/users/delete",
        method: "DELETE",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function readUser(id) {
    return request({
        url: "api/users/read",
        method: "POST",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

const UserService = {
    updateProfile,
    changePassword,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    readUser
};

export default UserService;