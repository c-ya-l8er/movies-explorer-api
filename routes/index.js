const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const {
  validateLogin,
  validateCreateUser,
} = require('../middlewares/validation');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const NOT_FOUND_ERROR = require('../errors/NotFound');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.all('*', (req, res, next) => {
  next(new NOT_FOUND_ERROR(NOT_FOUND_MESSAGE));
});
module.exports = router;
