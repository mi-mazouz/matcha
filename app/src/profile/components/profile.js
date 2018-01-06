import React from 'react'

import { Avatar } from '../../styles/components/avatar'
import { Container } from '../../styles/components/containers'

class Profile extends React.Component {
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
      <Container>
        <Avatar
          onDrop={this.handleProfilePicture.bind(this)}
          size={200}
          picture={profilePicture}
          />
      </Container>
    )
  }
}

export default Profile
