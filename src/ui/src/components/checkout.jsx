import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { toast } from 'react-toastify'
 
export default class Checkout extends React.Component {

  constructor(props) {
    super(props)
    this.product = undefined
    toast.configure()
  }

  onToken = (token) => {
    axios('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token)
    })
    .then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`)
      })
    })
  }
 
  async handleToken(token) {
  
    const product = {
      name: "Tesla Roadster",
      price: 64998.67,
      description: "Cool car"
    }
    
    const response = await axios.post(
      "/checkout",
      { token, product }
    )
    const { status } = response.data
    console.log("Response:", response.data)
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" })
    } 
    else {
      toast("Something went wrong", { type: "error" })
    }
  }
 
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            {this.props.domCart.map((item) => (
              <div key={item.key}>
                  <img
                    src={
                    "https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/product_images/" +
                    item.image
                    }
                    alt=""
                    width="100"
                    height="100"
                />
                  <p>{item.name}</p>
                  <p><code>Price</code>${item.price}</p>
                  <p><code>Discount</code>${item.discounted_price}</p>
                  <hr />
              </div>
          ))}
            <p>Total Cost is: ${this.props.costAmt.toFixed(2)}</p>
          </div>{/* col-8 */}
          <div class="col-4">
            <StripeCheckout
              token={this.handleToken}
              stripeKey="pk_test_lr11T87kOYjOCoQ3eH7H0Gpe00oYdgMEhk"
              // stripeKey="sk_test_lomdOfxbm7QDgZWvR82UhV6D"
              amount={this.props.costAmt * 100}
              currency={"USD"}
              product={this.props.domCart}
              metadata={{order_id: Math.random() * 1239}}
            />
          </div>{/* col-4 */}
        </div>{/* row */}
      </div>
    )
  }
}