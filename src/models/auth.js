import { createAction, createReducer } from 'redux-act'
import { put, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { createSagaWatcher } from '../utilities/createSagaWatcher'
import invokeService from '../services'
import { BASE_URL } from '../config'
// Actions
export const doLogin = createAction('DO_LOGIN')
export const doLogout = createAction('DO_LOGOUT')
export const loginSuccess = createAction('LOGIN_SUCCESS')

/** --------------------------------------------------
 *
 * Sagas
 *
 */

export const sagas = {
  [doLogin]: function * ({payload}) {
    const {username, password} = payload
    const requestData = {
      username,
      password
    }
    // const results = yield call(invokeService,
    //   { serviceUrl: `${BASE_URL}/remittance-transaction-dashboard/customer-details`, method: 'POST', requestData })
    yield put(loginSuccess())
  },
  [loginSuccess]: function * ({payload}) {
    yield put(push('/remittance/customerDetails'))
  },
  [doLogout]: function * ({payload}) {
    yield put(push('/login'))
  }
}
export const authSagaWatcher = createSagaWatcher(sagas)

/** --------------------------------------------------
*
* Reducers
*
*/
export const loginReducer = {
  [loginSuccess]: (state, payload) => ({
    ...state,
    isAuthenticated: true
  }),
  [doLogout]: (state, payload) => ({
    ...state,
    isAuthenticated: false
  })
}

const InitialState = {
  isAuthenticated: false
}

export default createReducer(loginReducer, InitialState)
