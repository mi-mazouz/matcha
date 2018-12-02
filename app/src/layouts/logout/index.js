import Loadable from 'react-loadable'

import Spinner from '../../global/components/Spinner'

const LoadableComponent = Loadable({
  loader: () => import('./LogoutLayout'),
  loading: Spinner
})

export default LoadableComponent
