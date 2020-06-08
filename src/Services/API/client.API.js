import request from "./wrapper/request";

function getData(page, pageSize, search) {
    return request({
        url: `api/customer?page=${page}&pageSize=${pageSize}&search=${search}`,
        method: "GET",
        data: {},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function create(data) {
    return request({
        url: "api/customer/create",
        method: "POST",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function update(data) {
    return request({
        url: "api/customer/update",
        method: "PUT",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function deleteRecord(id) {
    return request({
        url: "api/customer/",
        method: "DELETE",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function read(id) {
    return request({
        url: "api/customer/read",
        method: "POST",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

const CustomerService = {
    getData,
    create,
    read,
    update,
    deleteRecord
};

export default CustomerService;