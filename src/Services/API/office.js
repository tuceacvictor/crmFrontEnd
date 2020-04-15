import request from "./wrapper/request";

function getOffices() {
    return request({
        url: "api/office",
        method: "GET",
        data: {},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function createOffice(data) {
    return request({
        url: "api/office/create",
        method: "POST",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function updateOffice(data) {
    return request({
        url: "api/office/update",
        method: "PUT",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function deleteOffice(id) {
    return request({
        url: "api/office/",
        method: "DELETE",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function readOffice(id) {
    return request({
        url: "api/office/read",
        method: "POST",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

const OfficeService = {
    getOffices,
    createOffice,
    readOffice,
    updateOffice,
    deleteOffice
};

export default OfficeService;