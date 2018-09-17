import React from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect
} from "react-router-dom"

const PrivateRoute = ({component: Component, active, ...rest}) => (
		<Route {...rest} render={props => active
			? (<Component {...props} />)
			: (<Redirect to='/'/>)
		}/>
)

PrivateRoute.propTypes = {
	component: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired,
	path: PropTypes.string.isRequired,
	rest: PropTypes.arrayOf(PropTypes.any.optional)
}

export default PrivateRoute