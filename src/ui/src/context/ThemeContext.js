import React, { createContext, Component } from 'react'

export const Context = createContext()

class ContextProvider extends Component {
    state = { 
        isLightTheme: true,
        light: { syntax: '#555', ui: '#ddd', bg: '#eee'},
        dark: { syntax: '#ddd', ui: '#333', bg: '#555'},
        isDarkTheme: false
    }
    render() { 
        return ( 
            <Context.Provider value={{...this.state}}>

            </Context.Provider>
         );
    }
}
 
export default ContextProvider;