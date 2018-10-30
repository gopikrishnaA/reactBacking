import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUserCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { NavLink, withRouter } from 'react-router-dom'

const UserDiv = styled(List)`
  grid-area: User;
`
const UserButton = styled(Button)`
  text-transform: none;
  border-radius: 0;
  height: 56px;
  padding: 0;
  width: 100%;
`
const ThemedIcon = styled(FontAwesomeIcon)`
  color: ${p => p.theme.palette && p.theme.palette.text.primary};
  font-size: 18px;
`
const StyledLink = styled(NavLink)`
  text-decoration: none;
`
const ListItemWrapper = styled(ListItem)`
  width: 280px;
`
const ExpandIcon = styled(FontAwesomeIcon)`
  color: #fff;
`

const ListItemTextWrap = styled(ListItemText)`
  span {
    color: #fff;
  }
`
const StyledFormControlLabel = styled(FormControlLabel)`
margin-right: 0
`

const StyledListItemIcon = styled(ListItemIcon)`
  margin-right: 0;
  font-size: 12px;
`

const DropDownIcon = styled(FontAwesomeIcon)`
  color: ${p => p.theme.palette && p.theme.palette.text.primary};
  font-size: 12px;
`
class UserNav extends Component {
  constructor (props) {
    super(props)
    const {navigation: {userNavLinks}} = this.props
    let switchItems
    userNavLinks.map(link => {
      if (link.type === 'multiple' && link.options.length > 0) {
        link.options.map(option => {
          switchItems = {
            ...switchItems,
            [option.label]: option.value
          }
          return switchItems
        })
      }
      return switchItems      
    })
    this.state = {
      open: false,
      isExpand: false,
      isSettingsOpen: 0,
      ...switchItems
    }
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleToggle = () => {
    this.setState(state => ({
      open: !state.open,
      isSettingsOpen: 0
    }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }
    this.setState({ open: false })
  }

  handleCollapse = event => {
    event.stopPropagation()
    this.setState(state => ({ isExpand: !state.isExpand }))
  }

  renderUserButton = auth => {
    const { userAvatar, firstName, lastName } = auth
    if (userAvatar && firstName) {
      return (
        <ListItemWrapper component="div" onClick={this.handleCollapse}>
          <ListItemAvatar>
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={'data:image/jpeg;base64, ' + userAvatar}
            />
          </ListItemAvatar>
          <ListItemTextWrap>{`Hello, ${firstName}`}</ListItemTextWrap>
          <ListItemSecondaryAction>
            <ListItemIcon>
              {this.state.isExpand ? (
                <ExpandIcon icon={faChevronUp} />
              ) : (
                <ExpandIcon icon={faChevronDown} />
              )}
            </ListItemIcon>
          </ListItemSecondaryAction>
        </ListItemWrapper>
      )
    } else if (firstName) {
      return (
        <ListItemWrapper component="div" onClick={this.handleCollapse}>
          <ListItemAvatar>
            <Avatar alt={`${firstName} ${lastName}`}>
              {firstName.charAt(0)}
              {lastName && lastName.charAt(0)}
            </Avatar>
          </ListItemAvatar>
          <ListItemTextWrap>{`Hello, ${firstName}`}</ListItemTextWrap>
          <ListItemSecondaryAction>
            <ListItemIcon>
              {this.state.isExpand ? (
                <ExpandIcon icon={faChevronUp} />
              ) : (
                <ExpandIcon icon={faChevronDown} />
              )}
            </ListItemIcon>
          </ListItemSecondaryAction>
        </ListItemWrapper>
      )
    } else {
      return (
        <ListItemWrapper component="div" onClick={this.handleCollapse}>
          <ThemedIcon icon={faUserCircle} />
          <ListItemTextWrap>{`Hello, ${firstName}`}</ListItemTextWrap>
          <ListItemSecondaryAction>
            <ListItemIcon>
              {this.state.isExpand ? (
                <ExpandIcon icon={faChevronUp} />
              ) : (
                <ExpandIcon icon={faChevronDown} />
              )}
            </ListItemIcon>
          </ListItemSecondaryAction>
        </ListItemWrapper>
      )
    }
  }

  handleSettings = event => {
    event.stopPropagation()
    this.setState({
      isSettingsOpen: this.state.isSettingsOpen === 1 ? 0 : 1
    })
  }

  renderMenuList = (userNavLinks = []) => {
    const { isSettingsOpen } = this.state
    return userNavLinks.map(link => {
      return (
        <MenuItem key={link.label} onClick={this.handleClose}>
          <StyledLink to={link.to}>
            <Typography>{link.label}</Typography>
          </StyledLink>
        </MenuItem>
      )
    })
  }

  render() {
    const { open, isExpand } = this.state
    const { auth = {}, navigation = {} } = this.props

    return (
      <div>
        <UserDiv dense disablePadding component="div">
          <UserButton
            buttonRef={node => {
              this.anchorEl = node
            }}
            aria-owns={open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleCollapse}
          >
            {this.renderUserButton(auth)}
          </UserButton>
        </UserDiv>

        <Collapse in={isExpand} timeout="auto" unmountOnExit>
          <MenuList component="div" disablePadding style={{ background: 'rgba(0,0,0,.2)' }}>
            {this.renderMenuList(navigation.userNavLinks)}
          </MenuList>
        </Collapse>
      </div>
    )
  }
}

UserNav.propTypes = {
  auth: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }).isRequired,
  navigation: PropTypes.shape({
    userNavLinks: PropTypes.array
  })
}

export default withRouter(UserNav)