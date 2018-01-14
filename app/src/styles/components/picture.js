import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { UploadFileButton } from './buttons'
import { Label } from './label'
import { Container } from './containers'

import '../css/avatar.css'

const Avatar = muiThemeable()(({ muiTheme, picture, onDrop, ...props }) => (
  <Container
    className='circle avatar'
    style={{
      borderColor: muiTheme.palette.orange,
      backgroundColor: picture ? null : muiTheme.palette.lightBeige
    }}
  >
    {
      picture &&
      <img
        className='circle'
        alt=''
        src={picture}
      />
    }
    <UploadFileButton
      className='avatar__upload_file_button'
      onDrop={onDrop}
      multiple={false}
    >
      <Label style={{ fontSize: '15px' }} >Edit</Label>
    </UploadFileButton>
  </Container>
))

export {
  Avatar
}
