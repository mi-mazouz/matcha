import styled from 'styled-components'
import PropTypes from 'prop-types'

const Page = styled.div`
  height: 100%;
  ${props => props.backgroundImage && `background-image: url(${props.backgroundImage})`};
  background-size: cover;
  background-repeat: no-repeat;
`

Page.propTypes = {
  backgroundImage: PropTypes.node
}

export default Page