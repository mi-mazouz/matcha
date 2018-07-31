import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import { logout } from '../../utils'
import Logo from '../../common/components/Logo'

const NavBar = styled.div`
  padding-bottom: 0px !important;
`

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
  right: 0;
`

const MenuLink = withTheme()(styled(Link)`
  text-align: left;
  margin-right: 80px;
  &:hover {
    color: ${props => props.theme.palette.pink} !important;
    background-color: transparent !important;
  }
  ${props => props.isselected && `color: ${props.theme.palette.pink} !important;`}
`)

const DropdownLink = withTheme()(styled.div`
  &:hover {
    color: ${props => props.theme.palette.pink} !important;
    background-color: transparent !important;
  }
  &:after {
    border-color: black !important;
  }
  text-align: left;
  background-color: transparent !important;
`)

const Dropdown = styled.div`
  width: 100px;
  min-width: 95% !important;
  box-shadow: none !important;
  & > a {
    padding-right: 10px !important;
    text-align: right;
  }
  & > a > span {
    border: none;
  }
`

const MenuTitle = styled.span`
  border-bottom: solid;
  border-radius: 0px !important;
  border-bottom-width: 1px;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
`

class LogoutNavBar extends Component {
  state = {
    isActive: false
  }

  handleBurgerClick = () => this.setState({isActive: !this.state.isActive})

  render() {
    const { location } = this.props

    return (
      <NavBar className="navbar is-spaced">
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
            <MenuLink
              isselected={location.pathname === '/dashboard/profile' ? 1 : 0}
              className="navbar-item"
              to="/dashboard/profile"
            >
              <MenuTitle>Profile</MenuTitle>
            </MenuLink>
            <MenuLink
              isselected={location.pathname === '/dashboard/messages' ? 1 : 0}
              className="navbar-item"
              to="/dashboard/messages"
            >
              <MenuTitle>Messages</MenuTitle>
            </MenuLink>
            <div className="navbar-item has-dropdown is-hoverable">
              <DropdownLink className="navbar-link">
                <MenuTitle>Account</MenuTitle>
              </DropdownLink>
              <Dropdown className="navbar-dropdown">
                <MenuLink
                  onClick={logout}
                  isselected={location.pathname === '/dashboard/messages' ? 1 : 0}
                  className="navbar-item"
                  to="/dashboard/messages"
                >
                  <MenuTitle>Logout</MenuTitle>
                </MenuLink>
              </Dropdown>
            </div>    
          </NavBarEnd>
        </div>
      </NavBar>
    )
  }
}

LogoutNavBar.propTypes = {
  location: PropTypes.object.isRequired
}
  
export default LogoutNavBar