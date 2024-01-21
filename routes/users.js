const express = require('express');

const router = express.Router();

const { getCurrentUser, updateProfile } = require('../controllers/users');

const { getCurrentUserSchema, updateProfileSchema } = require('../middlewares/validation');

router.get('/me', getCurrentUserSchema, getCurrentUser);
router.patch('/me', updateProfileSchema, updateProfile);

module.exports = router;
