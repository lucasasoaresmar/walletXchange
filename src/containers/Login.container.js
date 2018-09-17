import { connect } from 'react-redux'
import Login from '../components/Login'
import { login, signup } from '../actions/index.js'

const mapStateToProps = (state, ownProps) => ({
	active: state.user.name !== undefined,
  failure: state.user.userFailure,
  classes: ownProps.classes
})

const mapDispatchToProps = (dispatch) => ({
	login: user => dispatch(login(user)),
	signup: user => dispatch(signup(user))
})

export default connect (
	mapStateToProps,
	mapDispatchToProps
)(Login)