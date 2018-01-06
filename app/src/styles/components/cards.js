import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {
  Card,
  CardHeader as UiCardHeader,
  CardText as UiCardText
} from 'material-ui/Card'

import '../css/cards.css'

const CardHeader = muiThemeable()(({ muiTheme, ...props }) => (
  <UiCardHeader
    {...props}
    className='card-header'
    titleStyle={{
      ...props.titleStyle,
      color: muiTheme.palette.orange,
      fontSize: '26px'
    }}
    textStyle={{
      ...props.textStyle,
      padding: 0
    }}
  />
  )
)

const CardContainer = ({ children, ...props }) => (
  <Card
    {...props}
    containerStyle={{
      ...props.containerStyle,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'column'
    }}
    className='card-container'
  >
    {children}
  </Card>
)

const CardText = (props) => (
  <UiCardText
    {...props}
    className='card-text'
  />
)

export {
  CardContainer,
  CardHeader,
  CardText
}
