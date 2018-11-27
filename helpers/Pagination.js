class Pagination {
  constructor(pageNumber, pageSize, totalItems) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
}

module.exports = Pagination;
