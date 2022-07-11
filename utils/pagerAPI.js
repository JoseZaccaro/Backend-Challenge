const pager = (queryInfo) => {

    const currentPage = Number(queryInfo?.page) || 1;//2
    const pageSize = Number(queryInfo?.limit) || Number(queryInfo?.size) || 1000; //10

    const skip = pageSize * (currentPage - 1);
    const limit = pageSize;

    return { currentPage, pageSize, limit, skip }
}

module.exports = pager;