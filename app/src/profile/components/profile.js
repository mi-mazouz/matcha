import React from 'react'

import { Avatar } from '../../styles/components/avatar'
import { Container } from '../../styles/components/containers'
import { Label } from '../../styles/components/label'

import '../../styles/css/profile.css'

class Profile extends React.Component {
  componentDidMount () {
    this.props.getProfilePicture()
  }

  handleProfilePicture (acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length !== 1) return
    const reader = new FileReader()

    reader.onload = () => {
      const fileAsBinaryString = reader.result
      const picture = `data:${acceptedFiles[0].type};base64,` + btoa(fileAsBinaryString)

      this.props.saveProfilePicture(picture)
    }
    reader.readAsBinaryString(acceptedFiles[0])
  }

  render () {
    const { profilePicture } = this.props

    return (
      <Container
        className='profile_container'
      >
        <Avatar
          onDrop={this.handleProfilePicture.bind(this)}
          size={200}
          picture={profilePicture}
        />
        <Label fontSize='30px'>MICKA</Label>
      </Container>
    )
  }
}

export default Profile
