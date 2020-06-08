import request from "./wrapper/request";

function getData() {
    return request({
        url: "api/whereKnown",
        method: "GET",
        data: {},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function create(data) {
    return request({
        url: "api/whereKnown/create",
        method: "POST",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function update(data) {
    return request({
        url: "api/whereKnown/update",
        method: "PUT",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function deleteRecord(id) {
    return request({
        url: "api/whereKnown/",
        method: "DELETE",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

function read(id) {
    return request({
        url: "api/whereKnown/read",
        method: "POST",
        data: {id},
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    })
}

const WhereKnownService = {
    getData,
    create,
    read,
    update,
    deleteRecord
};

export default WhereKnownService;