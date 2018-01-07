import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { Container } from './containers'

import '../css/menu.css'
import '../css/icomoon/style.css'

const MenuBar = muiThemeable()(({ muiTheme, ...props }) => (
    <Container
      {...props}
      className='menu_bar'
      style={{
        backgroundColor: muiTheme.palette.grey
      }}
    >
      <span
        style={{
          color: muiTheme.palette.orange
        }}
        className='icon-setting'
      />
    </Container>
  )
)

export {
  MenuBar
}
