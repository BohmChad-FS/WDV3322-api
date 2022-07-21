const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../model/user')
const { findUser, saveUser } = require('../../db/db')
const checkAuth = require('../../auth/checkAuth')
const jwt = require('jsonwebtoken')

routes.post('/signup', (req, res) => {
    findUser({email: req.body.email})
    .then(result => {
        //console.log(result)
        if(result.length > 0) {
            return res.status(409).json({ message: "Email already exists"})
        } else {
            const password = req.body.password;
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({ error: err.message })
                } else {

                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        email: req.body.email,
                        password: hash,
                    })

                    saveUser(newUser);
                    res.status(201).json({
                        message: "User Created",
                        user: {
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            address: newUser.address,
                            city: newUser.city,
                            state: newUser.state,
                            zip: newUser.zip,
                            email: newUser.email,
                            password: req.body.password
                        }
                    })
                }
            })
        }
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).json({
            message: {
                error: err.message
            }
        })
    })
});

routes.post('/login', (req, res) => {
    findUser({email: req.body.email})
    .then(result => {
        if(result.length < 1) {
            res.status(401).json({ message: "Email does not exist" })
        } else {
            const user = result[0]
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                const token = jwt.sign({email: user.email, id: user._id}, process.env.jwt_key)
                //console.log(token)
                if(err) return res.status(501).json({ error: {message: err.message} })
                if(result) {
                    res.status(200).json({
                        message: "Authentication Successful",
                        result: result,
                        name: user.firstName,
                        token: token
                    })
                } else {
                    res.status(401).json({ message: "Authentication Failed" })
                }
            })
        }
    })
});

routes.get('/profile', checkAuth, (req, res, next) => {
    res.status(200).json({
        message: req.userData
    });
});

module.exports = routes;