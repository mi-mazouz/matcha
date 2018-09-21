import React from 'react'
import { shallow } from 'enzyme'

import store from '../../../store'
import Container from '../../../global/components/Container'
import Page from './Page'

describe('<ErrorPage />', () => {
  const wrapper = shallow(<Page store={store} />).dive()

  it('renders one <Container > component', () => {
    expect(wrapper.find(Container)).toHaveLength(1)
  })

  it('renders one <Container > component', () => {
    expect(wrapper.find(Container)).toHaveLength(1)
  })
})
