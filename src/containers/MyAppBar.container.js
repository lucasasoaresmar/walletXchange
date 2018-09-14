import { connect } from 'react-redux'
import MyAppBar from '../components/MyAppBar'
import { logout } from '../actions/index.js'

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout())
})

export default connect (
	null,
	mapDispatchToProps
)(MyAppBar)