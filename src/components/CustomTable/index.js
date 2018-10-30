import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { formatDate } from '../../utilities/util'
const CustomTableCell = withStyles(theme => ({
  root: {
    padding: '4px 24px 4px 24px'
  },
  head: {
    backgroundColor: '#323440',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'theme.palette.background.default'
    }
  }
})

const PaperWrapper = styled(Paper)`
    margin-bottom: 100px;
`
class CustomizedTable extends React.Component {
  render () {
    const { classes, headerEntries = [], rows = [] } = this.props
    return (
      <PaperWrapper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headerEntries.map((item, index) => {
                return <CustomTableCell key={index} >{item}</CustomTableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow className={classes.row} key={index}>
                  <CustomTableCell>{row.customerName}</CustomTableCell>
                  <CustomTableCell>{row.nationalilty}</CustomTableCell>
                  <CustomTableCell>{`${row.aadhaarNumber} ${row.panNumber ? ` / ${row.panNumber}` : ''}`}</CustomTableCell>
                  <CustomTableCell>{row.emailAddresses && row.emailAddresses.map((email, i) => {
                    return <div key={i}>{email}</div>
                  })}</CustomTableCell>
                  <CustomTableCell>{row.phoneNumbers && row.phoneNumbers.map((num, i) => {
                    return <div key={i}>{num}</div>
                  })}</CustomTableCell>
                  <CustomTableCell>{row.kycStatus}</CustomTableCell>
                  <CustomTableCell>{formatDate(row.dateOfBirth)}</CustomTableCell>
                  <CustomTableCell>{row.addresses && row.addresses.map((address, i) => {
                    return <div key={i}>{address}</div>
                  })}</CustomTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </PaperWrapper>
    )
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomizedTable)
