import { connect } from 'react-redux'
import Exchanges from '../components/Exchanges'

const mapStateToProps = (state) => ({
	exchanges: state.exchanges
})

export default connect (
	mapStateToProps
)(Exchanges)