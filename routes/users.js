const express = require('express');

const router = express.Router();

const { getCurrentUser, updateProfile } = require('../controllers/users');

const { updateProfileSchema } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', updateProfileSchema, updateProfile);

module.exports = router;
