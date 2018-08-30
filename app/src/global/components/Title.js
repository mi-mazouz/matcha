import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Title = ({ className, children }) => (
  <h1 className={classnames('title', className)}>{children}</h1>
)

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Title.defaultProps = {
  className: null
}

export default Title
