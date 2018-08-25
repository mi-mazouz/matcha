import Loadable from 'react-loadable'

import Spinner from '../../common/components/Spinner'

const LoadableComponent = Loadable({
  loader: () => import('./LogoutLayout'),
  loading: Spinner
})

export default LoadableComponent
