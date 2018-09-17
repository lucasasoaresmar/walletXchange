import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import Login from '../containers/Login.container'
import Home from './Home'
import PrivateRoute from '../containers/PrivateRoute.container'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRoute path="/home" component={Home}/>
            <Route render={ () => <h1>404 Error</h1> } />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
