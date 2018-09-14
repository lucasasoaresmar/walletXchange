import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

const MyAppBar = ({logout, classes}) => (
  <div>
    <AppBar position="fixed">
      <Toolbar className={classes.spaceBetween}>
        <Typography variant="title" color="inherit">
          ExchangeIT
        </Typography>
        <Button onClick={() => logout()} color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  </div>
)

MyAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

export default withStyles(styles)(MyAppBar)