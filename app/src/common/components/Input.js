import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledInput = withTheme()(styled.input`
  &:focus {
    border-color: transparent !important;
    box-shadow: none !important;
  }
  ${props => props.error && `&::-webkit-input-placeholder { color: ${props.theme.palette.red} !important; }`}
  caret-color: black;
  opacity: 0.8;
`)

const Input = ({ className, ...props }) => (
  <StyledInput
    className={`input ${className}`}
    {...props}
  />
)

Input.propTypes = {
  className: PropTypes.string
}

const InputWithIcons = withTheme()(({ theme, icon, error, isValid, ...props }) => (
  <div className="field">
    <div className="control has-icons-left has-icons-right">
      <Input {...props} error={error} />
      <span className="icon is-left">
        <FontAwesomeIcon icon={icon} color={theme.palette.grey} />
      </span>
      <span className="icon is-right">
        {
          (error && <FontAwesomeIcon icon="exclamation-triangle" color={theme.palette.red} />) ||
          (isValid && <FontAwesomeIcon icon="check" color={theme.palette.green} />)
        }
      </span>
    </div>
  </div>
))

InputWithIcons.propTypes = {
  icon: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired
}

export {
  Input,
  InputWithIcons
}