import React, {Component} from 'react';
import UserService from "../UserService";


class About extends Component {

    getCreatedDateString = (createdTimestamp) => {
        return new Date(createdTimestamp).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    componentDidMount() {
        UserService.loadCurrentUser(this.props.loadedUser, this.props.errorLoading);
    }

    render() {
        if (this.props.loading) {
            return (<div className="d-flex align-items-center justify-content-center overlay">
                <div className="spinner-border text-primary" role="status"/>
            </div>);
        } else {
            return this.props.errorMessage ?
                <div
                    className="h-100 d-flex align-items-center justify-content-center text-danger">{this.state.errorMessage}</div> :
                <div className="h-100 d-flex align-items-center justify-content-center">
                        {/* Hello, {this.state.user.username}! */}
                    {/* Thanks for being a valued member
                    since {this.getCreatedDateString(this.state.user.createdAt)}!
                    <br /> */}
                    <div>
                        <h3>About Us</h3>
                        <p><code></code></p>
                    </div>
                </div>;
        }
    }
}

export default About;
