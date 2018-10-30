import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import waves from './waves.svg'

const Bg = styled.div`
  grid-area: Canvas;
  /* background: ${p => p.theme.palette.background.bg}; */
  background: rgb(227, 242, 253);
  height: 100vh;
  width: 100%;

  * {
    ::-webkit-scrollbar {
      width: 16px;
      height: 18px;
    }
    ::-webkit-scrollbar-thumb {
      height: 6px;
      border: 4px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      -webkit-border-radius: 7px;
      border-radius: 7px;
      background-color: ${p => p.theme.palette.blueGrey['500']};
      -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05);
      box-shadow: inset 1px 1px 0px rgba(0, 0, 0, 0.05);
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
      display: none;
    }
    ::-webkit-scrollbar-corner {
      background-color: transparent;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
`
const BgImage = styled.div`
  position: fixed;
  padding-left: 285px;
  background-image: url(${waves});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom center;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;

  @media (max-width: 960px) {
    padding: 0;
  }
`

const Canvas = ({ children, isAuthenticated }) => {
  return (
    isAuthenticated && <Bg>
      <BgImage>{children}</BgImage>
    </Bg>
  )
}
Canvas.propTypes = {
  children: PropTypes.node
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Canvas)
