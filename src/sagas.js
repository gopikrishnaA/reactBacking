
import { loadingSagaWatcher } from './models/loading'
import { commonSagaWatcher } from './models/common'
import { authSagaWatcher } from './models/auth'
import { customerDetailsSagaWatcher } from './models/customerDetails'

function * rootSaga () {
  yield [
    ...loadingSagaWatcher,
    ...commonSagaWatcher,
    ...authSagaWatcher,
    ...customerDetailsSagaWatcher
  ]
}

export default rootSaga
