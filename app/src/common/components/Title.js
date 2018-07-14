import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ className, children }) => (
  <h1 className={className}>{ children }</h1>
)

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
}

export default Title