import React from 'react'
import MyAppBar from '../containers/MyAppBar.container'
import Exchanges from '../containers/Exchanges.container'
import MoneyPanel from '../containers/MoneyPanel.container'
import AddExchange from '../containers/AddExchange.container'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
    ...theme.background,
    minHeight: '100vh'
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

const Home = ({classes}) => {
	

	return (
	  <div className={classes.root}>
	    <div>
        <MyAppBar/>
		    <MoneyPanel/>
		    <AddExchange/>
        <Exchanges/>
	    </div>
	  </div>
	)
};

export default withRoot(withStyles(styles)(Home))