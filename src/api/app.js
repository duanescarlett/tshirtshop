const cors = require('cors')
const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const stripe = require("stripe")("sk_test_lomdOfxbm7QDgZWvR82UhV6D")
const uuid = require("uuid/v4")

const usersRouter = require('./routes/users')
const shirtsRouter = require('./routes/shirts')

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use(express.urlencoded({
    extended: false
}))

app.get('/', function (req, res) {
    res.send('hello world')
})

app.use('/users', usersRouter)
app.use('/shirts', shirtsRouter)

app.use(function (req, res, next) {
    next(createError(404))
})

app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.send({
        message: err.message
    })
})

app.post('/checkout', async (req, res) => {
    console.log("Request:", req.body)
  
    let error
    let status

    try {
        const { token, product } = req.body
    
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
  
        const idempotency_key = uuid()
        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        },
        {
          idempotency_key
        }
        )
      console.log("Charge:", { charge })
      status = "success"
    } 
    catch (error) {
      console.error("Error:", error)
      status = "failure"
    }
  
    res.json({ error, status })
  })
  
app.listen(8000)

module.exports = app;