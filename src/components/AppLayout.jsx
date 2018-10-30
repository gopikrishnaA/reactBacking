import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import { deviceType } from 'assets/css/appCSS'

// custom imports
// import Hamburger from './Hamburger/Hamburger'

const Container = styled.div`
  display: flex;
  width: 100vw;
`
// Fix for opera mini is for keyborad issue
const MainArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow:hidden;
  height: 100vh;
`
const PageWrap = styled.div`
  width: 100%;
  flex-grow:1;
  flex-basis:auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`

class AppLayout extends Component {
  render () {
    return (
      <Container>
        {/* {!this.props.noHamburger && <Hamburger /> } */}
        <MainArea>
          <PageWrap>
            {this.props.children}
          </PageWrap>
        </MainArea>
      </Container>
    )
  }
}

// s function
const s = state => ({
//   isAuthenticated: state.auth.authenticated,
//   isDashboardLoaded: state.dashboard.isDashboardLoaded,
//   noHamburger: state.common.noHamburger
})

export default withRouter(connect(s)(AppLayout))
