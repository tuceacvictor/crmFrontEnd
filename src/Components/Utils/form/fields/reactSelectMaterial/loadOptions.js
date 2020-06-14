const getData = async (page, pageSize = 10, search, service) => {
  return await service.getData(page, pageSize, search)

};

const loadOptions = async (search, page, service, getLabel, getValue) => {
    const data = await getData(page, 10, search, service);
    const totalPages = Math.ceil(data.count / 10);
    const hasMore = page < totalPages;
    return {
        options: data.rows.map(item => { return {value: item[getValue], label: item[getLabel], record: item}}),
        hasMore
    };
};

export default loadOptions;
