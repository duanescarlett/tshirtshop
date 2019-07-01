import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Login from "./Login";
import AuthStore from "./AuthStore";
import Home from "./components/home";
import Shop from "./components/shop";
import About from "./components/about";
import CreateAccount from "./CreateAccount";
import axios from "axios/index";
import NavBar from './components/navbar';

class App extends Component {

    logout = (event) => {
        event.preventDefault();
        AuthStore.removeToken();
        this.setState({});
    };

    componentWillMount() {
        axios.defaults.timeout = 10000;
        axios.defaults.headers.common['Authorization'] = `Bearer ${AuthStore.getToken()}`;
    }

    render() {
        function PrivateRoute({component: Component, ...rest}) {
            return (
                <Route
                    {...rest}
                    render={(props) => AuthStore.isLoggedIn()
                        ? <Component {...props}/>
                        : <Redirect to={{pathname: '/login'}}/>}/>
            );
        }

        return (
            <div className='h-100'>
                <NavBar />
                <div className='h-100'>

                    <Switch>
                        <Route path="/" exact="true" component={Home}/>
                        <Route path="/login" exact="true" component={Login}/>
                        <Route path="/create" exact="true" component={CreateAccount}/>
                        <Route path="/about" exact="true" component={About}/>
                        <PrivateRoute path="/shop" exact="true" component={Shop}/>
                    </Switch>

                </div>
            </div>
        );
    }
}

export default App;
