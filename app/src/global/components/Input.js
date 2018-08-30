import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import PropTypes from 'prop-types'
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

const ErrorText = styled.p`
  text-align: start;
  font-size: 14px !important;
  font-weight: bold;
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
      {isError && <ErrorText className="help is-danger">{errorText}</ErrorText>}
    </div>
  )
)

InputWithIconsAndError.propTypes = {
  icon: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  errorText: PropTypes.string
}

export { Input, InputWithIconsAndError }
