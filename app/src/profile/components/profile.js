import React from 'react'

import { Avatar } from '../../styles/components/avatar'
import { Container } from '../../styles/components/containers'
import { LabelInput } from '../../styles/components/label'

import '../../styles/css/profile.css'

class Profile extends React.Component {
  componentDidMount () {
    this.props.getUser()
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

  change (dataToUpdate) { this.props.updateUser(dataToUpdate) }

  render () {
    const { user } = this.props

    return (
      <Container
        className='profile_container'
      >
        <Avatar
          onDrop={this.handleProfilePicture.bind(this)}
          size={200}
          picture={user.profilePicture}
        />
        <Container>
          <Container>
            <LabelInput
              text={user.firstName}
              onChange={this.change.bind(this)}
              paramName='firstName'
              style={{ fontSize: '30px' }}
            />
            <LabelInput
              text={user.lastName}
              onChange={this.change.bind(this)}
              paramName='lastName'
              style={{ fontSize: '30px' }}
            />
            <LabelInput
              text={user.mail}
              onChange={this.change.bind(this)}
              paramName='mail'
              style={{ fontSize: '15px' }}
            />
          </Container>
          <Container>
            <LabelInput
              text={user.bio || 'Edit your biography'}
              onChange={this.change.bind(this)}
              paramName='bio'
              style={{ fontSize: '15px', height: '150px', width: '500px' }}
            />
          </Container>
        </Container>
      </Container>
    )
  }
}

export default Profile
