import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import Hidden from '@material-ui/core/Hidden'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import ListItemText from '@material-ui/core/ListItemText'
import { faBars, faTimes , faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import Collapse from '@material-ui/core/Collapse'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import MobileUserNav from '../MobileUserNav/MobileUserNav'

// const Wrap = styled.div`
//   display: ${p => p.isAuthenticated ? 'grid' : 'none'}
// `

const Grid = styled.div`
  display: grid;
  grid-area: TopNav;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  position: fixed;
  height: 56px;
  width: 100%;
  border-radius: 0;
  align-items: center;
  grid-template-columns: 64px auto 1fr auto auto;
  grid-template-areas: 'Logo ConnectNav . Toolbar User';
  background-color: #323440;
  @media (max-width: 960px) {
    grid-template-columns: 64px auto 1fr;
    grid-template-areas: 'Menu ConnectNav .';
  }
`
const SwipeableGrid = styled(SwipeableDrawer)`
  display: grid;
  grid-template-rows: 56px auto;
  grid-template-columns: 1fr;
  grid-template-areas: 'MobileUserNav' 'Links';
  @media (max-width: 960px) {
    width: ${p => (p.open ? '240px' : '0')};
    overflow: ${p => (p.open ? 'visible' : 'hidden')};
  }
`
const drawerWidth = 270
const iOS = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent)
const styles = theme => ({
  activeStyle: {
    background: 'rgba(0,0,0,.24)',
    boxShadow: 'inset 5px 0 0 -1px #2196F3',
    transition: 'background .3s ease-in-out'
  },
  nestedStyle: {
    background: 'rgba(0,0,0,.24)',
    transition: 'background .3s ease-in-out'
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    background: theme.palette.background.sidenav,
    boxShadow: '4px 0 8px rgba(0,0,0,.24)',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflow: 'hidden'
  },
  drawerPaperClose: {
    boxShadow: theme.shadows[0],
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: theme.spacing.unit * 8
    },
    overflow: 'hidden'
  }
})

const StyledLink = styled(NavLink)`
  display: grid;
  align-items: center;
  grid-template-columns: 64px auto;
  width: 100%;
  height: 50px;
  font-size: 12px;
  color: #ffffff;
  font-weight: 400;
  text-decoration: none;
`
const NestedLabel = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 64px auto;
  width: 100%;
  height: 50px;
  font-size: 12px;
  color: #ffffff;
  font-weight: 400;
  text-decoration: none;
`
const NestedListItem = styled(ListItem)`
  padding: 0;
`
const StyledListItem = styled(ListItem)`
  padding: 0 10px;
`
const StyledListItemIcon = styled(ListItemIcon)`
  margin: auto;
`
const LogoButton = styled(ListItem)`
  padding: 0;
  grid-area: Logo;
  display: grid;
  align-items: center;
  width: 64px;
`
const StyledText = styled.div`
  color: #fff;
`
const StyledIcon = styled(FontAwesomeIcon)`
  color: #ffffff;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`
const Logo = styled.img`
  display: block;
  width: auto;
  margin-left: 20px;
`
const IconSize = styled(FontAwesomeIcon)`
  font-size: 1.5em;
`
const CloseIcon = styled.div`
  @media (max-width: 959px) {
    height: 50px;
    width: 100%;
    cursor: pointer;
    align-items: center;
    position: absolute;
    z-index: 100;
    color: ${p => p.theme.palette.text.primary};
    left: 280px;
    transition: display 200ms ease-in-out;
    display: ${p => (p.sidenavisopen ? 'grid' : 'none')};
  }
`
const MenuIcon = styled(Button)`
  display: grid;
  height: 56px;
  width: 64px;
  border-radius: 0;
  border-right: 1px solid ${p => p.theme.palette.background.border};
  cursor: pointer;
  color: ${p => p.theme.palette.text.primary};
  @media (min-width: 960px) {
    display: none;
  }
`
const SListItemText = styled(ListItemText)`
  font-size: 24px;
  color: #fff;
  margin-left: 10px;
  @media (min-width: 960px) {
    margin-left: 100px;
  }
`
const ListItemIconWrap = styled(ListItemIcon)`
  display: block;
  margin: auto;
  font-size: 11px;
`

class TopNav extends Component {
  constructor (props) {
    super(props)
    const {navigation: {sideNavLinks}} = this.props
    let expandItems
    sideNavLinks.map(link => {
      if (link.type === 'nested' && link.nestedLinks.length > 0) {
        expandItems = {
          ...expandItems,
          [link.id]: 1
        }
      }
    return expandItems
    })
    this.state = {
      ...expandItems,
      sidenavisopen: false
    }
  }
  toggleNav = () => {
    this.setState({
      sidenavisopen: !this.state.sidenavisopen
    })
  }
  handleClickAway = () => {
    this.setState({
      sidenavisopen: false
    })
  }
  handleMenu = event => {
    event.stopPropagation()
    this.setState({
      sidenavisopen: this.state.sidenavisopen === true ? false : true
    })
  }

  handleCollapse = name => event => {
    event.stopPropagation()
    this.setState({
      [name]: this.state[name] === 1 ? 0 : 1
    })
  }

