import { connect } from 'react-redux'
import MoneyPanel from '../components/MoneyPanel'

const mapStateToProps = (state) => ({
	real: state.user.real,
	brita: state.user.brita,
	bitcoin: state.user.bitcoin
})

export default connect (
	mapStateToProps
)(MoneyPanel)