import React from 'react'
// // import axios from 'axios'
// import { Redirect } from 'react-router-dom'

function Cart(props) {

    console.log(props)

    return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div class="container">
                <div class="row">
                    {props.shirt.map((item, key) => (
                    <div class="col-sm" key={item.product_id}>
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
                        {/* {this.formatCost(item.price)} */}
                        
                        <code>{item.description}</code>
                        </a>
                    </div>
                    ))}

                    {/* <div>
                        <span style={ this.styles } className={this.getBadgeClasses()}>{this.props.formatCount()}</span>
                        <button onClick={this.handleIncrement} className="btn btn-secondary btn-sma">+</button>
                        <button onClick={this.handleDecrement} className="btn btn-secondary btn-sma">-</button>
                        <button className="addToCart">Add To Cart</button>
                    </div> */}
                    {/* <div>
                        { this.price.price }
                    </div> */}
                    <div>
                    {/* <button onClick={this.setRedirect} className="btn btn-secondary btn-sma">Buy Now</button> */}
                    </div>
                    
                </div>
            </div>
        </div>
    );
    
}

export default Cart;
