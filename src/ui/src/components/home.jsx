import React, {Component} from 'react';
import UserService from "../UserService";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: true, errorMessage: undefined}
    }

    getCreatedDateString = (createdTimestamp) => {
        return new Date(createdTimestamp).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    loadedUser = (response) => {
        if (response.status === 200) {
            this.setState({loading: false, user: response.data});
        } else {
            this.setState({loading: false, errorMessage: 'There was an error loading your account.'});
        }
    };

    errorLoading = (err) => {
        this.setState({loading: false, errorMessage: 'There was an error loading your account.'});
    };

    componentDidMount() {
        UserService.loadCurrentUser(this.loadedUser, this.errorLoading);
    }

    render() {
        if (this.state.loading) {
            return (<div className="d-flex align-items-center justify-content-center overlay">
                <div className="spinner-border text-primary" role="status"/>
            </div>);
        } else {
            return this.state.errorMessage ?
                <div
                    className="h-100 d-flex align-items-center justify-content-center text-danger">{this.state.errorMessage}</div> :
                <div className="h-100 d-flex align-items-center justify-content-center">
                        {/* <p>Hello, {this.state.user.username}</p>
                    Thanks for being a valued member
                    since {this.getCreatedDateString(this.state.user.createdAt)}! */}
                    <br />
                    <div>
                        <h3>Welcome to the T-Shirt Shop</h3>
                        <p><code>You will find your style and size</code></p>
                    </div>
                </div>;
        }
    }
}

export default Home;