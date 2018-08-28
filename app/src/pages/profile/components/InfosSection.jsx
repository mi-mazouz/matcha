import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withTheme } from '@material-ui/core/styles'

import StyledTitle from '../../../global/components/Title'
import StyledPaper from '../../../global/components/Paper'
import { getGenderIcon } from '../../../utils'

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

const Paper = styled(StyledPaper)`
  & > span {
    pointer-events: inherit !important;
  }
  &:not(:first-child) {
    margin-top: 10px;
  }
  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16) !important;
  padding: 5px;
  justify-content: center;
`

class InfosSection extends Component {
  render() {
    const { theme, t, user } = this.props

    return (
      <div className="column is-4">
        <Figure className="image is-128x128">
          <img
            className="is-rounded"
            src="https://bulma.io/images/placeholders/128x128.png"
            alt=""
          />
        </Figure>
        <Title className="is-6">
          {`${user.firstName} ${user.lastName} ${new Date(Date.now())
            .getFullYear() -
            new Date(user.birthDate)
              .getFullYear()} ${t('years_old')}`}
          <Icon icon={getGenderIcon(user.gender)} color={theme.palette.grey} />
        </Title>
        <Paper>{t('popularity_rating') + ': 15'}</Paper>
        <Paper className="control has-icons-right">
          {t('location') + ': Paris'}
          <span className="icon is-right">
            <EditIcon icon="edit" color={theme.palette.grey} />
          </span>
        </Paper>
        <Paper className="control has-icons-right">
          {t('interests')}
          <span className="icon is-right">
            <EditIcon icon="edit" color={theme.palette.grey} />
          </span>
        </Paper>
        <Paper className="control has-icons-right">
          {`${t('sexual_orientation')} ${t(user.sexualOrientation.toLowerCase())}`}
          <span className="icon is-right">
            <EditIcon icon="edit" color={theme.palette.grey} />
          </span>
        </Paper>
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
    sexualOrientation: PropTypes.string.isRequired
  }).isRequired
}

export default translate()(withTheme()(InfosSection))
