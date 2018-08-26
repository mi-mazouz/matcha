import Loadable from 'react-loadable'

import Spinner from '../../../global/components/Spinner'

const LoadableComponent = Loadable({
  loader: () => import('./components/Page'),
  loading: Spinner
})

export default LoadableComponent
