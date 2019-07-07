import React, { Component } from "react";
import {Route} from "react-router-dom";
import ShirtService from "../ShirtService";
// import axios from 'axios'

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      errorMessage: undefined,
      shirt: [],
      products: [],
      filterdProducts: []
    };
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

  // componentDidMount() {
  //     axios.get('/shirts')
  //     .then(res => {
  //         console.log("This is from the shop component: " + res);
  //         this.setState({shirt: res.data});
  //     });
  // }

  render() {
    // const items = this.state.shirt.map((item, key) => (
    //   <li key={item.product_id}>{item.image}</li>
    // ));
    // var i = '';

    if (this.state.loading) {
      return (
        <div className="d-flex align-items-center justify-content-center overlay">
          <div className="spinner-border text-primary" role="status" />
        </div>
      );
    } else {
      return this.state.errorMessage ? (
        <div className="h-100 d-flex align-items-center justify-content-center text-danger">
          {this.state.errorMessage}
        </div>
      ) : (
        <div className="h-100 d-flex align-items-center justify-content-center">
          {/* Hello, {this.state.user.username}! */}

          {/* <p>
            {
              // this.state.shirt.image
              items
            }
          </p> */}
          {/* since {this.getCreatedDateString(this.state.user.createdAt)}! */}
          <div class="container">
            <div class="row">
              {this.state.shirt.map((item, key) => (
                <div class="col-sm" key={item.product_id}>
                  <Route path={'/shirts/'+ item.product_id} exact="true" component={product}>
                    <img
                      src={"https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/product_images/" + item.image}
                      alt=""
                    />
                    <h6>{item.name}</h6>
                    <p>{item.price}</p>
                    <code>{item.description}</code>
                  </Route>
                </div>
                
              ))}
            </div>
          </div>

          {/* <Products products={} handleAddToCart={} /> */}
        </div>
      );
    }
  }
}

export default Shop;
