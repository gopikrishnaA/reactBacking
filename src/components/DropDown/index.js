
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
  },
  menu: {
    width: 200
  }
})

class DropDown extends Component {
  render () {
    const {classes, label, options = []} = this.props
    return (
      <TextField
        id='drop-down-element'
        select
        label={label}
        className={classes.textField}
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu
          }
        }}
        margin='normal'
        variant='outlined'
        InputLabelProps={{
          style: {
            fontSize: 14
          } }}
        InputProps={{
          classes: {
            input: classes.resize
          }
        }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </TextField>
    )
  }
}

export default withStyles(styles)(DropDown)
