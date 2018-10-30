import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Canvas from './components/Canvas/Canvas'
import { Login } from './routes/Login'
import { CustomerDetails } from './routes/CustomerInfo'
import { TransactionEnquiry } from './routes/TransactionEnquiry'
import { SmartSendAudit } from './routes/SmartSendAudit'

const Routes = () => {
  return (
    <div>
      <Route exact path='/login' component={Login} />
      <AppLayout>
        <Canvas>
          <Route exact path='/remittance/customerDetails' component={CustomerDetails} />
          <Route exact path='/remittance/transactionEnquiry' component={TransactionEnquiry} />
          <Route exact path='/remittance/smartSendAudit' component={SmartSendAudit} />
        </Canvas>
        <Route path='/Logout' component={Login} />
        <Redirect to='/login' />
      </AppLayout>
    </div>
  )
}

export default Routes
