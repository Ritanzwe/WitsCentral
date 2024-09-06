const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { authenticate } = require('../middlewares/authprotect'); 
const { register, getTutors, updateTutor, deleteTutor } = require('../controllers/tutor.controller');

router.post('/', authenticate, upload.single('profileImage'),register);

router.get('/',getTutors);

router.put('/:id', authenticate, upload.single('profileImage'),updateTutor);

router.delete('/:id', authenticate,deleteTutor);

module.exports = router;
