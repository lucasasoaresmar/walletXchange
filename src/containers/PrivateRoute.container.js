import { connect } from 'react-redux'
import PrivateRoute from '../components/PrivateRoute'

const mapStateToProps = (state) => ({
  active: state.user.name !== undefined
})

export default connect (
	mapStateToProps
)(PrivateRoute)