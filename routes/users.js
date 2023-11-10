const router = require('express').Router();
const { validateUpdateProfile } = require('../middlewares/validation');
const { getCurrentUser, updateProfile } = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateProfile, updateProfile);

module.exports = router;
