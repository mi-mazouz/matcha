import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'

import medias from '../../config/medias'

const NavBar = styled.nav`
  background-color: transparent !important;
`

const BurgerWrapper = styled.div`
  &:hover {
    background-color: transparent !important;
  }
  width: 5.25rem !important;
`

const Burger = styled.span`
  color: #ffffff;
  height: 3px !important;
  width: 30px !important;
  ${props => !props.isActive && `margin-top: ${props.marginTop}px`};
`

const Menu = styled.div`
  ${medias.desktop`
    background-color: transparent !important;
    box-shadow: none !important;
  `};
  padding: 0px !important;
  position: relative;
`

const MenuEnd = styled.div`
  height: 51px;
  position: absolute;
  right: 0px;
`

const MenuLink = styled(Link)`
  &:hover {
    & > span {
      border-bottom: solid;
      border-bottom-width: 2px;
    }
    background-color: transparent !important;
    color: #ffffff !important;
  }
  text-align: left;
`

const MenuTitle = styled.span`
  font-size: 22px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: #ffffff;
`

class LogoutNavBar extends Component {
  state = {
    isActive: false
  }

  handleBurgerClick = () => this.setState({ isActive: !this.state.isActive })

  render() {
    const { t } = this.props

    return (
      <NavBar className="navbar">
        <div className="navbar-brand">
          <BurgerWrapper
            onClick={this.handleBurgerClick}
            className={`navbar-burger ${this.state.isActive && 'is-active'}`}
          >
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <Burger key={index} isActive={this.state.isActive} marginTop={index * 4} />
              ))}
          </BurgerWrapper>
        </div>
        <Menu className={`navbar-menu ${this.state.isActive && 'is-active'}`}>
          <MenuEnd className="navbar-end">
            <MenuLink className="navbar-item" to="/sign-in">
              <MenuTitle>{t('nav_bars.logout.sign_in')}</MenuTitle>
            </MenuLink>
            <MenuLink className="navbar-item" to="/sign-up">
              <MenuTitle>{t('nav_bars.logout.sign_up')}</MenuTitle>
            </MenuLink>
          </MenuEnd>
        </Menu>
      </NavBar>
    )
  }
}

LogoutNavBar.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(LogoutNavBar)
