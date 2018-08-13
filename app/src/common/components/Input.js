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
  caret-color: black;
  opacity: 0.8;
`)

const ErrorText = styled.strong`
  font-size: 14px !important;
  text-align: left;
  position: absolute;
`

const Input = ({ className, ...props }) => (
  <StyledInput
    className={`input ${className}`}
    {...props}
  />
)

Input.propTypes = {
  className: PropTypes.string
}

const InputWithError = withTheme()(({ theme, icon, isError, errorText, isValid, ...props }) => (
  <div className="field">
    <div className="control has-icons-left has-icons-right">
      <Input {...props} isError={isError} />
      <span className="icon is-left">
        <FontAwesomeIcon icon={icon} color={theme.palette.grey} />
      </span>
      <span className="icon is-right">
        {
          (isError && <FontAwesomeIcon icon="exclamation-triangle" color={theme.palette.red} />) ||
          (isValid && <FontAwesomeIcon icon="check" color={theme.palette.green} />)
        }
      </span>
    </div>
    <ErrorText className="help is-danger">{errorText}</ErrorText>
  </div>
))

InputWithError.propTypes = {
  icon: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired
}

export {
  Input,
  InputWithError
}