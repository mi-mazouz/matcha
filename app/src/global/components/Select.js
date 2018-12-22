import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'

const SelectWrapper = withTheme()(styled.div`
  &:not(.is-multiple):not(.is-loading)::after {
    border-color: ${props => props.theme.palette.grey} !important;
  }
  width: 100%;
`)

const StyledSelect = withTheme()(styled.select`
  &:focus {
    border-color: transparent !important;
    box-shadow: none !important;
  }
  color: ${$props => $props.theme.palette.grey} !important;
  opacity: 0.8;
  width: inherit;
  font-weight: 600;
  text-align-last: center;
`)

const Select = ({ children, ...props }) => (
  <SelectWrapper className="select">
    <StyledSelect {...props}>{children}</StyledSelect>
  </SelectWrapper>
)

Select.propTypes = {
  children: PropTypes.node.isRequired
}

export default Select
