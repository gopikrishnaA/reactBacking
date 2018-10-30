import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'
import { connect } from 'react-redux'

import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import withWidth from '@material-ui/core/withWidth'
import Drawer from '@material-ui/core/Drawer'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { NavLink, withRouter } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import { updateSubHeader } from '../../models/common'

const DrawerGrid = styled(Drawer)`
  display: grid;
  grid-template-rows: 56px auto 1fr 56px;
  grid-template-columns: 1fr;
  grid-template-areas: 'Logo' 'Links' '.' 'Trigger';
  @media (max-width: 960px) {
    width: ${p => (p.open ? '240px' : '0')};
    overflow: ${p => (p.open ? 'visible' : 'hidden')};
  }
`

const drawerWidth = 270
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 3,
    overflow: 'visible',
    position: 'absolute',
    display: 'flex'
  },
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
    marginTop: '57px',
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
  letter-spacing: 0.05em;
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
  font-size: 14px;
  color: #ffffff;
  font-weight: 400;
  text-decoration: none;
  padding-left: 20px;
`

const NestedLink = styled(NavLink)`
  display: grid;
  align-items: center;
  grid-template-columns: 64px auto;
  width: 100%;
  height: 50px;
  font-size: 14px;
  color: #ffffff;
  font-weight: 400;
  text-decoration: none;
`
const StyledListItem = styled(ListItem)`
  padding: 0;
`
const NestedListItem = styled(ListItem)`
  padding: 0;
`

const StyledIcon = styled(FontAwesomeIcon)`
  color: #ffffff;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`

const StyledText = styled.div`
  color: #fff;
`

const ListItemIconWrap = styled(ListItemIcon)`
  display: block;
  margin: auto;
  font-size: 11px;
`

class SideNav extends React.Component {
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
      ...expandItems
    }
  }

  toggleNav = () => {
  }

  handleCollapse = name => event => {
    event.stopPropagation()
    this.setState({
      [name]: this.state[name] === 1 ? 0 : 1
    })
  }
  
  handleChangeItem = (label) => {
    this.props.updateSubHeader(label)
  }

  renderNestedList = (label, nestedLinks = [], classes) => {
    return nestedLinks.map(link => {
      return (
        <NestedListItem
          component="div"
          button
          key={link.label}
          onClick={() => this.handleChangeItem(`${label} - ${link.label}`)}
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
    return sideNavLinks.map((link, index) => {
      if (link.type === 'custom') {
        const CustComponent = link.component
        return (
          <StyledListItem
            button
            disableGutters
            key={index}
            onClick={this.toggleNav()}
          >}
            >
            <StyledLink to={link.to} activeClassName={classes.activeStyle}>
              <ListItemIconWrap>
                <CustComponent />
              </ListItemIconWrap>
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
                {this.renderNestedList(link.label, navigation.sideNavLinks[index].nestedLinks, classes)}
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
            onClick={this.toggleNav}>
            <StyledLink to={link.to} activeClassName={classes.activeStyle}>
              <ListItemIconWrap>
                <StyledIcon icon={link.icon} />
              </ListItemIconWrap>
              <StyledText>{link.label}</StyledText>
            </StyledLink>
          </StyledListItem>
        )
      }
    })
  }

  render() {
    const { classes, navigation = {}, isAuthenticated } = this.props
    const {
      sideNavLinks = []
    } = navigation
    return (
      <div>
        {/* Desktop Drawer */}
        {isAuthenticated && 
        <Hidden smDown>
          <div className={classes.root}>
            <DrawerGrid
              variant={'permanent'}
              classes={{
                paper: classNames(classes.drawerPaper)
              }}
              open={true}
            >
              {/* Brandbox */}

              <Hidden xsDown>
                <StyledListItem
                  component="div"
                  style={{ gridArea: 'Logo' }}
                  button
                  disableGutters
                  onClick={this.toggleNav}>
                </StyledListItem>
              </Hidden>

              <List disablePadding component="nav">
                {this.renderSideNavLinks(sideNavLinks)}
              </List>

            </DrawerGrid>
          </div>
        </Hidden>
        }
      </div>
    )
  }
}
SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
  navigation: PropTypes.object
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  updateSubHeader: (label) => dispatch(updateSubHeader(label))
})

export default withRouter(
  compose(
    withStyles(styles, { withTheme: true }),
    withWidth()
  )(connect(mapStateToProps, mapDispatchToProps)(SideNav))
)
