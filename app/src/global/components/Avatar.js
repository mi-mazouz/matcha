import React from 'react'
import classnames from 'classnames'
import MuiAvatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'

const AvatarContainer = styled.div`
  width: 64px !important;
  height: 80px !important;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  background-color: ${[props => props.color]};
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 10%;
  border-bottom-left-radius: 10%;
  &:not(:first-child) {
    margin-left: 10px;
  }
`

const Infos = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: white;
`

const AvatarWithInfos = ({ src, AvatarClassName, sex, theme, ...props }) => (
  <AvatarContainer color={sex === 'MAN' ? theme.palette.blue : theme.palette.pink} {...props}>
    <MuiAvatar className={classnames(AvatarClassName)} src={src} alt="" />
    <Infos>Joris, 28 Yo</Infos>
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
