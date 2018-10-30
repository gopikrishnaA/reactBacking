import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

// custom imports
import Textbox from '../../components/Textbox'
import Password from '../../components/Password'
const maxLength = 20

const ButtonWrapper = styled(Button)`
  height: 50px;
  margin: 8px;
  color: #fff;
  background-color: #AB0000;
  width: 100%;
`
class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  loginSubmit ({username, password}) {
    const { onSubmit } = this.props
    onSubmit({username, password})
  }

  render () {
    const { handleSubmit } = this.props
    // for testing
    return (
      <form autoComplete='off' onSubmit={handleSubmit(this.loginSubmit)}>
        <Field
          name='username'
          type='text'
          maxLength={maxLength}
          component={Textbox}
          label={'Username'}
          autoComplete='off'
          style={{width: '100%'}}
        />
        <Field
          id='password'
          name='password'
          type='text'
          maxLength={maxLength}
          autoComplete='off'
          component={Password}
          label={'Password'}
        />
        <ButtonWrapper
          style={{ backgroundColor: '#AB0000' }}
          type='submit'>
          {'login'}
        </ButtonWrapper>
      </form>
    )
  }
}
LoginForm.propTypes = {
  name: PropTypes.string,
  validations: PropTypes.object,
  i18text: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'loginForm' // a unique identifier for this form
})(LoginForm)
