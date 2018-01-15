import React from 'react'

import { Avatar } from '../../styles/components/picture'
import { Container } from '../../styles/components/containers'
import { LabelInput, Label } from '../../styles/components/label'
import { CheckBox } from '../../styles/components/buttons'
import { InputChip } from '../../styles/components/chip'

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

  addHobbie (hobbie) {
    this.props.user.hobbies.push('#' + hobbie)
    return this.props.updateUser({hobbies: this.props.user.hobbies})
  }

  removeHobbie (hobbie) {
    return this.props.updateUser({hobbies: this.props.user.hobbies.filter((existingHobbie) => {
      return existingHobbie !== hobbie
    })})
  }

  changeInterest (dataToUpdate) {
    if (dataToUpdate.target) {
      const splitedValue = dataToUpdate.target.value.split(' ')

      switch (splitedValue[0]) {
        case 'Im':
          return this.props.updateUser({gender: splitedValue[1]})
        case 'interestedIn':
          return this.props.updateUser({interestedIn: splitedValue[1]})
        default:
          return
      }
    }
    return this.props.updateUser(dataToUpdate)
  }

  render () {
    const { user } = this.props

    return (
      <Container
        className='container'
      >
        <Avatar
          onDrop={this.handleProfilePicture.bind(this)}
          size={200}
          picture={user.profilePicture}
        />
        <Container>
          <Container style={{display: 'flex'}}>
            <LabelInput
              text={user.firstName}
              maxLength={16}
              onChange={this.changeInterest.bind(this)}
              paramName='firstName'
              style={{ fontSize: '25px' }}
            />
            <LabelInput
              text={user.lastName}
              maxLength={16}
              onChange={this.changeInterest.bind(this)}
              paramName='lastName'
              style={{ fontSize: '25px' }}
            />
          </Container>
          <LabelInput
            text={user.mail}
            maxLength={30}
            onChange={this.changeInterest.bind(this)}
            paramName='mail'
            style={{ fontSize: '15px' }}
          />
          <Container>
            <Label style={{ fontSize: '15px' }} >{`I'm a:`}</Label>
            <CheckBox
              label='male'
              value='Im male'
              onCheck={this.changeInterest.bind(this)}
              checked={user.gender === 'male'}
            />
            <CheckBox
              label='female'
              value='Im female'
              onCheck={this.changeInterest.bind(this)}
              checked={user.gender === 'female'}
            />
          </Container>
          <Container>
            <Label style={{ fontSize: '15px' }} >{`I'm interesting in:`}</Label>
            <CheckBox
              label='male'
              value='interestedIn male'
              onCheck={this.changeInterest.bind(this)}
              checked={user.interestedIn === 'male'}
            />
            <CheckBox
              label='female'
              value='interestedIn female'
              onCheck={this.changeInterest.bind(this)}
              checked={user.interestedIn === 'female'}
            />
            <CheckBox
              label='both'
              value='interestedIn both'
              onCheck={this.changeInterest.bind(this)}
              checked={user.interestedIn === 'both'}
            />
          </Container>
          <Container>
            <LabelInput
              text={user.bio || 'Edit your biography'}
              maxLength={150}
              onChange={this.changeInterest.bind(this)}
              paramName='bio'
              style={{ fontSize: '15px', height: '150px', width: '500px' }}
            />
          </Container>
        </Container>
        <Container>
          <Label style={{ fontSize: '25px' }}>hobbies:</Label>
          <InputChip
            value={user.hobbies}
            onRequestAdd={this.addHobbie.bind(this)}
            onRequestDelete={this.removeHobbie.bind(this)}
          />
        </Container>
      </Container>
    )
  }
}

export default Profile
