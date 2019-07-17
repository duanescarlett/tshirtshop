import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar(props){
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">
                <img alt="" src="https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/images/tshirtshop.png" />                    
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink to="/" exact="true" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink to="/about" exact="true" className="nav-link">About</NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink to="/cart" exact="true" className="nav-link">Shop</NavLink>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item active">
                        {/* {AuthStore.isLoggedIn() && logout} */}
                    </li>
                </ul>

            </div>
        </nav>
    );
}

