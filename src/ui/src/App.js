import React, {Component} from 'react'
import Router from './Router'

import Navbar from './components/navbar';

class App extends Component {

    render() {
        return <div className='page-container'>
                <Navbar />
                <Router />
            </div>
    }
}

export default App;
