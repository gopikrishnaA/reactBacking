import React, { Component } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    width: '100%',
    flexBasis: 200
  },
  resize: {
    fontSize: 14,
    height: 10
  }
})

const StyledIconButton = styled(IconButton)`
  padding: 0;
`
class Textbox extends Component {
  state = {
    showPassword: false
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }
  render () {
    const {classes, label, input, meta: { touched, error }, ...custom} = this.props
    return (
      <TextField
        id='outlined-adornment-password'
        className={classNames(classes.margin, classes.textField)}
        variant='outlined'
        type={this.state.showPassword ? 'text' : 'password'}
        label='Password'
        {...input}
        InputProps={{
          classes: {
            input: classes.resize
          },
          endAdornment: (
            <InputAdornment position='end'>
              <StyledIconButton
                aria-label='Toggle password visibility'
                onClick={this.handleClickShowPassword}
              >
                {this.state.showPassword ? <VisibilityOff style={{fontSize: '20px'}}/> : <Visibility style={{fontSize: '20px'}}/>}
              </StyledIconButton>
            </InputAdornment>
          )
        }}
        InputLabelProps={{
          style: {
            fontSize: 14
          } }}
      />
    )
  }
}

export default withStyles(styles)(Textbox)
