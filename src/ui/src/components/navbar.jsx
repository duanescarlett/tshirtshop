import React, { Component } from 'react'

class Navbar extends Component {

    pager = (item, e) => {
        e.preventDefault()
        const { refPage } = this.props.state
        this.props.refPage(refPage)
        this.props.pageChange(item)
    }

    auth = () => {
        const { email, logged_in } = this.props.state
        if(logged_in) {
            return <div>{email}<a href="*" className="nav-item active" onClick={this.props.upDateAuth(false)}>Sign Out</a></div>
            
        }
        else {
            return <div><a href="*" className="nav-item active" onClick={(e) => this.pager("login", e)}>Login</a> <a href="/" className="nav-item active" onClick={(e) => this.pager("createaccount", e)}>Sign Up</a></div>
        }
    }

    render(){

        return ( 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">
                    <img alt="" src="https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/images/tshirtshop.png" />                    
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a href="/" onClick={(e) => this.pager("home", e)}>Home</a>
                        </li>
                        <li className="nav-item active">
                            <a href="/about" onClick={(e) => this.pager("about", e)}>About</a>
                        </li>
                    
                    </ul>
                    <ul className="nav">
                        {this.auth()}
                    </ul>

                </div>
            </nav>
        )
    }
}

export default Navbar