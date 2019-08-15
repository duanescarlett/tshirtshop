import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
 
export default class Checkout extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token)
    })
    .then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`)
      })
    })
  }
 
  // ...
 
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            {this.props.domCart.map((item) => (
              <div>
                  <p>{item.name}</p>
                  <p><code>Price</code>${item.price}</p>
                  <p><code>Discount</code>${item.discounted_price}</p>
                  <hr />
              </div>
          ))}
            <p>Total Cost is: ${this.props.costAmt}</p>
          </div>{/* col-8 */}
          <div class="col-4">
            <StripeCheckout
              token={this.onToken}
              stripeKey="pk_test_lr11T87kOYjOCoQ3eH7H0Gpe00oYdgMEhk"
            />
          </div>{/* col-4 */}
        </div>{/* row */}
      </div>
    )
  }
}