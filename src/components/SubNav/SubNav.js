import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const SubNavContainer = styled.div`
  grid-area: SubNav;
  display: grid;
  align-items: center;
  height: 40px;
  width: 100%;
  z-index: 1;
  color: #fff;
  background: #323440;
  padding-left: 285px;
  border-top: 1px solid ${p => p.theme.palette.background.border};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  @media (max-width: 960px) {
    padding-left: 24px;
  }
`

const SubNav = ({subHeader, isAuthenticated}) => {
  return isAuthenticated && <SubNavContainer>{subHeader}</SubNavContainer>
}
SubNav.propTypes = {
  subHeader: PropTypes.string
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  subHeader: state.common.subHeader
})

export default connect(mapStateToProps)(SubNav)
