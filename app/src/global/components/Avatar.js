import React from 'react'
import classnames from 'classnames'
import MuiAvatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'

const AvatarContainer = styled.div`
  width: 64px !important;
  height: 95px !important;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  background-color: ${[props => props.color]};
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 10%;
  border-bottom-left-radius: 10%;
`

const Infos = styled.span`
  font-size: 10px;
  font-weight: bold;
`

const AvatarWithInfos = ({ src, AvatarClassName, theme, ...props }) => (
  <AvatarContainer color={theme.palette.blue} {...props}>
    <MuiAvatar className={classnames(AvatarClassName)} src={src} alt="" />
    <Infos>Joris Carol, 28 Yo</Infos>
  </AvatarContainer>
)

AvatarWithInfos.propTypes = {
  src: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  AvatarClassName: PropTypes.string
}

AvatarWithInfos.defaultProps = {
  AvatarClassName: null
}

export default withTheme()(AvatarWithInfos)
