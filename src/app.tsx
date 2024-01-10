import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import ThemeProvider from './theme.provider'
import CONFIG_THEME from './material.theme'

class App extends Component {
    public render() {
        const primaryColor: string = CONFIG_THEME?.light?.palette?.primary?.main || '#000000'
        const commonStyle = 'font-weight: bold;font-style: italic;font-style: italic;'
        const style1 = `${commonStyle};font-size: 40px;color: ${primaryColor};`
        console.log(`%cTEMPLATE WEB-APP`, style1)
        return <Provider store={store}>
            <ThemeProvider/>
        </Provider>
    }
}

export default App
