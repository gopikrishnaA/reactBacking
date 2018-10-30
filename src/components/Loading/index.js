import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import spinner from './loading-spinner.png'

const LoadingContainer = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
  align-items: center;
  justify-content: center;
  z-index: 4;
`
const Spinning = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const Spinner = styled.img`
  ${props => props.open ? `animation: 0.6s ${Spinning} linear infinite 0s;` : ''}
`

export class Pure extends Component {
  render () {
    const {
      isLoading
    } = this.props
    return (
      isLoading && <LoadingContainer>
        <Spinner open={isLoading} src={spinner} />
      </LoadingContainer>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.loading.loading
})

export default connect(mapStateToProps)(Pure)
