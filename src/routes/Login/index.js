import { connect } from 'react-redux'
import Pure from './Pure'
import {doLogin} from '../../models/auth'

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  submitLoginForm: (payload) => dispatch(doLogin(payload))
})

export const Login = connect(mapStateToProps, mapDispatchToProps)(Pure)
