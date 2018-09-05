import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  //Redirect,
  // withRouter
} from "react-router-dom"
import Login from './Login'
import Home from './Home'
import Exchanges from './Exchanges'

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

          <Route exact path="/" component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/exchanges" component={Exchanges}/>
        </div>
      </Router>
    )
  }
}

export default App
