import { connect } from 'react-redux'
import MoneyPanel from '../components/MoneyPanel'

const mapStateToProps = (state, ownProps) => ({
	real: state.user.real,
	brita: state.user.brita,
	bitcoin: state.user.bitcoin,
	classes: ownProps.classes
})

export default connect (
	mapStateToProps
)(MoneyPanel)