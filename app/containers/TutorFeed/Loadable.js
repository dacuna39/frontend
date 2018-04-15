/**
 *
 * Asynchronously loads the component for StudentPosts
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
