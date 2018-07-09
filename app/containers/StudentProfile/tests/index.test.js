import React from 'react';
import { shallow } from 'enzyme';

import { StudentProfile } from '../index';

describe('<StudentProfile />', () => {
  it('should render the profile form component', () => {
    const renderedComponent = shallow(<StudentProfile />);
    expect(renderedComponent.contains(
      <ProfileForm /> 
    )).toEqual(false);
  });
});
