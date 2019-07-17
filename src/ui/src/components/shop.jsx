import React, { Component } from "react";
import ShirtService from "../ShirtService";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cart: false,
      itemId: null,
      errorMessage: undefined,
      shirt: [],
      products: [],
      filterdProducts: []
    };
    this.stateUpdate = null;
  }

  getCreatedDateString = createdTimestamp => {
    return new Date(createdTimestamp).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  loadedShirt = response => {
    // this.setState({loading: false, shirt: response.data});
    // console.log("This ran!!.........");
    if (response.status === 200) {
      this.setState({ loading: false, shirt: response.data });
      console.log("This ran!!.........");
    } else {
      this.setState({
        loading: false,
        errorMessage: "There was an error loading your account."
      });
    }
  };

  errorLoading = err => {
    this.setState({
      loading: false,
      errorMessage: "There was an error loading your account."
    });
  };

  componentDidMount() {
    ShirtService.getShirts(this.loadedShirt, this.errorLoading);
  }

  trigger(id){
    this.stateUpdate = id;
    // this.setState((state) => ({
    //   itemId: state.itemId = this.stateUpdate
    // }))
  }

  backToStore(){
    this.updater = null;
  }

  shop(){
    return (
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div class="container">
          <div class="row">
            
            {this.state.shirt.map((item, key) => (
              <div class="col-sm" key={item.product_id}>
                {/* <a href="*" onClick={this.setState.itemId = item.product_id}> */}
                <a href="/" onClick={
                  e => {
                    e.preventDefault();
                    this.trigger(item.product_id)
                  }
                  
                }>
                  <img
                    src={
                      "https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/product_images/" +
                      item.image
                    }
                    alt=""
                  />
                  <h6>{item.name}</h6>
                  <p>{item.price}</p>
                  <code>{item.description}</code>
                </a>
              </div>
            ))}
          
          </div>
        </div>
      </div>
    );
  }

  cart(){
    return(
      <div>
        <h2>This is the shipping cart</h2>
        <button onClick={this.backToStore()}>
          <h1>Return to Store</h1>
        </button>
      </div>
    );
  }

  render() {
    if(!this.stateUpdate){
      return(this.shop());
    }
    else {
      return(this.cart());
    }
  }
  
}

export default Shop;
