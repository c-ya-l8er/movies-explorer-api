class SERVER_ERROR extends Error {
  constructor(message) {
    super(message);
    this.name = '500_INTERNAL_SERVER_ERROR';
    this.statusCode = 500;
  }
}
module.exports = SERVER_ERROR;
