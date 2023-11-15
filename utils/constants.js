const http2 = require('http2');

const HTTP_STATUS = Object.fromEntries(
  Object.entries(http2.constants)
    .filter(([key]) => key.startsWith('HTTP_STATUS_'))
    .map(([key, value]) => [key.replace('HTTP_STATUS_', ''), value]),
);

const NOT_FOUND_MESSAGE = 'Запрашиваемый ресурс не найден';
const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const CONFLICT_MESSAGE = 'Пользователь пытается использовать существующий в базе email';
const FORBIDDEN_MESSAGE = 'Запрещен доступ к запрашиваемому ресурсу';
const SERVER_ERROR_MESSAGE = 'Произошла ошибка на стороне сервера';
const UNAUTHORIZED_MESSAGE = 'В запросе не указаны авторизационные данные';

module.exports = {
  HTTP_STATUS,
  NOT_FOUND_MESSAGE,
  BAD_REQUEST_MESSAGE,
  CONFLICT_MESSAGE,
  FORBIDDEN_MESSAGE,
  SERVER_ERROR_MESSAGE,
  UNAUTHORIZED_MESSAGE,
};
