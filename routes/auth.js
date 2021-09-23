const express = require('express');

const router = express.Router();

//controllers
const createData = require('../controllers/createdata');
const { userData, postUserData } = require('../controllers/userdata');
const { registerUser, postRegisterUser } = require('../controllers/registerUser');
const { loginUser, postLoginUser } = require('../controllers/loginUser');

//middleware
const uploadImage = require('../middlewares/upload');
const jwtAuth = require('../middlewares/jwtAuth');

router.get('/', createData);
router.get('/data', jwtAuth, userData);
router.get('/register', registerUser);
router.get('/login', loginUser);

router.post('/data', postUserData);
router.post('/register', uploadImage, postRegisterUser);
router.post('/login', postLoginUser);

module.exports = router;