import React from 'react';
import { shallow } from 'enzyme';

import { ForgotPasswordForm } from '../index';

describe('<ForgotPasswordForm />', () => {

  it('should render the form tag with the input components', () => {
    const renderedComponent = shallow(<ForgotPasswordForm />);
    expect(renderedComponent.contains(
        <form onSubmit={this.handleFormSubmit}>
           <p>I am a:</p>
                <Select
                    name={'accountSelection'}
                    placeholder={''}
                    controlFunc={this.handleAccountOptionSelect}
                    options={this.state.accountOptions}
                    selectedOption={this.state.accountSelection} />	
                <SingleInput
                    inputType={'email'}
                    title={''}
                    name={'email'}
                    controlFunc={this.handleEmailChange}
                    content={this.state.email}
                    placeholder={'Email'} />
            
                <SubmitInput
                    type="submit"
                    value="Forgot Password"
                    />
        </form>
    )).toEqual(false);
  });

});
