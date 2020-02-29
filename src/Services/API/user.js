import request from "./wrapper/request";

function updateProfile (data) {
    return request({
        url: "api/users/updateProfile",
        method: "POST",
        data: data
    });
}

function changePassword (data) {
    return request({
        url: "api/users/changePassword",
        method: "POST",
        data: data
    });
}

const UserService = {
    updateProfile,
    changePassword
};

export default UserService;