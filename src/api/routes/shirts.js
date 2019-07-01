const express = require('express');
const router = express.Router();
const Tshirt = require('../db/model/T-Shirts');
const ValidateJWT = require('../auth/ValidateJWT');

router.get('/', ValidateJWT, (req, res, next) => {
    // User.findOne({where: {id: req.userId}}).then(user => {
    //     console.log("Fire ------------------------!");
    //     res.json({username: user.username, createdAt: user.created_at});
    // }).catch(err => next(err));
    const id = req.userId;
    Tshirt.findAll({
        attributes: ['image', 'product_id'],
        limit: 10
    }).then(shirt => {
        // console.log(shirt);
        res.json(shirt);
    }).catch(err => next(err));
});

module.exports = router;

// db.Todo.find()
//     .then(function(todos){
//         res.json(todos);
//         throw new Error('oh, no!');
//     })
//     .catch(function(err){
//         res.send(err);
//         res.statusCode = 500
//         res.end(err.message)
//     });