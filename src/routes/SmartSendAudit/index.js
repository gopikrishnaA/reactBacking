import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import Textbox from '../../components/Textbox'
import DropDown from '../../components/DropDown'
import CustomTable from '../../components/CustomTable'
import { SMART_SEND_OPTIONS } from '../../utilities/constant'

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
const StyledDropDown = styled(Field)`
  height: 46px;
  margin-top: 10px;
  width: 230px;
  margin-left: 10px;
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
            name='UserId'
            label={'User Id'}
            type='text'
            component={Textbox}
          />
          <StyledField
            name='cif'
            label={'CIF'}
            type='text'
            component={Textbox}
          />
          <StyledField
            name='transRefNo'
            label={'Transaction Reference No'}
            type='text'
            component={Textbox}
          />
          <StyledDropDown
            name='toDate'
            label={'Service Name'}
            type='text'
            component={DropDown}
            options={SMART_SEND_OPTIONS}
          />
          <StyledField
            name='aadhar'
            label={'Activity Date From'}
            type='text'
            component={Textbox}
          />
          <StyledField
            name='email'
            label={'Acitivity Date To'}
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

export const SmartSendAudit =
  connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'smartSendAuditForm'
  })(Pure))
