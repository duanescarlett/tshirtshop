import React, {Component} from 'react'
import Home from './components/home'
import Cart from './components/cart'
import Checkout from './components/checkout'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Searched from './components/searched'
import CreateAccount from './CreateAccount'
import Login from './Login'


class App extends Component {
    constructor(props) {
        super(props);
        this.loadedShirt = this.loadedShirt.bind(this)
        this.errorLoading = this.errorLoading.bind(this)
        this.handleDecrement = this.handleDecrement.bind(this)
        this.handleIncrement = this.handleIncrement.bind(this)
        this.formatCount = this.formatCount.bind(this)
        this.cartAdder = this.cartAdder.bind(this)
        this.searchAdder = this.searchAdder.bind(this)
        this.pageChange = this.pageChange.bind(this)
        this.cost = this.cost.bind(this)
        this.onTextChanged = this.onTextChanged.bind(this)
        this.suggestionSelected = this.suggestionSelected.bind(this)
        this.removeFromCart = this.removeFromCart.bind(this)
        this.getPageCount = this.getPageCount.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.onTextChangeCA = this.onTextChangeCA.bind(this)
        this.logged = this.logged.bind(this)
        this.logout = this.logout.bind(this)
        this.refPage = this.refPage.bind(this)
        this.upDateAuth = this.upDateAuth.bind(this)
        this.state = {
            loading: true,
            itemId: 0,
            errorMessage: undefined,
            shirt: [],
            products: [],
            cart: [],
            page: 'home',
            search: '',
            isHidden: false,
            suggestions: [],
            text: '',
            currentPageNo: 0,
            totalPages: 0,
            logged_in: false,
            email: '',
            password: '',
            confirmPassword: '',
            accountCreated: false,
            refPage: 'home'
        }
        this.items = []
        this.list = []
        this.stateObj = []
        this.search = []
        this.costAmt = 0
        this.totalResults = 0
        this.totalPages = 0
        this.currentPageNo = 0 
        this.arrayIndexCount = 0
    }

    upDateAuth = (q) => {
        this.auth = q
    }

    // This determins the amount of pages to created
    getPageCount = (total, denominator) => {
        const divisible = 0 === total % denominator
        const valueToBeAdded = divisible ? 0 : 1
        this.totalPages = Math.floor(total / denominator) + valueToBeAdded
    }

    // This is the event handler for the pagination buttons
    handlePageClick = (type, e) => {
        e.preventDefault()
        const updatePage = 'prev' === type 
        ? this.currentPageNo - 1
        : this.currentPageNo + 1 

        if(type === 'prev'){
            if(!this.currentPageNo < 1){
                this.arrayIndexCount = this.arrayIndexCount - 10
            }
        }
        else {
            let add = this.totalPages + 1
            if(this.currentPageNo < add){
                this.arrayIndexCount = this.arrayIndexCount + 10
            }
        } 
        this.currentPageNo = updatePage

        this.setState(() => ({
            currentPageNo: updatePage,
            loading: true
        }))

    }

    // This logs the user in or out
    logged = q => {
        // Passed in a boolean
        this.setState(() => ({
            logged_in: q
        }))
        this.auth = q
    }

    onTextChangeCA = e => {
        e.preventDefault()
        console.log("Event: " + e.target.id)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onTextChanged = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const value = e.target.value
        this.state.shirt.map((i) => (
            this.items.push(i.name)
        ))

        if(value.length === 0) {
            this.setState(() => ({
                suggestions: []
            }))
            this.items = []
        }
        else {
            // Add the value to the suggestions state if the 
            // words that start with the value in focus
            this.items.map((item, index) => (
                item.startsWith(value) || item.startsWith(value.toUpperCase())? 
                    value !== item? 
                        this.setState(() => ({
                            suggestions: this.state.suggestions.concat(item)
                        })) 
                    : null
                : null
            ))

        }
        
    }

    suggestionSelected = value => {
        this.setState(() => ({
            text: value,
            suggestions: []
        }))
    }

    cost = amt => {
        this.costAmt += amt        
    }

    // Adds an item to the cart
    cartAdder = item => {
        this.stateObj.cart.push(item)
        return this.stateObj.cart
    }

    // Adds a selection to the search from the autocomplete
    searchAdder = item => {
        this.search.push(item)
        return this.search
    }

    // Remove a single item from the cart
    removeFromCart = (i, e) => {
        e.preventDefault()
        this.stateObj.cart.pop(i)
        console.log("Removed from cart " + this.stateObj.cart)
        this.pageChange("cart")
    }

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

    // This changes the page
    pageChange = page => {
        this.setState(() => ({
            page: page 
        }))
    }

    // This adds the page that you are coming from to the state
    refPage = page => {
        this.setState(() => ({
            refPage: page
        }))
    }

    logout = boo => {
        this.setState(() => ({
            logged_in: boo
        }))
    }

    componentDidMount() {
        this.stateObj = this.state
    }

    render() {
        return ( 
            <div className='page-container'>
                
                <Navbar 
                    pageChange={this.pageChange} 
                    logout={this.logout} 
                    state={this.state} 
                    auth={this.auth}
                    upDateAuth={this.upDateAuth}
                    refPage={this.refPage}
                    />
                    
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
                        searchAdder={this.searchAdder}
                        pageChange={this.pageChange}
                        text={this.state.text}
                        isHidden={this.state.isHidden}
                        toggleIsHidden={this.toggleIsHidden}
                        onTextChanged={this.onTextChanged}
                        suggestionSelected={this.suggestionSelected}
                        suggestions={this.state.suggestions}
                        list={this.state.list}
                        state={this.state}
                        stateObj={this.stateObj}
                        getPageCount={this.getPageCount}
                        handlePageClick={this.handlePageClick}
                        totalResults={this.totalResults}
                        totalPages={this.totalPages}
                        currentPageNo={this.currentPageNo}
                        arrayIndexCount={this.arrayIndexCount}
                        refPage={this.refPage}
                    /> : null
                }

                {this.state.page === "createaccount" ?
                    <CreateAccount 
                        state={this.state} 
                        onTextChangeCA={this.onTextChangeCA}
                        logged={this.logged}
                        pageChange={this.pageChange}
                    /> : null
                }

                {this.state.page === "login" ?
                    <Login
                        state={this.state} 
                        onTextChangeCA={this.onTextChangeCA}
                        logged={this.logged}
                        pageChange={this.pageChange}
                        upDateAuth={this.upDateAuth}
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
                        clearCart={this.clearCart}
                        state={this.state}
                        refPage={this.refPage}
                    /> : null
                }

                {this.state.page === "searched" ? 
                    <Searched
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
                        searched={this.search}
                        cost={this.cost}
                        costAmt={this.costAmt}
                        pageChange={this.pageChange}
                        removeFromCart={this.removeFromCart}
                        clearCart={this.clearCart}
                        cartAdder={this.cartAdder}
                        state={this.state}
                        refPage={this.refPage}
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
                        refPage={this.refPage}
                        state={this.state}
                    /> : null
                }

                <Footer />

            </div>
        )
    }
}

export default App