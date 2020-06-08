import request from "./wrapper/request";

function getData(page, pageSize, search) {
    return request({
        url: `api/stock?page=${page}&pageSize=${pageSize}&search=${search}`,
        method: "GET",
        data: {},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function create(data) {
    return request({
        url: "api/stock/create",
        method: "POST",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function update(data) {
    return request({
        url: "api/stock/update",
        method: "PUT",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function deleteRecord(id) {
    return request({
        url: "api/stock/",
        method: "DELETE",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function read(id) {
    return request({
        url: "api/stock/read",
        method: "POST",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}
function moveToDefect(record) {
    return request({
        url: "api/stock/moveToDefect",
        method: "POST",
        data: record,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

const StockService = {
    getData,
    create,
    read,
    update,
    deleteRecord,
    moveToDefect
};

export default StockService;