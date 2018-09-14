import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import withRoot from '../withRoot'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  container: {
    ...theme.container,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  list: {
    maxHeight: '400px',
    width: '100%',
    overflowY: 'auto',
  },
  subheading: {
    margin: theme.spacing.unit,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  exchange: {
    width: '100%',
  }
})

const getCurrencies = (currency) => {
  switch (currency) {
    case 'real':
      return ['R$', 'reais']
    case 'bitcoin':
      return ['B$', 'bitcoins']
    case 'brita':
      return ['$', 'britas']
    default:
      return ' '
  }
}

const Exchanges = ({exchanges, classes}) => (
  <div className={classes.container}>
    <Typography 
      className={classes.subheading}
        variant="title" 
        color="primary"
    >
      Transações
    </Typography>
    <List className={classes.list}>
      {exchanges.map(exchange =>
        <div className={classes.exchange} key={exchange.id}>
          <ListItem>
            <Avatar className={classes.avatar}>
              {getCurrencies(exchange.to)[0]}
            </Avatar>
            <ListItemText
              primary={
                <span>
                  {getCurrencies(exchange.from)[0]} {exchange.amount.toFixed(2)} em {getCurrencies(exchange.to)[1]}
                </span>
              }
              secondary={<span>{exchange.date}</span>}
            />
          </ListItem>
          <li>
            <Divider inset />
          </li>
        </div>
      )}  
    </List>
  </div>
)

Exchanges.propTypes = {
  exchanges: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(Exchanges))
