const blue = require('./cncPalette/blue.js')
const green = require('./cncPalette/green.js')
const red = require('./cncPalette/red.js')
const blueGrey = require('./cncPalette/blueGrey.js')
const grey = require('./cncPalette/grey.js')
const indigo = require('./cncPalette/indigo.js')
const teal = require('./cncPalette/teal.js')
const orange = require('./cncPalette/orange.js')
const deepPurple = require('./cncPalette/deepPurple.js')
const pink = require('./cncPalette/pink.js')

module.exports = {
  palette: {
    primary: blue,
    secondary: green,
    error: red,
    warning: orange,
    default: grey,
    blueGrey: blueGrey,
    contrastThreshold: 2,
    contrastText: '#fff',
    tonalOffset: 0.2,
    text: {
      primary: '#fff',
      secondary: blueGrey[400],
      disabled: blueGrey[200],
      hint: 'rgba(255,255,255, 0.38)',
      divider: 'rgba(255,255,255, 0.12)',
      alt1: '#fff',
      alt2: grey[200]
    },
    node: {
      indigo: indigo[500],
      purple: deepPurple[500],
      green: green[600],
      teal: teal[500],
      blue: blue[500],
      red: red[400],
      pink: pink[600],
      orange: orange[800]
    },
    background: {
      paper: blueGrey[800],
      header: blueGrey[800],
      subnav: blueGrey[800],
      sidenav: blueGrey[600],
      content: blueGrey[700],
      hover: blueGrey[800],
      active: blueGrey[400],
      bg: blueGrey[900],
      border: blueGrey[600],
      scroll: blueGrey[700],
      accent: blueGrey[500],
      default: blueGrey[900],
      inverse: 'white'
    }
  },
  typography: {
    fontFamily: 'Lato, Helvetica, Arial, sans-serif',
    fontSize: 16,
    fontWeight: 400,
    useNextVariants: true,

    h1: {
      fontSize: '6rem',
      fontWeight: 300,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1,
      letterSpacing: -1.5,
      color: '#fff'
    },
    h2: {
      fontSize: '3.75rem',
      fontWeight: 300,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1,
      letterSpacing: -0.5,
      color: '#fff'
    },
    h3: {
      fontSize: '3rem',
      fontWeight: 400,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1.04,
      letterSpacing: 0,
      color: '#fff'
    },
    h4: {
      fontSize: '2.125rem',
      fontWeight: 400,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1.17,
      letterSpacing: 0.25,
      color: '#fff'
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1.33,
      letterSpacing: 0,
      color: '#fff'
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 700,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1.6,
      letterSpacing: 0.15,
      color: '#fff'
    },

    subtitle2: {
      fontSize: '1rem',
      fontWeight: 700,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1.75,
      letterSpacing: 0.15,
      color: '#fff'
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1.57,
      letterSpacing: 0.1,
      color: '#fff'
    },

    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1.5,
      letterSpacing: 0,
      color: '#fff'
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 700,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1.5,
      letterSpacing: 0.1,
      color: '#fff'
    },

    button: {
      fontSize: '0.875rem',
      fontWeight: 700,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1.5,
      letterSpacing: 0.4,
      textTransform: 'uppercase'
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 1.66,
      letterSpacing: 0.4,
      color: '#fff'
    },
    overline: {
      fontSize: '0.875rem',
      fontWeight: 700,
      fontFamily: 'Lato, Helvetica, Arial, sans-serif',
      lineHeight: 2.66,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: '#fff'
    }
  }
}
