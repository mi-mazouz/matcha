import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import UiIconMenu from 'material-ui/IconMenu'
import UiMenuItem from 'material-ui/MenuItem'
import UiIconButton from 'material-ui/IconButton'

import { Container } from './containers'

import '../css/menu.css'
import '../css/icomoon/style.css'

const MenuBar = muiThemeable()(({ muiTheme, onLogoutClick, ...props }) => (
  <Container
    {...props}
    className='menu_bar'
    style={{
      backgroundColor: muiTheme.palette.lightBeige
    }}
  >
    <IconMenu
      iconButtonElement={<UiIconButton
        iconStyle={{
          color: muiTheme.palette.orange
        }}
        iconClassName='icon-setting'
      />}
    >
      <MenuItem
        onClick={onLogoutClick}
        primaryText='Logout'
      />
    </IconMenu>
  </Container>
))

const IconMenu = ({children, ...props}) => (
  <UiIconMenu {...props}>
    {children}
  </UiIconMenu>
)
const MenuItem = ({...props}) => (
  <UiMenuItem {...props} />
)

export {
  MenuBar
}
