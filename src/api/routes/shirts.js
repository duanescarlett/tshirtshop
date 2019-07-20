const express = require('express');
const router = express.Router();
const Tshirt = require('../db/model/T-Shirts');
const ValidateJWT = require('../auth/ValidateJWT');

router.get('/', (req, res, next) => {
    // User.findOne({where: {id: req.userId}}).then(user => {
    //     console.log("Fire ------------------------!");
    //     res.json({username: user.username, createdAt: user.created_at});
    // }).catch(err => next(err));
    const id = req.userId;
    Tshirt.findAll({
        attributes: [
            'image',
            'product_id',
            'name',
            'price',
            'discounted_price',
            'description'
        ],
        limit: 100
    }).then(shirt => {
        // console.log(shirt);
        res.json(shirt);
    }).catch(err => next(err));
});

router.get('/:product_id', (req, res, next) => {

    Tshirt.findAll({
        where: {
            product_id: req.params.product_id
        }
    })
    .then(product => {
        console.log("This is from the api shirts route " + product)
        res.json(product);
    })
    .catch(err => next(err));

});

module.exports = router;
