import React, {Component} from 'react'
import Router from './Router'

import Navbar from './components/navbar';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            cart: false,
            itemId: null,
            errorMessage: undefined,
            shirt: [],
            products: [],
            filterdProducts: []
        };
    }

    render() {
        return <div className='page-container'>
            <Navbar />
            <Router 
                loading={this.state.loading} 
                itemId={this.state.itemId} 
                shirt={this.state.shirt} 
            />
        </div>
    }
}

export default App;
