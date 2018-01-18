import React from 'react'
import PromiseFileReader from 'promise-file-reader'

import { Avatar } from '../../styles/components/picture'
import { Container } from '../../styles/components/containers'
import { LabelInput, Label } from '../../styles/components/label'
import { CheckBox, UploadFileButton } from '../../styles/components/buttons'
import { InputChip } from '../../styles/components/chip'

import '../../styles/css/profile.css'

class Profile extends React.Component {
  componentDidMount () {
    this.props.getUserInfos()
    // this.props.postLocation()
  }

  handlePictures (files, profile) {
    if (profile) {
      return PromiseFileReader.readAsDataURL(files[0])
      .then((profilePicture) => this.props.saveProfilePicture(profilePicture))
    }

    if (files.length > 4) return
    Promise.all(Array.prototype.map.call(files, (file) => {
      return PromiseFileReader.readAsDataURL(file)
    }))
    .then((pictures) => this.props.savePictures(pictures))
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
        case 'location':
          return this.props.updateUser({isLocated: splitedValue[1] === 'yes'})
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
        <Container className='header'>
          <Avatar
            onDrop={this.handlePictures.bind(this)}
            size={200}
            picture={user.profilePicture ? user.profilePicture.data : null}
          />
          <Container>
            <Container style={{display: 'flex'}}>
              <LabelInput
                text={user.firstname}
                maxLength={16}
                onChange={this.changeInterest.bind(this)}
                paramName='firstName'
                style={{ fontSize: '25px' }}
              />
              <LabelInput
                text={user.lastname}
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
                value='Im Male'
                onCheck={this.changeInterest.bind(this)}
                checked={user.gender === 'Male'}
              />
              <CheckBox
                label='female'
                value='Im Female'
                onCheck={this.changeInterest.bind(this)}
                checked={user.gender === 'Female'}
              />
            </Container>
            <Container>
              <Label style={{ fontSize: '15px' }} >location:</Label>
              <CheckBox
                label='yes'
                value='location yes'
                onCheck={this.changeInterest.bind(this)}
                checked={user.isLocated === true}
              />
              <CheckBox
                label='no'
                value='location no'
                onCheck={this.changeInterest.bind(this)}
                checked={user.isLocated === false}
              />
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
              <Label style={{ fontSize: '15px' }} >{`Like: ${user.like}`}</Label>
              <Label style={{ fontSize: '15px' }} >{`Score: ${user.profileScore}`}</Label>
            </Container>
            <Container>
              <LabelInput
                text={user.biography || 'Edit your biography'}
                maxLength={150}
                onChange={this.changeInterest.bind(this)}
                paramName='biography'
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
        <Container>
          <UploadFileButton
            multiple
            onDrop={this.handlePictures.bind(this)}
            label='Add pictures'
            profile={false}
            id='picture'
          />
          {
            user.pictures && user.pictures.map((picture, index) => {
              return (
                <Container key={index}>
                  <img key={index + 1} alt='' src={picture.data} />
                  <button key={index + 2} onClick={() => {
                    this.props.removePicture(picture)
                  }} />
                </Container>
              )
            })
          }
        </Container>
      </Container>
    )
  }
}

export default Profile
