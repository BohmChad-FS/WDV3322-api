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
                        user: newUser
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
            bcrypt.compare(req.body.password, result.password, (err, result) => {
                // console.log(res.email)
                //console.log(result)
                console.log(req.body.password)
                console.log(result)
                const token = jwt.sign({email: req.email, id: User._id}, process.env.jwt_key)
                if(err) return res.status(501).json({ error: {message: err.message} })
                if(result) {
                    res.status(200).json({
                        message: "Authentication Successful",
                        result: result,
                        name: req.body.firstName,
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
        message: decoded
    });
});

module.exports = routes;