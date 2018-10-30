import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  grid-area: Toolbar;
  height: 56px;
  @media (max-width: 960px) {
    border-left: none;
    padding: 0 12px;
    display: none;
  }
`

const ToolbarItem = styled(Button)`
  margin-left: auto;
  border-left: 1px solid ${p => p.theme.palette.background.border};
  border-radius: 0;
  text-transform: none;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

class Toolbar extends React.Component {
  renderToolbarItems = (toolbarItems = []) => {
    return toolbarItems.map((item, index) => <ToolbarItem key={index}>{item}</ToolbarItem>)
  }

  render() {
    const { children } = this.props
    return <ToolbarContainer>{this.renderToolbarItems(children)}</ToolbarContainer>
  }
}

Toolbar.propTypes = {
  children: PropTypes.array
}

export default Toolbar
