import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import Textbox from '../../components/Textbox'
import CustomTable from '../../components/CustomTable'

import { getCustomerDetails } from '../../models/customerDetails'

const ButtonWrap = styled.div`
  padding: 10px;
`
const CustomButton = styled(Button)`
  background: #323440;
  color: #fff;
`

const StyledField = styled(Field)`
  width: 230px;
  margin: 10px;
`

class Pure extends React.Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.headerEntries = [
      'Customer Name',
      'Nationalilty',
      'Aadhar/PAN',
      'Email Address',
      'Mobile Number',
      'KYC Status',
      'Date Of Birth',
      'Customer Address'
    ]
  }
  onSubmit (values) {
    Object.keys(values).length > 0 && this.props.getCustomerDetails(values)
  }
  render () {
    const { handleSubmit, results } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)} noValidate autoComplete='off' >
          <StyledField
            name='transRefNo'
            label={'Transaction Reference No'}
            type='text'
            component={Textbox}
          />
          <StyledField
            name='ipeRefNo'
            label={'IPE Reference No'}
            type='text'
            component={Textbox}
          />
          <StyledField
            name='customerName'
            label={'Customer Name'}
            type='text'
            component={Textbox}
          />
          <StyledField
            name='aadhar'
            label={'Aadhar Number'}
            type='text'
            component={Textbox}
          />
          <StyledField
            name='email'
            label={'Email'}
            type='text'
            component={Textbox}
          />
          <StyledField
            name='fromDate'
            label={'Transaction date (From Date)'}
            type='text'
            component={Textbox}
          />
          <StyledField
            name='toDate'
            label={'Transaction date (To Date)'}
            type='text'
            component={Textbox}
          />
          <ButtonWrap>
            <CustomButton type='submit' variant='contained' size='medium'>
              Submit
            </CustomButton>
          </ButtonWrap>
        </form>
        {results.length > 0 && <CustomTable headerEntries={this.headerEntries} rows={results} />}
      </div>
    )
  }
}

Pure.propTypes = {
}

const mapStateToProps = state => ({
  results: state.customerDetails.results || []
})

const mapDispatchToProps = dispatch => ({
  getCustomerDetails: (payload) => dispatch(getCustomerDetails(payload))
})

export const TransactionEnquiry =
  connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'transactionEnquiryForm'
  })(Pure))
