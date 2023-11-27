const express = require('express');
const userRouter = new express.Router();
const auth = require('../auth');
const { login, register, logout } = require('../controllers/userController');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', auth, logout);

module.exports = userRouter;
