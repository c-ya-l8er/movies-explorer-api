class CONFLICT_ERROR extends Error {
  constructor(message) {
    super(message);
    this.name = '409_CONFLICT';
    this.statusCode = 409;
  }
}
module.exports = CONFLICT_ERROR;
