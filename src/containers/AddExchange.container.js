import { connect } from 'react-redux'
import AddExchange from '../components/AddExchange'
import { makeExchange } from '../actions/index.js'

const mapStateToProps = (state) => ({
	userId: state.user.id
})

const mapDispatchToProps = (dispatch) => ({
	makeExchange: exchange => dispatch(makeExchange(exchange))
})

export default connect (
	mapStateToProps,
	mapDispatchToProps
)(AddExchange)