import React, {Component} from 'react'
import ShirtService from "../ShirtService"

class Home extends Component {
    
    constructor(props) {
        super(props)
        this.display = []
    }

    getCreatedDateString = createdTimestamp => {
        return new Date(createdTimestamp).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    }

    componentDidMount = () => {
        if(this.props.loading !== false){
            ShirtService.getShirts(this.props.loadedShirt, this.props.errorLoading)
        }
    }

    // This adds items to the cart
    addToCart = (item, e) => {
        e.preventDefault()
        let items = this.props.cartAdder(item)
        console.log("Cart Stuff: =>  " + items[0].image)
    }

    // This handles the event from the buy button
    buyNow = (item, e) => {
        e.preventDefault()
        this.props.cartAdder(item)
        this.props.pageChange("cart")
    }

    // This calculates the amount of pages needed for pagination
    pageCount = count => {
        this.props.getPageCount(count + 1, 20)
    }

    // This handles the event for the search engine
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.shirt.map((item) => (
            item.name === this.props.text ? this.props.searchAdder(item): null
        ))
        this.props.pageChange("searched")
    }

    // Get the data for the products from the API
    shirtDisplay = () => {
        let add = this.props.arrayIndexCount + 10
        this.display = this.props.shirt.slice(this.props.arrayIndexCount, add)
    }

    render() {
        this.shirtDisplay()
        this.pageCount(this.props.shirt.length)
        const showPrevLink = 1 <= this.props.currentPageNo
        const showNextLink = this.props.totalPages > this.props.currentPageNo
        console.log("Total Pages: " + this.props.totalPages)
        console.log("Current Page: " + this.props.currentPageNo)
        console.log("This array index count: " + this.props.arrayIndexCount)
        console.log("Total Results: " + this.props.totalResults)
        console.log("This is the length of the array: " + this.props.shirt.length)
        
        return (
            
            <React.Fragment>
            <div className="h-100 d-flex align-items-center justify-content-center">
                
                <div className="container">
                    <form>
                        <div className="form-group">

                            <input type="text" value={this.props.text} onChange={(e) => this.props.onTextChanged(e)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Shirts by name" />
                            {!this.props.isHidden? " " : this.props.text}
                            <ul>
                                {this.props.suggestions.map((s, key) => (
                                    <li onClick={() => this.props.suggestionSelected(s)} className="list-style" key={key}>{s}</li>
                                ))}
                            </ul>
                            <button onClick={(e) => this.handleSubmit(e)}>Search</button>
                        </div>
                    </form>
                    <div className="row">

                    {this.display.map((item, i) => (
                        <div className="col-sm shirt_qube" key={item.product_id}>
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
                            
                            <button onClick={(e) => this.addToCart(item, e)} className="btn btn-warning btn-sm">Cart</button>
                            <a className="btn btn-primary btn-sm" onClick={(e) => this.buyNow(item, e)} href={"cart/" + item.product_id} role="button">Buy</a>
                        </div>
                    ))}
                    
                        <div className="nav-link-container">
                            <a 
                            href="/" 
                            className={`nav-link ${ showPrevLink ? 'show' : 'hide'}`}
                            onClick={(e) => this.props.handlePageClick('prev', e)}>Prev
                            </a>

                            <a 
                            href="/" 
                            className={`nav-link ${ showNextLink ? 'show' : 'hide'}`}
                            onClick={(e) => this.props.handlePageClick('next', e)}>Next
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            </React.Fragment>
        )
    }

}

export default Home