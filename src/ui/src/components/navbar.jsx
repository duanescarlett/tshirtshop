import React, { Component } from 'react';
import {Link} from "react-router-dom";
import AuthStore from "../AuthStore";

class NavBar extends Component {

    constructor(){
        super();
        this.state = {resolve: "I will win or die"};
    }

    logout = (event) => {
        event.preventDefault();
        AuthStore.removeToken();
        this.setState({});
    };

    render() { 
        const logout = <button className="link-button nav-link" onClick={this.logout}> Logout</button>;
        return ( 
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <div className="navbar-brand">
                        <img alt="" src="https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/images/tshirtshop.png" />                    
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" exact="true" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/about" exact="true" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/shop" exact="true" className="nav-link">Shop</Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item active">
                                {AuthStore.isLoggedIn() && logout}
                            </li>
                        </ul>

                    </div>
                </nav>
        );
    }

}
 
export default NavBar;