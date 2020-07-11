import request from "./wrapper/request";

function getData(page, pageSize, search) {
    return request({
        url: `api/order?page=${page}&pageSize=${pageSize}&search=${search}`,
        method: "GET",
        data: {},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function create(data) {
    return request({
        url: "api/order/create",
        method: "POST",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function update(data) {
    return request({
        url: "api/order/update",
        method: "PUT",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function deleteRecord(id) {
    return request({
        url: "api/order/",
        method: "DELETE",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function read(id) {
    return request({
        url: "api/order/read",
        method: "POST",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

const OrderService = {
    getData,
    create,
    read,
    update,
    deleteRecord
};

export default OrderService;