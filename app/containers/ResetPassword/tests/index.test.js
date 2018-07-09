import React from 'react';
import { shallow } from 'enzyme';

import ResetPassword from '../index';

describe('<ResetPassword />', () => {

  it('should render the reset password message including the new password', () => {
    const renderedComponent = shallow(<ResetPassword attribute={'test'} />);
    expect(renderedComponent.contains(
      <BodyWrapper>
          <CenteredSection>
            <H1> Reset Password </H1>

            <p> Your new password is {this.state.newPassword}</p>
            <p> You can now log in with your new password. Go to your profile and scroll down to change password if you want to make your password your own again! </p>
          </CenteredSection>
          
        </BodyWrapper>
    ).toBe(true));
  });

});
