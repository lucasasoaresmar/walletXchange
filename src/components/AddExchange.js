import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import moment from 'moment'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
  container: {
    ...theme.container,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class AddExchange extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromCurrency: "real",
      toCurrency: "brita",
      amount: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleExchange = this.handleExchange.bind(this)
  }

  handleChange = name => e => this.setState({ [name]: e.target.value })

  handleExchange = e => {
		e.preventDefault()
  	const { fromCurrency, toCurrency, amount } = this.state
  	const { userId, makeExchange } = this.props

		const exchange = {
			from: fromCurrency, 
			to: toCurrency, 
			amount: Number(amount),
			date: moment(new Date()).format('DD/MM/YYYY'),
			userId
		}

		makeExchange(exchange)
	}

  render = () => {
  	const { classes, failure } = this.props

  	return (
  		<FormControl
        component="form" 
        onSubmit={this.handleExchange} 
        className={classes.container} 
        noValidate
        autoComplete="off"
      >
      	<FormControl className={classes.formControl}>
          <TextField
	          label="Trocar"
	          value={this.state.amount}
	          onChange={this.handleChange('amount')}
	          type="number"
	          InputLabelProps={{
	            shrink: true,
	          }}
	          SelectProps={{
            native: 'true',
          	}}
	          margin="normal"
	        />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="fromCurrency">Dessa moeda</InputLabel>
          <NativeSelect
            native='true'
            value={this.state.fromCurrency}
            onChange={this.handleChange('fromCurrency')}
            inputProps={{
              name: 'fromCurrency',
              id: 'fromCurrency',
            }}
          >
            <option value={'real'}>Reais</option>
            <option value={'brita'}>Britas</option>
            <option value={'bitcoin'}>Bitcoins</option>
          </NativeSelect>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="toCurrency">Para essa moeda</InputLabel>
          <NativeSelect
            native='true'
            value={this.state.toCurrency}
            onChange={this.handleChange('toCurrency')}
            inputProps={{
              name: 'toCurrency',
              id: 'toCurrency',
            }}
          >
            <option value={'brita'}>Britas</option>
            <option value={'bitcoin'}>Bitcoins</option>
            <option value={'real'}>Reais</option>
          </NativeSelect>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Trocar
        </Button> 
        
        { failure 
          ? <Chip 
              label={ failure }
              variant="outlined"
              color="primary"
            />
          : null
        }

    	</FormControl>
  	)
  }
}

AddExchange.propTypes = {
  userId: PropTypes.number.isRequired,
  makeExchange: PropTypes.func.isRequired,
  failure: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(AddExchange))
