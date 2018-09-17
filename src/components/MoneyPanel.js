import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import withRoot from '../withRoot'  
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    ...theme.container,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  subheading: {
    margin: theme.spacing.unit,
  },
  line: {
    width: '100%',
    margin: theme.spacing.unit,
  },
  alignRight: {
    float: 'right'
  },
})

const MoneyPanel = ({real, brita, bitcoin, classes}) => {

	const currencies = [
		{
			amount: real,
			name: 'reais',
      style: classes.real,
      currency: 'R$'
		},
		{
			amount: brita,
			name: 'britas',
      style: classes.brita,
      currency: '$'
		},
		{
			amount: bitcoin,
			name: 'bitcoins',
      style: classes.bitcoin,
      currency: 'B$'
		}
	]

	return (
    <div className={classes.container}>

      <Typography 
      className={classes.subheading}
        variant="title" 
        color="primary"
      >
        Em conta
      </Typography>
      {currencies.map(cur =>
        <Typography key={cur.name} className={classes.line} variant="body2" gutterBottom>
          {cur.currency} {cur.name === 'bitcoins' ? cur.amount.toFixed(8) : cur.amount.toFixed(2)} 
          <span className={classes.alignRight}>
            <small>{cur.name}</small>
          </span>
        </Typography>
      )}  
    </div>
	)
}

MoneyPanel.propTypes = {
  real: PropTypes.number.isRequired,
  brita: PropTypes.number.isRequired,
  bitcoin: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(MoneyPanel))
