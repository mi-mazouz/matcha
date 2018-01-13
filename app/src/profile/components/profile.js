import React from 'react'

import { Avatar } from '../../styles/components/picture'
import { Container } from '../../styles/components/containers'
import { LabelInput } from '../../styles/components/label'
import { CheckBox } from '../../styles/components/buttons'

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

  change (dataToUpdate) {
    if (dataToUpdate.target) return this.props.updateUser({gender: dataToUpdate.target.value})
    return this.props.updateUser(dataToUpdate)
  }

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
              maxLength={16}
              onChange={this.change.bind(this)}
              paramName='firstName'
              style={{ fontSize: '30px' }}
            />
            <LabelInput
              text={user.lastName}
              maxLength={16}
              onChange={this.change.bind(this)}
              paramName='lastName'
              style={{ fontSize: '30px' }}
            />
            <LabelInput
              text={user.mail}
              maxLength={30}
              onChange={this.change.bind(this)}
              paramName='mail'
              style={{ fontSize: '15px' }}
            />
            <CheckBox
              label='male'
              value='male'
              onCheck={this.change.bind(this)}
              checked={user.gender === 'male'}
            />
            <CheckBox
              label='female'
              value='female'
              onCheck={this.change.bind(this)}
              checked={user.gender === 'female'}
            />
          </Container>
          <Container>
            <LabelInput
              text={user.bio || 'Edit your biography'}
              maxLength={150}
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
