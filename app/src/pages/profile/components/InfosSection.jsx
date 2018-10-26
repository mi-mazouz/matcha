import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withTheme } from '@material-ui/core/styles'

import StyledTitle from '../../../global/components/Title'
import { getGenderIcon } from '../../../tools'
import { getAge } from '../../../tools/dates'

const Figure = styled.figure`
  margin: auto
  cursor: pointer;
`

const Icon = styled(FontAwesomeIcon)`
  margin-left: 10px;
`

const EditIcon = styled(Icon)`
  cursor: pointer;
`

const Title = styled(StyledTitle)`
  margin-top: 15px;
`

class InfosSection extends Component {
  render() {
    const { theme, t, user } = this.props

    return (
      <div className="column is-4">
        <Figure className="image is-128x128">
          <img
            className="is-rounded"
            alt=""
            src={
              (user.profilePicture && user.profilePicture.path) ||
              'https://bulma.io/images/placeholders/128x128.png'
            }
          />
        </Figure>
        <Title className="is-6">
          {`${user.firstName} ${user.lastName}, ${getAge(user.birthDate)} ${t('years_old')}`}
          <Icon icon={getGenderIcon(user.gender)} color={theme.palette.grey} />
        </Title>
        <div>
          <span>{t('popularity_rating') + ': 15'}</span>
          <div>
            <span>{t('location') + ': Paris'}</span>
            <EditIcon icon="pen" size="xs" color={theme.palette.grey} />
          </div>
          <div>
            <span>{t('interests')}</span>
            <EditIcon icon="pen" size="xs" color={theme.palette.grey} />
          </div>
          <div>
            <span>{`${t('sexual_orientation')} ${t(user.sexualOrientation.toLowerCase())}`}</span>
            <EditIcon icon="pen" size="xs" color={theme.palette.grey} />
          </div>
        </div>
      </div>
    )
  }
}

InfosSection.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  user: PropTypes.shape({
    birthDate: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    sexualOrientation: PropTypes.string.isRequired,
    profilePicture: PropTypes.shape({ path: PropTypes.string.isRequired })
  }).isRequired
}

export default translate()(withTheme()(InfosSection))
