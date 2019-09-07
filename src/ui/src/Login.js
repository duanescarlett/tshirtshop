import React, {Component} from 'react'
// import AuthStore from "./AuthStore"
import UserService from "./UserService"

class Login extends Component {

    loginError = 'Error logging in. Try again later.'

    // constructor(props) {
    //     super(props);
    //     this.props.pageChange(this.props.page)
    // }

    handleLoginResponse = (response) => {
        const { refPage } = this.props.state
        if (response.status === 201) {
            
            // this.props.logged(true)
            // this.props.auth = true
            this.props.upDateAuth(true)
            console.log("Ref page: " + refPage)
            this.props.pageChange(refPage)
            
            // console.log("Login was a success")
            
        } 
        else {
            this.setState({
                loading: false, 
                errorMessage: this.loginError
            })
        }
    }

    handleLoginError = (err) => {
        if (err.response && err.response.status === 400)
            this.setState({loading: false, errorMessage: err.response.data.message})
        else
            this.setState({loading: false, errorMessage: this.loginError})
    }

    login = e => {
        const { email, password } = this.props.state
        e.preventDefault()
        UserService.login(
            email,
            password,
            this.handleLoginResponse,
            this.handleLoginError
        )
    }

    createAccount = e => {
        e.preventDefault()
        this.props.pageChange("createaccount")
    }

    render() {
        const { errorMessage } = this.props.state
        const errorMessageDiv = errorMessage &&
            <div className="text-danger mb-2">{errorMessage}</div>;

        const createButton = <button className="link-button" onClick={(e) => this.createAccount(e)}>Create one.</button>;

        return (
            <div className="d-flex flex-column h-100 align-items-center justify-content-center">
                <form className="flex-column w-25">
                    <h1 className="h3 mb-3 font-weight-normal">Log in</h1>
                    {errorMessageDiv}

                    <div className="form-group">
                        <label for="formGroupExampleInput">Email Address</label>
                        <input autoComplete="off" 
                            type="email" 
                            id="email" 
                            className="form-control mb-3"
                            onChange={(e) => this.props.onTextChangeCA(e)}
                            />
                    </div>

                    <div className="form-group">
                        <label for="formGroupExampleInput">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="form-control mb-3"
                            onChange={(e) => this.props.onTextChangeCA(e)}
                            />
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={(e) => this.login(e)}>
                        Sign in
                    </button>
                    <p className="mt-3 text-center">Don't have an account? {createButton}</p>

                </form>
            </div>
        )
    }
}

export default Login;
