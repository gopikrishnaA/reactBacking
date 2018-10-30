import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'


const ConnectNavContainer = styled(List)`
  grid-area: ConnectNav;
  margin-left: 4px;
  padding: 0;
  min-width: none;
  margin-top: auto;
  user-select: none;
  text-transform: none;
`
const SListItem = styled(ListItem)`
  padding: 0 0 8px 16px;
  font-size: 18px;

  @media (max-width: 960px) {
    padding: 16px;
  }
`
const SListItemText = styled(ListItemText)`
  font-size: 20px;
  padding-right: 8px;
  color: ${p => p.theme.palette.text.primary};
`
const MenuContainer = styled(Menu)`
  top: 32px !important;
`
const DropDownIcon = styled(FontAwesomeIcon)`
  color: ${p => p.theme.palette.text.primary};
  margin-top: 5px;
  font-weight: 300;
`

class ConnectNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuEl: null,
      menuOpen: false
    }
  }

  handleMenuClose = () => {
    this.setState({ menuEl: null })
  }

  handleClick = e => {
    this.setState({ menuEl: e.currentTarget })
  }

  renderMenuItems = (menuItems = []) => {
    return menuItems.map((item, index) => (
      <MenuItem onClick={this.handleMenuClose} key={`${item.label} - ${index}`}>
        {item.label}
      </MenuItem>
    ))
  }

  render() {
    const { navigation = {} } = this.props
    const { connectNavLinks = [] } = navigation
    return (
      <ConnectNavContainer disablePadding component="div">
        <SListItem button onClick={this.handleClick}>
          <SListItemText disableTypography>Connect</SListItemText>
          <ListItemIcon>
            <DropDownIcon icon={faAngleDown} />
          </ListItemIcon>
        </SListItem>
        <MenuContainer
          id="connect-menu"
          anchorEl={this.state.menuEl}
          open={!!this.state.menuEl}
          onClose={this.handleMenuClose}
        >
          {this.renderMenuItems(connectNavLinks)}
        </MenuContainer>
      </ConnectNavContainer>
    )
  }
}
ConnectNav.propTypes = {
  navigation: PropTypes.object
}

export default ConnectNav
