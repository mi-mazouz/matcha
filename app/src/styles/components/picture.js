import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { UploadFileButton } from './buttons'
import { Container } from './containers'

import '../css/picture.css'

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
      id='profilePicture'
      label='Edit'
      profile
      labelStyle={{fontSize: '15px'}}
      className='avatar__upload_file_button'
      onDrop={onDrop}
    />
  </Container>
))

export {
  Avatar
}
