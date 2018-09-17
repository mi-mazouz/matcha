import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import medias from '../../config/medias'

const StyledTitle = styled.h1`
  ${props =>
    props.className.includes('is-1') &&
    medias.tabletSm.max`
    font-size: 2rem !important;
  `};
`

const Title = ({ className, children }) => (
  <StyledTitle className={classnames('title', className)}>{children}</StyledTitle>
)

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Title.defaultProps = {
  className: null
}

export default Title
