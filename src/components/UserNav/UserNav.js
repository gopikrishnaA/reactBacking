import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import Hidden from '@material-ui/core/Hidden'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popper from '@material-ui/core/Popper'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUserCircle , faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import { NavLink, withRouter } from 'react-router-dom'

const StyledPaper = styled(Paper)`
  margin-left: 16px;
  margin-top: -8px;
  width: 110px
`
const UserDiv = styled(List)`
  grid-area: User;
  border-left: 1px solid ${p => p.theme.palette.background.border};
`
const UserButton = styled(Button)`
  text-transform: none;
  border-radius: 0;
  height: 56px;
  padding: 0;
`
const ThemedIcon = styled(FontAwesomeIcon)`
  color: ${p => p.theme.palette && p.theme.palette.text.primary};
  font-size: 18px;
`
const StyledLink = styled(NavLink)`
  text-decoration: none;
`
const StyledListItemText = styled(ListItemText)`
  padding: 0 8px;
  span {
    color: #fff
  }
`
const StyledListItemIcon = styled(ListItemIcon)`
  margin-right: 0;
  font-size: 12px;
`

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-right: 0
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

  handleSettings = event => {
    event.stopPropagation()
    this.setState({
      isSettingsOpen: this.state.isSettingsOpen === 1 ? 0 : 1
    })
  }

  renderUserButton = auth => {
    const { userAvatar, firstName, lastName } = auth
    if (userAvatar && firstName) {
      return (
        <ListItem component='div'>
          <ListItemAvatar>
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={'data:image/jpeg;base64, ' + userAvatar}
            />
          </ListItemAvatar>
          <StyledListItemText>{`Hello, ${firstName}`}</StyledListItemText>
        </ListItem>
      )
    } else if (firstName) {
      return (
        <ListItem component='div'>
          <ListItemAvatar>
            <Avatar alt={`${firstName} ${lastName}`}>
              {firstName.charAt(0)}
              {lastName && lastName.charAt(0)}
            </Avatar>
          </ListItemAvatar>
          <StyledListItemText>{`Hello, ${firstName}`}</StyledListItemText>
        </ListItem>
      )
    } else {
      return (
        <ListItem component='div'>
          <ThemedIcon icon={faUserCircle} />
          <StyledListItemText>
            {firstName ? `Hello, ${firstName}` : 'Not Logged In'}
          </StyledListItemText>
        </ListItem>
      )
    }
  }

  renderMenuList = (userNavLinks = []) => {
    return userNavLinks.map(link => {
      return (
        <MenuItem key={link.label} onClick={() => link.onClickListner()}>
            <StyledLink to={link.to}>
              <Typography>{link.label}</Typography>
            </StyledLink>
          </MenuItem>
      )
    })
  }

  render() {
    const { open } = this.state
    const { auth = {}, navigation = {} } = this.props

    return (
      <UserDiv dense disablePadding component='div'>
        <Hidden smDown>
          <UserButton
            buttonRef={node => {
              this.anchorEl = node
            }}
            aria-owns={open ? 'menu-list-grow' : null}
            aria-haspopup='true'
            onClick={this.handleToggle}
          >
            {this.renderUserButton(auth)}
          </UserButton>

          <Popper open={open} anchorEl={this.anchorEl} transition style={{ zIndex: 1 }}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id='menu-list-grow'
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <StyledPaper elevation={3}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>{this.renderMenuList(navigation.userNavLinks)}</MenuList>
                  </ClickAwayListener>
                </StyledPaper>
              </Grow>
            )}
          </Popper>
        </Hidden>
      </UserDiv>
    )
  }
}

UserNav.propTypes = {
  auth: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }),
  navigation: PropTypes.shape({
    userNavLinks: PropTypes.array
  })
}

export default withRouter(compose(withWidth())(UserNav))
