import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Section = ({ children, className }) => (
  <div className={classnames('section', className)}>{children}</div>
)

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Section.defaultProps = {
  className: null
}

export default Section
