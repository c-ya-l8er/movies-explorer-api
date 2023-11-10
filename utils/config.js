require('dotenv').config();

// console.log(process.env.NODE_ENV);
module.exports = {
  JWT_SECRET: process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'super-puper-secret',
  MONGO_URL: process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb',
};
