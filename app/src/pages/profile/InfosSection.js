import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withTheme } from '@material-ui/core/styles'

import Title from '../../common/components/Title'

const Figure = styled.figure`
  margin: auto;
`

class InfosSection extends Component {
  render() {
    const { theme, t } = this.props

    return (
      <div className="column is-4">
        <Figure className="image is-128x128">
          <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" alt="" />
        </Figure>
        <FontAwesomeIcon icon="venus" color={theme.palette.grey} />
        <Title className="is-6">Mickael Mazouz, 28 {t('years_old')}</Title>
      </div>
    )
  }
}

InfosSection.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

export default translate()(withTheme()(InfosSection))