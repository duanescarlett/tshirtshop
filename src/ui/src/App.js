import React, {Component} from 'react'
import Home from './components/home'
import Cart from './components/cart'
import Checkout from './components/checkout'
import Navbar from './components/navbar'


class App extends Component {
    constructor(props) {
        super(props);
        this.loadedShirt = this.loadedShirt.bind(this)
        this.errorLoading = this.errorLoading.bind(this)
        this.handleDecrement = this.handleDecrement.bind(this)
        this.handleIncrement = this.handleIncrement.bind(this)
        this.formatCount = this.formatCount.bind(this)
        this.cartAdder = this.cartAdder.bind(this)
        this.pageChange = this.pageChange.bind(this)
        // this.cartCost = this.cartCost.bind(this)
        this.cost = this.cost.bind(this)
        // this.removeFromCart = this.removeFromCart.bind(this)
        this.state = {
            loading: true,
            itemId: 0,
            errorMessage: undefined,
            shirt: [],
            products: [],
            cart: [],
            page: "home"
        }
        this.stateObj = []
        this.costAmt = 0
    }

    cost = amt => {
        console.log("This is the amount on the app.js before added to costAmt => " + amt)
        this.costAmt += amt
        console.log("This is the total cost on app.js => " + this.costAmt)
        // this.pageChange("cart")
    }

    cartAdder = item => {
        this.stateObj.cart.push(item)
        return this.stateObj.cart
    }

    // cartCost = price => {
    //     this.stateObj.cost = price
    // }

    loadedShirt = res => {
        if (res.status === 200) {
            this.setState({ loading: false, shirt: res.data })
        } 
        else {
            this.props.errorMessage = "There was an error loading your account."
        }
    }

    errorLoading = err => {
        this.setState({
            loading: false,
            errorMessage: "There was an error loading your account."
        })
    }

    handleIncrement = () => {
        console.log("Increment Clicked", this)
        this.setState({
            count: this.state.count + 1
        })
    }

    handleDecrement = () => {
        console.log("Decrement Clicked", this)
        this.setState({
            count: this.state.count - 1
        })
    }

    formatCount(){
        const { count } = this.state
        return count === 0 ? "Zero" : count;
    }

    pageChange = page => {
        this.setState({ page: page })
    }

    // removeFromCart = i => {
    //     this.stateObj.cart.pop(i)
    //     console.log("Removed from cart " + this.stateObj.cart)
    //     this.pageChange("cart")
    // }

    componentDidMount() {
        this.stateObj = this.state
    }

    render() {
        return ( 
            <div className='page-container'>
                
                <Navbar pageChange={this.pageChange} />
                {this.state.page === "home" ?
                    <Home 
                        loading={this.state.loading} 
                        itemId={this.state.itemId} 
                        shirt={this.state.shirt} 
                        cart={this.stateObj.cart}
                        errorMessage={this.state.errorMessage}
                        loadedShirt={this.loadedShirt}
                        errorLoading={this.errorLoading}
                        cartAdder={this.cartAdder}
                        pageChange={this.pageChange}
                    /> : null 
                }

                {this.state.page === "cart" ? 
                    <Cart 
                        loading={this.state.loading} 
                        itemId={this.state.itemId} 
                        shirt={this.state.shirt} 
                        cart={this.state.cart}
                        errorMessage={this.state.errorMessage}
                        errorLoading={this.errorLoading}
                        handleIncrement={this.handleIncrement}
                        handleDecrement={this.handleDecrement}
                        formatCount={this.formatCount}
                        params={this.state}
                        domCart={this.stateObj.cart}
                        cost={this.cost}
                        costAmt={this.costAmt}
                        pageChange={this.pageChange}
                        removeFromCart={this.removeFromCart}
                    /> : null
                }

                {this.state.page === "checkout" ?
                    <Checkout 
                        loading={this.state.loading} 
                        itemId={this.state.itemId} 
                        shirt={this.state.shirt} 
                        domCart={this.stateObj.cart}
                        cost={this.cost}
                        costAmt={this.costAmt}
                        errorMessage={this.state.errorMessage}
                        loadedShirt={this.loadedShirt}
                        errorLoading={this.errorLoading}
                        pageChange={this.pageChange}
                    /> : null
                }
            
            </div>
        )
    }
}

export default App;
