import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import loading from '../models/loading'
import common from '../models/common'
import auth from '../models/auth'
import customerDetails from '../models/customerDetails'

const appReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  loading,
  common,
  auth,
  customerDetails
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