  renderAppLogoLink = (appLogoLink = {}) => {
    const { to, appLogo } = appLogoLink

    return (
      <StyledLink to={to} style={{ height: 56 }}>
        <ListItemIcon>
          <Logo src={appLogo} />
        </ListItemIcon>
      </StyledLink>
    )
  }

  renderNestedList = (nestedLinks = [], classes) => {
    return nestedLinks.map(link => {
      return (
        <NestedListItem
          component="div"
          button
          key={link.label}
        >
        <StyledLink to={link.to} activeClassName={classes.activeStyle}>
            <ListItemIconWrap>
              <StyledIcon icon={link.icon} />
            </ListItemIconWrap>
            {link.label}
          </StyledLink>
        </NestedListItem>
      )
    })
  }

  renderSideNavLinks = (sideNavLinks = []) => {
    const { classes, navigation } = this.props
    const { sidenavisopen } = this.state
    return sideNavLinks.map((link, index) => {
      if (link.type === 'custom') {
        const CustComponent = link.component
        return (
          <StyledListItem
            button
            disableGutters
            key={index}
            onClick={
              sidenavisopen
                ? () => {
                    this.toggleNav()
                  }
                : e => {
                    e.stopPropagation()
                  }
            }
          >
            <StyledLink to={link.to} activeClassName={classes.activeStyle}>
              <StyledListItemIcon>
                <CustComponent />
              </StyledListItemIcon>
              <StyledText>{link.label}</StyledText>
            </StyledLink>
          </StyledListItem>
        )
      } else if (link.type === 'nested') {
        return (
          <div key={index}>
            <StyledListItem
              button
              disableGutters
              onClick={this.handleCollapse(link.id)}
            >
              <NestedLabel >
                <StyledText>{link.label}</StyledText>
                <ListItemSecondaryAction>
                  <ListItemIcon>
                    {this.state[link.id] ? (
                      <FontAwesomeIcon style={{ color: 'white' }} icon={faChevronUp} />
                    ) : (
                      <FontAwesomeIcon style={{ color: 'white' }} icon={faChevronDown} />
                    )}
                  </ListItemIcon>
                </ListItemSecondaryAction>
              </NestedLabel>
            </StyledListItem>

            <Collapse in={this.state[link.id] === 1} timeout="auto" unmountOnExit>
              <List component="div" className={classes.nestedStyle}>
                {this.renderNestedList(navigation.sideNavLinks[index].nestedLinks, classes)}
              </List>
            </Collapse>
          </div>
        )
      } else {
        return (
          <StyledListItem
            button
            disableGutters
            key={index}
            onClick={
              sidenavisopen
                ? () => {
                    this.toggleNav()
                  }
                : e => {
                    e.stopPropagation()
                  }
            }
          >
            <StyledLink to={link.to} activeClassName={classes.activeStyle}>
              <StyledListItemIcon>
                <StyledIcon icon={link.icon} />
              </StyledListItemIcon>
              <StyledText>{link.label}</StyledText>
            </StyledLink>
          </StyledListItem>
        )
      }
    })
  }

  render() {
    const { classes, auth, navigation = {}, isAuthenticated } = this.props
    const { sidenavisopen } = this.state
    const {
      sideNavLinks = [],
      appLogoLink = { to: '/', label: 'Connect', appLogo: '' }
    } = navigation
    return (
      isAuthenticated && <div>
        {/* Mobile Menu */}

        <Hidden mdUp>
          <SwipeableGrid
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            anchor="left"
            onClick={this.toggleNav}
            variant={isAuthenticated ? "temporary" : 'permanent'}
            classes={{
              paper: classNames(classes.drawerPaper, !sidenavisopen && classes.drawerPaperClose)
            }}
            open={sidenavisopen}
            onClose={() => {}}
            onOpen={() => {}}
          >
            {/* Mobile MobileUserNav */}

            <MobileUserNav auth={auth} navigation={navigation} />
            <Divider />

            {/* Mobile Links */}

            <List disablePadding component="nav">
              {this.renderSideNavLinks(sideNavLinks)}
            </List>
            <Divider />
          </SwipeableGrid>

          {/* Close Mobile Drawer */}

          <CloseIcon onClick={this.handleClickAway} sidenavisopen={sidenavisopen}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseIcon>
        </Hidden>

        {/* TopNav Bar */}

        <Grid>
          <Hidden smDown>
            <LogoButton
              component="div"
              button
              disableGutters
              onClick={
                sidenavisopen
                  ? () => {
                      this.toggleNav()
                    }
                  : e => {
                      e.stopPropagation()
                    }
              }
            >
              {this.renderAppLogoLink(appLogoLink)}
            </LogoButton>
          </Hidden>
          <SListItemText disableTypography>Digi India Dashbaord</SListItemText>
          <MenuIcon style={{ gridArea: 'Menu' }} onClick={this.toggleNav}>
            <IconSize icon={faBars} />
          </MenuIcon>
          {this.props.children}
        </Grid>
      </div>
    )
  }
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object,
  auth: PropTypes.object,
  navigation: PropTypes.object
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default withRouter(
     compose(
       withStyles(styles, { withTheme: true }),
       withWidth()
     )(connect(mapStateToProps)(TopNav))
  )