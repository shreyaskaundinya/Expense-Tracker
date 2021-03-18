var express = require('express');
var cors = require('../utils/cors.util.js');
var User = require('../models/user.model');
var router = express.Router();
var CryptoJS = require('crypto-js');
var AES = require('crypto-js/aes');

const notSupported = (req, res) => {
    res.statusCode = 405;
    res.end(`${req.method} not supported on ${req.originalUrl}`);
};

async function Login(req, res) {
    const data = req.body.data;
    const username = data.username;
    const password = data.password;

    // try finding user
    try {
        const userRecord = await User.findOne({ username: username });
        const user = { _id: userRecord._id, username: userRecord.username };
        // if user is found, check for password
        // Decrypt the password
        var dePassword = CryptoJS.AES.decrypt(
            userRecord.password,
            'qwertyuiopasdfghjklzxcvbnm'
        );
        // decoding
        var decodedPassword = dePassword.toString(CryptoJS.enc.Utf8);
        if (decodedPassword === password) {
            return res.status(200).json({ status: 200, user: user });
        } else {
            return res
                .status(200)
                .json({ status: 200, err: 'Invalid Password' });
        }
    } catch (error) {
        return res.status(200).json({ status: 200, err: 'User not found' });
    }
}

async function SignUp(req, res) {
    const data = req.body.data;
    const username = data.username;

    // check for duplicate user
    try {
        // find user using username
        const userRecord = await User.findOne({ username: username });
        // if user is found
        if (userRecord) {
            return res
                .status(200)
                .json({ status: 200, err: 'Duplicate user found.' });
        }
    } catch (error) {}

    const password = data.password;
    const repeatPassword = data.repeatPassword;

    // check if confirm password is correct

    if (password === repeatPassword) {
        //  encrypt the password
        var enPassword = CryptoJS.AES.encrypt(
            data.password,
            'qwertyuiopasdfghjklzxcvbnm'
        );
        const newUser = await User.create({
            username: username,
            password: enPassword.toString(),
        });
        return res.status(200).json({
            status: 200,
            user: { _id: newUser._id, username: newUser.username },
        });
    } else {
        return res
            .status(200)
            .json({ status: 200, err: "Password Does'nt Match" });
    }
}

router
    .route('/login')
    .options(cors.whitelist, function (request, response) {
        response.sendStatus(200);
    })
    .get(notSupported)
    .post(Login)
    .put(notSupported)
    .delete(notSupported);

router
    .route('/signup')
    .options(cors.whitelist, function (request, response) {
        response.sendStatus(200);
    })
    .get(notSupported)
    .post(SignUp)
    .put(notSupported)
    .delete(notSupported);

module.exports = router;
