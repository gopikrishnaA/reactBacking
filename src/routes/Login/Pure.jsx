import React from 'react'
import styled from 'styled-components'
import bgImg from '../../static/images/login.jpg'
import logoImg from '../../static/images/login_box_header.gif'
import DBSLogoImg from '../../static/images/DBS_logo.png'
import LoginForm from './LoginForm'

const ImgWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  width: 100%;
  background-image: url(${bgImg});
  position: fixed;
  top: 0;
  left:0;
`
const LoginBar = styled.div`
  background-color: white;
  background-image: url(${logoImg});
  background-repeat: no-repeat;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border: none;
  border-top: 5px solid #AB0000;
  width: 320px;
  padding: 50px 30px 35px 30px;
  position: absolute;
  top: 180px;
  right: 120px;
  border-radius: 12px;
`

const DBSLogo = styled.div`
  background: url(${DBSLogoImg});
  background-repeat: no-repeat;
  position: fixed;
  top: 40px;
  left: 40px;
  width: 120px;
  height: 50px;
`

const LoginBox = styled.div`
  width: 250px;
  text-align: center;
  margin-top: 50px;
`

class Login extends React.Component {
  constructor () {
    super()
    this.submitLogin = this.submitLogin.bind(this)
  }

  submitLogin (form) {
    this.props.submitLoginForm(form)
  }

  render () {
    const {isAuthenticated} = this.props
    return (
      !isAuthenticated && <div>
        <ImgWrap />
        <DBSLogo />
        <LoginBar>
          <LoginBox>
            <LoginForm
              onSubmit={this.submitLogin}
            />
          </LoginBox>
        </LoginBar>
      </div>
    )
  }
}

export default Login
