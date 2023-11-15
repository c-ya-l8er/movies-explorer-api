class UNAUTHORIZED_ERROR extends Error {
  constructor(message) {
    super(message);
    this.name = '401_UNAUTHORIZED';
    this.statusCode = 401;
  }
}
module.exports = UNAUTHORIZED_ERROR;
