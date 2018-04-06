/**
 * Asynchronously loads the component for Forgot Password
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
