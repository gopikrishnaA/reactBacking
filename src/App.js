import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import PropTypes from 'prop-types'
import { ConnectedRouter as Router } from 'react-router-redux'
import { history } from './store'

import Routes from './Routes'
import Loading from './components/Loading'
import TopNav from './components/TopNav/TopNav'
import UserNav from './components/UserNav/UserNav'
import SideNav from './components/SideNav/SideNav'
import SubNav from './components/SubNav/SubNav'

import navigation from './static/navigation'
import { auth, settings } from './static/data'
import { withNamespaces } from 'react-i18next'

import CncThemeProvider from './components/CncThemeProvider/CncThemeProvider'

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');

html {
  font-family: 'Lato', helvetica, arial, sans-serif;
}
:root {
font-size: 16px;
}
`
const AppWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-template-rows: 56px 40px 1fr;
  grid-template-areas: 'TopNav TopNav' 'SubNav SubNav' 'Canvas Canvas';
  overflow: hidden;
`

class App extends Component {
  render () {
    // const { t } = this.props
    return (
      <CncThemeProvider themeName={''}>
        <Router history={history}>
          <AppWrapper>
            <Loading />
            <TopNav
              settings={settings}
              auth={auth}
              navigation={navigation}>
              <UserNav
                auth={auth}
                navigation={navigation} />
            </TopNav>
            <SubNav />
            <SideNav navigation={navigation} settings={settings} />
            <Routes />
          </AppWrapper>
        </Router>
      </CncThemeProvider>
    )
  }
}

App.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
}

export default withNamespaces('translation')(App)
