import React, {Component} from 'react'

class Cart extends Component {

    constructor(props) {
        super(props)

        this.styles = {
            fontWeight: 'bold',
            fontSize: 10
        }

        this.price = 0

        this.checkout = false
    }

    formatCount(){
        const { count } = this.state
        return count === 0 ? "Zero" : count;
    }

    formatCost(price){
        this.price = price
        this.price = this.price * this.props.count
    }
    
    getCreatedDateString = createdTimestamp => {
        return new Date(createdTimestamp).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    }

    stripeCheckout = (e) => {
        // e.stopPropagation()
        e.preventDefault()
        this.props.pageChange("checkout")
    }

    render() {
        let ar = this.props.domCart
        let total = 0
        return (

            <React.Fragment>
            <div>
                {ar.forEach(function(val, i, a){
                    // console.log(val, i, a)
                    console.log(val)
                    total += parseFloat(val.price) - parseFloat(val.discounted_price)
                })}
            </div>
            <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            {this.props.domCart.map((item, index) => (
                                <div className="itemRow">
                                    <div className="col-sm" key={item.product_id}>
                                        <a href={"/cart/" + item.product_id}>
                                            <img
                                                src={
                                                "https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/product_images/" +
                                                item.image
                                                }
                                                alt=""
                                                width="100"
                                                height="100"
                                            />
                                            <h6>{item.name}</h6>
                                            <p>{item.price}</p>
                                            {this.formatCost(item.price)}
                                            
                                            <code>{item.description}</code>
                                        </a>
                                    </div>
                                    <button onClick={(e) => this.props.removeFromCart(index, e)} className="btn btn-secondary btn-sma">Remove</button>
                                </div>
                            ))}
                        
                        </div>{/* col-8 */}
                        <div class="col-4">
                            <div>
                                <h5>Summary</h5>
                                <p className="cart">
                                    {/* {console.log(this.props.domCart)} */}
                                    {this.props.domCart.map((item) => (
                                        <div>
                                            <p>{item.name}</p>
                                            <p><code>Price</code>${item.price}</p>
                                            <p><code>Discount</code>${item.discounted_price}</p>
                                            <hr />
                                        </div>
                                    ))}
                                    {this.props.cost(total)}
                                    <p>Total: ${total}</p>
                                    <button onClick={(e) => this.stripeCheckout(e)} className="btn btn-secondary btn-sma">Buy Now</button>
                                    
                                </p>
                            </div>
                        </div>{/* col-4 */}
                    </div>{/*row */}

                </div>
            </div>
            </React.Fragment>
            
        )
        
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        return classes += (this.props.count === 0) ? "warning" : "primary";
    }

}

export default Cart;
