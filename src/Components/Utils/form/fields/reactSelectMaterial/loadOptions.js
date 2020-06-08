import CustomerService from "../../../../../Services/API/client.API";



const getData = async (page, pageSize = 10, search) => {
  return await CustomerService.getData(page, pageSize, search)

};

const loadOptions = async (search, page) => {
    const data = await getData(page, 10, search);
    const totalPages = Math.ceil(data.count / 10);
    const hasMore = page < totalPages;
    return {
        options: data.rows.map(item => { return {value: item.phone, label: item.phone, record: item}}),
        hasMore
    };
};

export default loadOptions;
