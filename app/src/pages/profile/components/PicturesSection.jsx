import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withTheme } from '@material-ui/core/styles'

import Title from '../../../global/components/Title'
import StyledPaper from '../../../global/components/Paper'

const NestedColumns = styled.div`
  width: 100%;
  margin-left: 0rem !important;
  display: flex;
  flex-wrap: wrap;
`

const Figure = styled.figure`
  margin: auto;
`

const Paper = styled(StyledPaper)`
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16) !important;
`

const EditIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
`

class PicturesSection extends Component {
  render() {
    const { theme, t, pictures } = this.props

    return (
      <div className="column is-4">
        <Paper>
          <Title className="is-4">{t('pictures')
            .toUpperCase()}</Title>
          <EditIcon icon="edit" color={theme.palette.grey} />
          <NestedColumns className="columns">
            {pictures &&
              pictures.map((picture, index) => (
                <div key={index} className="column">
                  <Figure className="image is-128x128">
                    <img src={picture.path} alt="" />
                  </Figure>
                </div>
              ))}
          </NestedColumns>
        </Paper>
      </div>
    )
  }
}

PicturesSection.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired
    })
  )
}

PicturesSection.defaultProps = {
  pictures: null
}

export default translate()(withTheme()(PicturesSection))
