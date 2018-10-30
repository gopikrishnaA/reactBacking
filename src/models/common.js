import { createAction, createReducer } from 'redux-act'

import { createSagaWatcher } from '../utilities/createSagaWatcher'

// Actions
export const updateSubHeader = createAction('UPDATE_SUB_HEADER')

/** --------------------------------------------------
 *
 * Sagas
 *
 */

export const sagas = {
}
export const commonSagaWatcher = createSagaWatcher(sagas)

/** --------------------------------------------------
*
* Reducers
*
*/
export const commonReducer = {
  [updateSubHeader]: (state, payload) => ({
    ...state,
    subHeader: payload
  })
}

const commonInitialState = {
  subHeader: 'Remittance Transaction - Customer Details'
}

export default createReducer(commonReducer, commonInitialState)
