import React, { Component } from 'react'
import { withTheme } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { translate } from 'react-i18next'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import EmptyHeart from '../assets/empty-heart.png'
import FilledHeart from '../assets/filled-heart.png'
import StyledPaper from '../../../global/components/Paper'
import StyledTitle from '../../../global/components/Title'
import medias, { windowSizes } from '../../../config/medias'

const NestedColumns = styled.div`
  width: 100%;
  margin: 0 !important;
  display: flex;
  flex-wrap: wrap;
`

const ActionContainer = styled.div`
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`

const Figure = styled.figure`
  margin: auto;
  ${medias.tabletLg.min`
    width: 155px;
  `};
  ${medias.tabletLg.max`
    width: 275px;
  `};
  &:hover {
    background-color: black;
    & > img:first-child {
      display: block !important;
    }
  }
`

const Paper = styled(StyledPaper)`
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16) !important;
`

const Title = styled(StyledTitle)`
  margin-right: 5px;
  font-size: 12px !important;
  border-bottom: solid 1px;
`

const SeeMore = styled.span`
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
`

const Picture = styled.img`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

const LikePng = styled.img`
  display: none !important;
  position: absolute;
  width: 50% !important;
  top: 20%;
  left: 25%;
`

class PicturesSection extends Component {
  state = {
    isCollapsed: true,
    isPicturesLiked: Array(4)
      .fill(false)
  }

  onCollapse = () => this.setState({ isCollapsed: !this.state.isCollapsed })

  onLike = index => {
    const isPicturesLiked = [...this.state.isPicturesLiked]

    isPicturesLiked[index] = !this.state.isPicturesLiked[index]
    this.setState({ isPicturesLiked })
  }

  render() {
    const { pictures, theme, className, t, windowWidth } = this.props

    return (
      <div className={classnames('column', 'is-4', className)}>
        <Paper>
          <NestedColumns className="columns">
            {pictures &&
              pictures.map((picture, index) => {
                if (windowWidth <= windowSizes.mobileLg && index > 0 && this.state.isCollapsed)
                  return null

                return (
                  <div key={index} className="column">
                    <Figure className="image">
                      <LikePng src={this.state.isPicturesLiked[index] ? FilledHeart : EmptyHeart} />
                      <Picture onClick={() => this.onLike(index)} src={picture.path} alt="" />
                    </Figure>
                  </div>
                )
              })}
          </NestedColumns>
          {windowWidth <= windowSizes.mobileLg && (
            <SeeMore onClick={this.onCollapse}>
              {t(`${this.state.isCollapsed ? 'see_more' : 'see_less'}`)}
            </SeeMore>
          )}
        </Paper>
        <ActionContainer>
          <Title className="subtitle is-6">{t('manage_my_pictures')}</Title>
          <FontAwesomeIcon icon="pen" size="xs" color={theme.palette.grey} />
        </ActionContainer>
      </div>
    )
  }
}

PicturesSection.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  windowWidth: PropTypes.number.isRequired,
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired
    })
  )
}

PicturesSection.defaultProps = {
  className: null,
  pictures: null
}

export default translate()(withTheme()(PicturesSection))
