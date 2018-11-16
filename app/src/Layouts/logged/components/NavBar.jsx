import React, { Component } from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import { logout } from '../../../tools'
import { InputSearch } from '../../../global/components/Input'
import medias from '../../../config/medias'
import Logo from '../../../global/components/Logo'
import Badge from '../../../global/components/Badge'

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
  ${medias.desktop.max`
    right: 0;
    top: unset;
    background-color: white;
    box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16) !important;
  `};
`

const StyledBadge = styled(Badge)`
  display: inline !important;
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
  margin-right: 30px !important;
  ${medias.desktop.max`
    margin: 0px !important;
  `};
  ${props => props.selected && `color: ${props.theme.palette.purple} !important;`};
`)

const MenuSubLinkRouter = styled(Link)`
  font-weight: bold;
  &:hover {
    color: black !important;
    background-color: whitesmoke !important;
  }
`

const DropDown = withTheme()(styled.div`
  &:hover {
    & > div {
      ${medias.desktop.min`
        & > span {
          color: ${props => props.theme.palette.purple} !important;
        }
      `};
      &:after {
        border-color: ${props => props.theme.palette.purple} !important;
      }
    }
  }
`)

const Menu = styled.div`
  padding: 0px !important;
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
  ${medias.desktop.max`
    &:hover {
      color: #4a4a4a !important;
      cursor: default;
    }
  `};
`)

const MenuTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  ${props =>
    props.selected &&
    `
    border-bottom: solid;
    border-bottom-width: 2px;
  `};
`

const StyledInputSearch = styled(InputSearch)`
  margin-bottom: 6px !important;
  margin-right: 30px !important;
  ${medias.desktop.max`
    margin: 0px !important;
    padding: 0.5rem 0.75rem !important;
  `};
`

class LogoutNavBar extends Component {
  state = {
    isActive: false,
    selectedItem: 'profile'
  }

  handleBurgerClick = () => this.setState({ isActive: !this.state.isActive })

  render() {
    const { t, currentUserId } = this.props
    const { selectedItem } = this.state

    return (
      <div className="navbar is-spaced">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <Logo size={180} isNavbar />
          </Link>
          <BurgerWrapper
            onClick={this.handleBurgerClick}
            className={classnames('navbar-burger', { 'is-active': this.state.isActive })}
          >
            {Array(3)
            .fill(null)
            .map((_, index) => (
              <Burger key={index} isActive={this.state.isActive} marginTop={index * 4} />
            ))}
          </BurgerWrapper>
        </div>
        <Menu className={classnames('navbar-menu', { 'is-active': this.state.isActive })}>
          <NavBarEnd className="navbar-end">
            <StyledInputSearch placeholder="Search users" className="navbar-item" />
            <MenuLinkRouter
              selected={selectedItem === 'profile'}
              className="navbar-item"
              to={`/profile/${currentUserId}`}
            >
              <MenuTitle selected={selectedItem === 'profile'}>
                {t('nav_bars.logged.profile')}
              </MenuTitle>
            </MenuLinkRouter>
            <MenuLinkRouter
              selected={selectedItem === 'messages'}
              className="navbar-item"
              to="/dashboard/messages"
            >
              <StyledBadge badgeContent={0} top={-20} right={-20}>
                <MenuTitle selected={selectedItem === 'messages'}>
                  {t('nav_bars.logged.messages')}
                </MenuTitle>
              </StyledBadge>
            </MenuLinkRouter>
            <MenuLinkRouter
              selected={selectedItem === 'match'}
              className="navbar-item"
              to="/dashboard/match"
            >
              <MenuTitle selected={selectedItem === 'match'}>{t('match')}</MenuTitle>
            </MenuLinkRouter>
            <DropDown className="navbar-item has-dropdown is-hoverable">
              <DropdownLink className="navbar-link">
                <MenuTitle>{t('nav_bars.logged.settings')}</MenuTitle>
              </DropdownLink>
              <div className="navbar-dropdown">
                <MenuSubLinkRouter className="navbar-item" to="/dashboard/account">
                  {t('nav_bars.logged.account')}
                </MenuSubLinkRouter>
                <MenuSubLink className="navbar-item" onClick={logout}>
                  {t('nav_bars.logged.logout')}
                </MenuSubLink>
              </div>
            </DropDown>
          </NavBarEnd>
        </Menu>
      </div>
    )
  }
}

LogoutNavBar.propTypes = {
  location: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  currentUserId: PropTypes.number.isRequired
}

export default translate()(LogoutNavBar)
