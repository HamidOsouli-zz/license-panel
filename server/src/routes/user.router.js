const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
import User from './../models/User.model';
userRouter.post('/login', async (req, res, next) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    };
    if (!user.username || !user.password) {
        res.status(400).json({"message": "Bad request: Enter username and password"})
    }
    const foundUser = await User.findOne({username: user.username, password: user.password});
    if (!foundUser) {
        res.status(401).json({"message": "Username or password is wrong"})
    }
    const userToken = {
        name: foundUser.username,
        role: foundUser.role,
        id: foundUser._id
    }
    const accessToken = jwt.sign(
        userToken,
        "secret"
    );
    userToken.accessToken = accessToken
    await res.status(200).json({user: userToken});
});

export default userRouter;