import request from "./wrapper/request";

function getCustomers(data) {
    return request({
        url: "api/orders/",
        method: "GET",
        data: data,
        headers: {
            'Authorization': `Bearer ${(JSON.parse(localStorage.getItem('userData')) || {}).token}`
        }
    });
}


const CustomerService = {
    getCustomers
};

export default CustomerService;