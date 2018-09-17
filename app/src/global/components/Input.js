import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { withTheme } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledInput = styled.input`
  &:focus {
    border-color: transparent !important;
    box-shadow: none !important;
  }
  caret-color: black;
  opacity: 0.8;
`

const StyledTextField = styled(TextField)`
  .MuiInput-underline-18:after {
    border-bottom: 2px solid ${props => props.theme.palette.purple} !important;
  }
  .MuiInput-underline-18:before {
    border-bottom: 1px solid ${props => props.theme.palette.grey} !important;
  }
  .MuiInput-underline-18:hover:not(.MuiInput-disabled-17):not(.MuiInput-focused-16):not(.MuiInput-error-19):before {
    border-bottom: 2px solid ${props => props.theme.palette.purple} !important;
  }
  .MuiInput-input-22 {
    &:focus {
      cursor: text;
    }
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme.palette.grey};
    font-family: ${props => props.theme.fontFamily};
  }
`

const ErrorText = styled.p`
  text-align: start;
  font-size: 14px !important;
  font-weight: bold;
  color: ${props => props.theme.palette.red} !important;
  border-color: ${props => props.theme.palette.red} !important;
`

const Input = ({ className, ...props }) => (
  <StyledInput className={classnames('input', className)} {...props} />
)

Input.propTypes = {
  className: PropTypes.string
}

Input.defaultProps = {
  className: null
}

const InputWithIconsAndError = withTheme()(
  ({ theme, icon, isError, isValid, errorText, ...props }) => (
    <div className="field">
      <div className="control has-icons-left has-icons-right">
        <Input {...props} />
        <span className="icon is-left">
          <FontAwesomeIcon icon={icon} color={theme.palette.grey} />
        </span>
        <span className="icon is-right">
          {(isError && <FontAwesomeIcon icon="exclamation-triangle" color={theme.palette.red} />) ||
            (isValid && <FontAwesomeIcon icon="check" color={theme.palette.green} />)}
        </span>
      </div>
      {isError && (
        <ErrorText theme={theme} className="help is-danger">
          {errorText}
        </ErrorText>
      )}
    </div>
  )
)

InputWithIconsAndError.propTypes = {
  icon: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  errorText: PropTypes.string
}

const InputSearch = withTheme()(({ placeholder, theme, ...props }) => (
  <StyledTextField
    {...props}
    theme={theme}
    placeholder={placeholder}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <FontAwesomeIcon icon="search" color={theme.palette.grey} />
        </InputAdornment>
      )
    }}
  />
))

InputSearch.propTypes = {
  placeholder: PropTypes.string.isRequired
}

export { Input, InputWithIconsAndError, InputSearch }
