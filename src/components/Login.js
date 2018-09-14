import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Visibility from '@material-ui/icons/Visibility'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 15,
    ...theme.background,
    height: '100vh'
  },
  formControl: {
    margin: theme.spacing.unit
  },
  container: {
    ...theme.container
  },
  button: {
    margin: theme.spacing.unit
  },
})


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleLogin(e) {
    const { name, password } = this.state
    this.props.login({name, password})
    e.preventDefault()
  }

  handleSignUp(e) {
    const { name, password } = this.state
    this.props.signup({name, password})
    this.props.login({name, password})
    e.preventDefault()
  }

  render() {
    const { active, failure, classes } = this.props
    return (
      <div className={classes.root}>
        
        {
          active
            ? <Redirect to="/home"/>
            : null
        }

        <FormControl
          component="form" 
          onSubmit={this.handleLogin} 
          className={classes.container} 
          noValidate
          autoComplete="off"
        >
          <FormControl className={classes.formControl} noValidate autoComplete="off">
            <InputLabel htmlFor="name">Nome</InputLabel>
            <Input 
              id="name"
              name="name"
              onChange={this.handleChange} 
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          
          <FormControl className={classes.formControl} noValidate autoComplete="off">
            <InputLabel htmlFor="password">Senha</InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={this.handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <Visibility />
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
          <Button
            onClick={this.handleSignUp}
            color="secondary" 
            className={classes.button}
          >
            Signup
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
      </div>
    )
  }
}

Login.propTypes = {
  active: PropTypes.bool.isRequired,
  failure: PropTypes.string,
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired
}

export default withRoot(withStyles(styles)(Login))
