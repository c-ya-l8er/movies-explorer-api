const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const {
  validateLogin,
  validateCreateUser,
} = require('../middlewares/validation');
const userRoutes = require('./users');
const movieRoutes = require('./movies');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

module.exports = router;
