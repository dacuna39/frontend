import React from 'react';
import { shallow } from 'enzyme';

import { TutorProfile } from '../index';

describe('<TutorProfile />', () => {
  it('should render the profile form component', () => {
    const renderedComponent = shallow(<TutorProfile />);
    expect(renderedComponent.contains(
      <ProfileForm /> 
    )).toEqual(false);
  });
});
