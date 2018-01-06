import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { UploadFileButton } from './buttons'
import { TertiaryLabel } from './label'
import { Container } from './containers'

import '../css/avatar.css'

const Avatar = muiThemeable()(({ muiTheme, picture, onDrop, ...props }) => {
  return (
    <Container
      className='circle avatar'
      style={{
        borderColor: muiTheme.palette.orange,
        backgroundColor: picture ? null : muiTheme.palette.lightGrey
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
        <TertiaryLabel>Edit</TertiaryLabel>
      </UploadFileButton>
    </Container>
  )
})

export {
  Avatar
}
