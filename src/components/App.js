import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom"
import Login from '../containers/Login.container'
import Home from './Home'
import Exchanges from './Exchanges'
import PrivateRoute from '../containers/PrivateRoute.container'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/exchanges">Exchanges</Link>
            </li>
          </ul>

          <hr/>

          <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRoute path="/home" component={Home}/>
            <PrivateRoute path="/exchanges" component={Exchanges}/>
            <Route render={ () => <h1>404 Error</h1> } />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
