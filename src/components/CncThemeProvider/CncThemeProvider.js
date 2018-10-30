import React from 'react'
import PropTypes from 'prop-types'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
  jssPreset
} from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { lightTheme, darkTheme } from './theme'
import { ThemeProvider } from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'

const styleNode = document.createComment('jss-insertion-point')
document.head.insertBefore(styleNode, document.head.firstChild)
const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
jss.options.insertionPoint = 'jss-insertion-point'

const CncThemeProvider = ({ children, themeName }) => {
  const theme = createMuiTheme(themeName === 'dark' ? darkTheme : lightTheme)
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <ThemeProvider theme={themeName === 'dark' ? darkTheme : lightTheme}>
            {children}
          </ThemeProvider>
        </CssBaseline>
      </MuiThemeProvider>
    </JssProvider>
  )
}

CncThemeProvider.propTypes = {
  children: PropTypes.any,
  themeName: PropTypes.string
}
// ships with light theme for default
CncThemeProvider.defaultProps = {
  theme: lightTheme
}
export default CncThemeProvider
