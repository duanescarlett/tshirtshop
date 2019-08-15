import React, {Component} from 'react'
import ShirtService from "../ShirtService"

class Home extends Component {
    
    getCreatedDateString = createdTimestamp => {
        return new Date(createdTimestamp).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    componentDidMount() {
        if(this.props.loading !== false){
            ShirtService.getShirts(this.props.loadedShirt, this.props.errorLoading)
        }
    }

    addToCart = (item, e) => {
        e.preventDefault()
        // console.log("Added " + item.name + " to the cart")
        let items = this.props.cartAdder(item)
        console.log("Cart Stuff: =>  " + items[0].image)
    }

    buyNow = (item, e) => {
        e.preventDefault()
        this.props.cartAdder(item)
        this.props.pageChange("cart")
    }

    render() {
        return (
            <React.Fragment>
            <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row">
                    {this.props.shirt.map( (item, index) => (
                        <div className="col-sm" key={item.product_id}>
                            <a href="*">
                    
                            <img
                                src={
                                "https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/product_images/" +
                                item.image
                                }
                                alt=""
                                width="100"
                                height="100"
                            />
                            
                            </a>
                            <h6>{item.name}</h6>
                            <p>{item.price}</p>
                            <code>{item.description}</code>
                            
                            <button onClick={(e) => this.addToCart(item, e)} className="btn btn-secondary btn-sm">Add To Cart</button>
                            <a className="btn btn-primary btn-sm" onClick={(e) => this.buyNow(item, e)} href={"cart/" + item.product_id} role="button">Buy Now</a>
                        </div>
                    ))}
                        
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }

}

export default Home
