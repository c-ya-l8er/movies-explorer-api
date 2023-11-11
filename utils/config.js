// console.log(process.env.JWT_SECRET);
module.exports = {
  JWT_SECRET: process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'super-puper-secret',
  MONGO_URL: process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb',
};
