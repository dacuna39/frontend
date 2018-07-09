import React from 'react';
import { shallow } from 'enzyme';

import { ForgotPassword } from '../index';

describe('<ForgotPassword />', () => {

  it('should render the ForgotPasswordForm component', () => {
    const renderedComponent = shallow(<ForgotPassword />);
    expect(renderedComponent.contains(
      <ForgotPasswordForm />
    )).toEqual(false);
  });

  it('should render the link to return to the homepage', () => {
    const renderedComponent = shallow(<ForgotPassword />);
    expect(renderedComponent.contains(
      <p> <a href="/"> Click here </a> to return Home </p>
    )).toEqual(false);
  });
});
