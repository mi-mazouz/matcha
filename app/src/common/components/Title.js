import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ className, children }) => (
  <h1 className={`title ${className}`}>{ children }</h1>
)

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default Title