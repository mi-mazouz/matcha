import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withTheme } from '@material-ui/core/styles'

import Title from '../../../global/components/Title'
import StyledPaper from '../../../global/components/Paper'
import AvatarWithInfos from '../../../global/components/Avatar'
import Container from '../../../global/components/Container'

const Paper = styled(StyledPaper)`
  &:not(:first-child) {
    margin-top: 30px;
  }
  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16) !important;
  flex-direction: column;
  padding: 15px;
  justify-content: center;
`

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
`

const ArrowLeftIcon = styled(Icon)`
  margin-right: 15px;
`

const ArrowRightIcon = styled(Icon)`
  margin-left: 15px;
`

const AvatarsListWrapper = styled.div`
  display: flex;
  align-items: center;
`

const AvatarsWrapper = styled.div`
  flex-wrap: wrap;
  justify-content: center;
  display: flex;
`

const Text = styled.p`
  text-align: justify;
`

class MoreSection extends Component {
  render() {
    const { theme, t } = this.props

    return (
      <div className="column is-4">
        <Paper>
          <Title className="is-6">{t('viewed_profile_title') + ':'}</Title>
          <AvatarsListWrapper>
            <ArrowLeftIcon icon="arrow-left" color={theme.palette.grey} />
            <AvatarsWrapper>
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <AvatarWithInfos
                    key={index}
                    AvatarClassName="image is-64x64"
                    src="https://bulma.io/images/placeholders/128x128.png"
                  />
                ))}
            </AvatarsWrapper>
            <ArrowRightIcon icon="arrow-right" color={theme.palette.grey} />
          </AvatarsListWrapper>
        </Paper>
        <Paper>
          <Title className="is-6">Few words about me:</Title>
          <Container>
            <Text>
              Une biographie Écouter (une bio), du grec ancien βίος, « la vie » et γραφή, « écrire
              », est un écrit qui a pour objet l'histoire d'une vie particulière ou d'un événement
              dans la vie du protagoniste. Elle peut être écrite par la personne elle-même
              (autobiographie) ou par une autre personne.
            </Text>
          </Container>
        </Paper>
      </div>
    )
  }
}

MoreSection.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

export default translate()(withTheme()(MoreSection))
