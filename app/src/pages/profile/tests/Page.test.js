import React from 'react'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'

import Spinner from '../../../global/components/Spinner'
import Page from '../components/Page'

const mockStore = configureStore()
const store = mockStore({
  currentUser: { id: 4 },
  profile: { user: null }
})

describe('<Page />', () => {
  const wrapper = mount(<Page store={store} location={{}} match={{ params: {} }} />)

  it('renders one <Spinner > component when store.profile.user is null', () => {
    expect(wrapper.find(Spinner))
    .toHaveLength(1)
  })
})
