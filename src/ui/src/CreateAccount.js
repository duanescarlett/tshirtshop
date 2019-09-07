import React, {Component} from 'react';
import UserService from "./UserService";

class CreateAccount extends Component {

    creationError = 'Error creating account. Try again later.';

    handleCreateResponse = (response) => {
        // this.setState({loading: false})
        if (response.status === 201) {
            // this.setState({accountCreated: true, errorMessage: undefined});
            this.props.logged(true)
            this.props.pageChange("home")
            console.log("Account created")
        } else {
            // this.setState({errorMessage: this.loginError});
            console.log("Account was not created")
        }
    }

    handleCreateError = (e) => {
        // this.setState({loading: false})
        if (e.response && e.response.status === 400)
            // this.setState({errorMessage: e.response.data.message})
            console.log(e.response.status)
    }

    handleCreateAcc = (e) => {
        e.preventDefault()
        const { email, password, confirmPassword } = this.props.state
        if (password !== confirmPassword) {
            // this.setState({errorMessage: "Passwords do not match."})
        } else {
            // this.setState({loading: true})
            UserService.createAccount(email,
                password,
                this.handleCreateResponse,
                this.handleCreateError)
        }
    }

    login = e => {
        e.preventDefault()
        this.props.pageChange("login")
    }

    render() {
        const loginButton = <button className="link-button" onClick={(e) => this.login(e)}>Login</button>;
        return (
            <React.Fragment>
              
                <div className="d-flex h-100 align-items-center justify-content-center">
                    {/* {loadingDiv} */}
                    <form className="flex-column w-25">
                        <h4 classNameName="">Create Account</h4>

                        <div className="form-group">
                            <label for="formGroupExampleInput">Email Address</label>
                            <input type="email" id="email" 
                                className="form-control" 
                                onChange={(e) => this.props.onTextChangeCA(e)}
                                />
                        </div>

                        <div className="form-group">
                            <label for="formGroupExampleInput">Password</label>
                            <input type="password" id="password" 
                                className="form-control" 
                                onChange={(e) => this.props.onTextChangeCA(e)}
                            />
                        </div>

                        <div className="form-group">
                            <label for="formGroupExampleInput">Confirm Password</label>
                            <input type="password" id="confirmPassword" 
                                className="form-control" 
                                onChange={(e) => this.props.onTextChangeCA(e)}
                            />
                        </div>

                        <button className="btn btn-lg btn-primary btn-block" 
                            type="submit"
                            onClick={(e) => this.handleCreateAcc(e)}
                            >Create</button>
                        <p className="mt-3 text-center">
                            Already have an account? <br />
                            <button className="link-button">{loginButton}</button>
                        </p>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default CreateAccount;
