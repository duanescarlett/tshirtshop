import React, { Component } from "react";
import {Redirect} from "react-router-dom";
// import ShirtService from "../ShirtService";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          errorMessage: undefined,
          shirt: []
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
        ShirtService.getShirt(this.loadedShirt, this.errorLoading);
      }
    
    
      render() {
    
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
    
              <div class="container">
                <div class="row">
                  {this.state.shirt.map((item, key) => (
                    <div class="col-sm" key={item.product_id}>
                        <Redirect>
                        <img
                            src={"https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/product_images/" + item.image}
                            alt=""
                        />
                        <h6>{item.name}</h6>
                        <p>{item.price}</p>
                        <code>{item.description}</code>
                        </Redirect>
                    </div>
                    
                  ))}
                </div>
              </div>

            </div>
          );
        }
      }
}

export default Product