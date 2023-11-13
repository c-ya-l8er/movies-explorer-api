class NOT_FOUND_ERROR extends Error {
  constructor(message) {
    super(message);
    this.name = '404_NOT_FOUND';
    this.statusCode = 404;
  }
}
module.exports = NOT_FOUND_ERROR;
