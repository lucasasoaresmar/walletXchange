import React from 'react'
import { Redirect } from "react-router-dom"

const Login = ({login, failure, signup, active}) => {
	let name = null
	let password = null

	return (
  <div>
  	{
  		active
	  		? <Redirect to="/home"/>
	  		: null
  	}
    <h2>Login <small>{failure ? '- ' + failure: null}</small></h2>
    <input name='name' placeholder='Name' type='text' 
    	onChange={e => name = e.target.value}
    />
    <input name='password' placeholder='Password' type='text'
    	onChange={e => password = e.target.value}
    />
		<button onClick={() => login({ name, password })}>Login</button>
		<button onClick={() => signup({ name, password })}>Signup</button>
  </div>
)};

export default Login