import { connect } from 'react-redux'
import AddExchange from '../components/AddExchange'
import { makeExchange } from '../actions/index.js'

const mapStateToProps = (state, ownProps) => ({
	userId: state.user.id,
	failure: state.user.moneyFailure,
	classes: ownProps.classes
})

const mapDispatchToProps = (dispatch) => ({
	makeExchange: exchange => dispatch(makeExchange(exchange))
})

export default connect (
	mapStateToProps,
	mapDispatchToProps
)(AddExchange)