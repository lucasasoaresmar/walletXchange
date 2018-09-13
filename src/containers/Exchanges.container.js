import { connect } from 'react-redux'
import Exchanges from '../components/Exchanges'

const mapStateToProps = (state, ownProps) => ({
	exchanges: state.exchanges,
	classes: ownProps.classes
})

export default connect (
	mapStateToProps
)(Exchanges)