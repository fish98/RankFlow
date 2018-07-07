import React, {Component} from 'react'
import './App.css'
import Index from './pages/index/index'
import DevTools from 'mobx-react-devtools'

class App extends Component {
    render() {
        return (
            <div>
                <Index/>
                <DevTools/>
            </div>
        )
    }
}

export default App