import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

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

const Menu = styled.div`
  padding: 0px !important;
  position: relative;
`

const MenuLink = withTheme()(styled(Link)`
  &:hover {
    color: ${props => props.theme.palette.pink} !important;
    text-decoration: underline;
    background-color: transparent !important;
  }
  text-align: right;
  ${props => props.isunderline && `
    color: ${props.theme.palette.pink} !important;
    text-decoration: underline;
  `}
`)

const MenuTitle = styled.span`
  font-size: 20px;
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
      <div className="navbar has-shadow is-spaced">
        <div className="navbar-brand">
          <Link className="navbar-item" to='/'>
            <Logo size={50} />
          </Link>
          <BurgerWrapper onClick={this.handleBurgerClick} className={`navbar-burger ${this.state.isActive && 'is-active'}`}>
            {
              Array(3).fill(null).map((_, index) => (
                <Burger key={index} isActive={this.state.isActive} marginTop={index * 4} />
              ))
            }
          </BurgerWrapper>
        </div>
        <Menu className={`navbar-menu ${this.state.isActive && 'is-active'}`}>
          <div className="navbar-end">
            <MenuLink
              isunderline={location.pathname === '/dashboard/profile' ? 1 : 0}
              className="navbar-item"
              to="/dashboard/profile"
            >
              <MenuTitle>Profile</MenuTitle>
            </MenuLink>
            <MenuLink
              isunderline={location.pathname === '/dashboard/messages' ? 1 : 0}
              className="navbar-item"
              to="/dashboard/messages"
            >
              <MenuTitle>Messages</MenuTitle>
            </MenuLink>
            <MenuLink
              isunderline={location.pathname === '/dashboard/match' ? 1 : 0}
              className="navbar-item"
              to="/dashboard/match"
            >
              <MenuTitle>Match</MenuTitle>
            </MenuLink>
            <MenuLink
              isunderline={location.pathname === '/dashboard/browse' ? 1 : 0}
              className="navbar-item"
              to="/dashboard/browse"
            >
              <MenuTitle>Browse</MenuTitle>
            </MenuLink>
            <MenuLink
              isunderline={location.pathname === '/dashboard/account' ? 1 : 0}
              className="navbar-item"
              to="/dashboard/account"
            >
              <MenuTitle>Account</MenuTitle>
            </MenuLink>
          </div>
        </Menu>
      </div>
    )
  }
}

LogoutNavBar.propTypes = {
  location: PropTypes.object
}
  
export default LogoutNavBar