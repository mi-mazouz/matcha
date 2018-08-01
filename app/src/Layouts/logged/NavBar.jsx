import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import { logout } from '../../utils'
import Logo from '../../common/components/Logo'

const BurgerWrapper = styled.div`
  &:hover {
    background-color: transparent !important;
  }
  width: 5.25rem !important;
`

const Burger = styled.span`
  height: 3px !important;
  width: 30px !important;
  ${props => !props.isActive && `margin-top: ${props.marginTop}px`};
`

const NavBarEnd = styled.div`
  position: absolute;
  right: 32px;
  top: 27px;
`

const MenuLinkRouter = withTheme()(styled(Link)`
  &:hover {
    & > span {
      border-bottom: solid;
      border-bottom-width: 2px;
    }
    color: ${props => props.theme.palette.purple} !important;
    background-color: transparent !important;
  }
  margin-right: 60px;
  ${props => props.isselected && `color: ${props.theme.palette.purple} !important;`}
`)

const MenuSubLinkRouter = styled(Link)`
  font-weight: bold;
  &:hover {
    color: black !important;
    background-color: whitesmoke !important;
  }
`

const MenuSubLink = styled.a`
  font-weight: bold;
  &:hover {
    color: black !important;
    background-color: whitesmoke !important;
  }
`

const DropdownLink = withTheme()(styled.div`
  &:after {
    border-color: black !important;
  }
  &:hover {
    &:after {
      border-color: ${props => props.theme.palette.purple} !important;
    }
    color: ${props => props.theme.palette.purple} !important;
    background-color: transparent !important;
  }
  background-color: transparent !important;
`)

const MenuTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  ${props => props.isselected && `
    border-bottom: solid;
    border-bottom-width: 2px;
  `}
`

class LogoutNavBar extends Component {
  state = {
    isActive: false
  }

  handleBurgerClick = () => this.setState({isActive: !this.state.isActive})

  render() {
    const { location } = this.props

    return (
      <div className="navbar is-spaced">
        <div className="navbar-brand">
          <Link className="navbar-item" to='/'>
            <Logo size={180} isNavbar />
          </Link>
          <BurgerWrapper onClick={this.handleBurgerClick} className={`navbar-burger ${this.state.isActive && 'is-active'}`}>
            {
              Array(3).fill(null).map((_, index) => (
                <Burger key={index} isActive={this.state.isActive} marginTop={index * 4} />
              ))
            }
          </BurgerWrapper>
        </div>
        <div className={`navbar-menu ${this.state.isActive && 'is-active'}`}>
          <NavBarEnd className="navbar-end">
            <MenuLinkRouter
              isselected={location.pathname === '/dashboard/profile' ? 1 : 0}
              className="navbar-item"
              to="/dashboard/profile"
            >
              <MenuTitle
                isselected={location.pathname === '/dashboard/profile' ? 1 : 0}
              >
                Profile
              </MenuTitle>
            </MenuLinkRouter>
            <MenuLinkRouter
              isselected={location.pathname === '/dashboard/messages' ? 1 : 0}
              className="navbar-item"
              to="/dashboard/messages"
            >
              <MenuTitle
                isselected={location.pathname === '/dashboard/messages' ? 1 : 0}
              >
                Messages
              </MenuTitle>
            </MenuLinkRouter>
            <MenuLinkRouter
              isselected={location.pathname === '/dashboard/match' ? 1 : 0}
              className="navbar-item"
              to="/dashboard/match"
            >
              <MenuTitle
                isselected={location.pathname === '/dashboard/match' ? 1 : 0}
              >
                Match
              </MenuTitle>
            </MenuLinkRouter>
            <MenuLinkRouter
              isselected={location.pathname === '/dashboard/browse' ? 1 : 0}
              className="navbar-item"
              to="/dashboard/browse"
            >
              <MenuTitle
                isselected={location.pathname === '/dashboard/Browse' ? 1 : 0}
              >
                Browse
              </MenuTitle>
            </MenuLinkRouter>
            <div className="navbar-item has-dropdown is-hoverable">
              <DropdownLink className="navbar-link">
                <MenuTitle>Settings</MenuTitle>
              </DropdownLink>
              <div className="navbar-dropdown">
                <MenuSubLinkRouter
                  className="navbar-item"
                  to="/dashboard/account"
                >
                  Account
                </MenuSubLinkRouter>
                <MenuSubLink className="navbar-item" onClick={logout}>
                  Logout
                </MenuSubLink>
              </div>
            </div>    
          </NavBarEnd>
        </div>
      </div>
    )
  }
}

LogoutNavBar.propTypes = {
  location: PropTypes.object.isRequired
}
  
export default LogoutNavBar