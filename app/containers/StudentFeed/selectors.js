import { createSelector } from 'reselect';

/**
 * Direct selector to the studentPosts state domain
 */
const selectStudentPostsDomain = (state) => state.get('studentPosts');

/**
 * Other specific selectors
 */


/**
 * Default selector used by StudentPosts
 */

const makeSelectStudentPosts = () => createSelector(
  selectStudentPostsDomain,
  (substate) => substate.toJS()
);

export default makeSelectStudentPosts;
export {
  selectStudentPostsDomain,
};
