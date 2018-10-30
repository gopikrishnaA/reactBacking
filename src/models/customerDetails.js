import { createAction, createReducer } from 'redux-act'
import { put, call } from 'redux-saga/effects'

import { createSagaWatcher } from '../utilities/createSagaWatcher'
import invokeService from '../services'
import { BASE_URL } from '../config'
// Actions
export const getCustomerDetails = createAction('GET_CUSTOMER_DETAILS')
export const getCustomerDetailsSuccess = createAction('GET_CUSTOMER_DETAILS_SUCCESS')

/** --------------------------------------------------
 *
 * Sagas
 *
 */

export const sagas = {
  [getCustomerDetails]: function * ({payload}) {
    const {email, name, docName, mobile, aadhaarNumber, panNumber} = payload
    const requestData = {
      name: name || '',
      aadhaarNumber: aadhaarNumber || '',
      panNumber: panNumber || '',
      email: email || '',
      mobile: mobile || ''
    }
    const results = yield call(invokeService,
      { serviceUrl: `${BASE_URL}/remittance-transaction-dashboard/customer-details`, method: 'POST', requestData })
    yield put(getCustomerDetailsSuccess(results))
  }
}
export const customerDetailsSagaWatcher = createSagaWatcher(sagas)

/** --------------------------------------------------
*
* Reducers
*
*/
export const customerDetailsReducer = {
  [getCustomerDetailsSuccess]: (state, payload) => ({
    ...state,
    results: payload
  })
}

const InitialState = {
  results: []
}

export default createReducer(customerDetailsReducer, InitialState)
