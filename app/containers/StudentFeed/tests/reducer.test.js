
import { fromJS } from 'immutable';
import studentPostsReducer from '../reducer';

describe('studentPostsReducer', () => {
  it('returns the initial state', () => {
    expect(studentPostsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
