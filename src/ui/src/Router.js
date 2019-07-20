import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/home'
// import Cart from './components/cart'
import CartTest from './components/cart-test'

const Router = () => (
    <Switch>
        {/* <Route exact path='/' component={Home} /> */}
        <Route exact path='/cart/:id' component={CartTest} />
        <Route 
            exact 
            path='/'
            render={(props) => (
                <Home {...props} />
            )} />

        <Route 
            exact 
            path='/cart'
            render={(props) => (
                <CartTest {...props} />
            )} />

    </Switch>
);

export default Router