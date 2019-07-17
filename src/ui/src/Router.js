import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/home'
import Cart from './components/cart'

const Router = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/cart' component={Cart} />
    </Switch>
);

export default Router