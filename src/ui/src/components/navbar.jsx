import React, { Component } from 'react'

class Navbar extends Component {

    pager = (item, e) => {
        e.preventDefault()
        // console.log("Added " + item.name + " to the cart")
        this.props.pageChange(item)
    }

    render(){

        return ( 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">
                    <img alt="" src="https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/images/tshirtshop.png" />                    
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a href="/" onClick={(e) => this.pager("home", e)}>Home</a>
                        </li>
                        <li className="nav-item active">
                            <a href="/about" onClick={(e) => this.pager("about", e)}>About</a>
                        </li>
                        <li className="nav-item active">
                            <a href="/cart" onClick={(e) => this.pager("cart", e)}>Shop</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item active">
                            {/* {AuthStore.isLoggedIn() && logout} */}
                        </li>
                    </ul>

                </div>
            </nav>
        )
    }
}

export default Navbar