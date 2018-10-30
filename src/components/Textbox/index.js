import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  resize: {
    fontSize: 14,
    height: 10
  }
})

class Textbox extends Component {
  render () {
    const {classes, label, input, meta: { touched, error }, ...custom} = this.props
    return (
      <TextField
        id='outlined-name'
        variant='outlined'
        margin='normal'
        label={label}
        className={classes.textField}
        InputProps={{
          classes: {
            input: classes.resize
          }
        }}
        InputLabelProps={{
          style: {
            fontSize: 14
          } }}
        {...input}
        {...custom}
      />
    )
  }
}

export default withStyles(styles)(Textbox)
