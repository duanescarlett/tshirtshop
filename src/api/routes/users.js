const express = require('express');
const router = express.Router();
const User = require('../db/model/User');
const Tshirt = require('../db/model/T-Shirts');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ValidateJWT = require('../auth/ValidateJWT');

function ValidateUsernamePassword(req, res, next) {
    if (!req.body.email || !req.body.password) {
        // res.status(400).send({message: 'Please provide both username and password'})
        res.status(400).send({message: req.body.password})
    } else {
        next();
    }
}

router.post('/', ValidateUsernamePassword, (req, res, next) => {
    User.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        if (!user) {
            User.create({
                email: req.body.email, 
                password: bcrypt.hashSync(req.body.password)
            })
            .then(() => res.status(201).send({
                message: "Created user."
            }))
            .catch(err => next(err))
        } 
        else {
            res.status(400).send({message: "Username already exists."})
        }
    })
    .catch(err => next(err))
})

router.post('/login', ValidateUsernamePassword, (req, res, next) => {
    User.findOne({where: {email: req.body.email}}).then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            jwt.sign({userId: user.id},
                     ValidateJWT.TOKEN_SECRET,
                     {expiresIn: 24 * 7 * 60 * 60},
                (err, token) => {
                    err ? next(err) : res.json({token: token});
                });
        } else {
            res.status(400).send({message: "Invalid credentials!"});
        }
    }).catch(err => next(err));
});

router.get('/me', ValidateJWT, (req, res, next) => {
    User.findOne({where: {id: req.userId}}).then(user => {
        console.log("Fire ------------------------!");
        res.json({email: user.email, createdAt: user.created_at});
    }).catch(err => next(err));
});

// router.get('/shop', ValidateJWT, (req, res, next) => {
//     // User.findOne({where: {id: req.userId}}).then(user => {
//     //     res.json({username: user.username, createdAt: user.created_at});
//     // }).catch(err => next(err));
//     const id = req.userId;
//     Tshirt.findAll({
//         attributes: ['image']
//     }).then(shirt => {
//         console.log(shirt);
//         res.json({shirt: shirt.image});
//     }).catch(err => next(err));
// });

router.get('/home', ValidateJWT, (req, res, next) => {
    User.findOne({where: {id: req.userId}}).then(user => {
        res.json({email: user.email, createdAt: user.created_at});
    }).catch(err => next(err));
});

// router.get('/test', (req, res, next) => {
//     User.findAll().then(users => {
//         console.log("All users:", JSON.stringify(users, null, 4));
//     });
// });


module.exports = router;
