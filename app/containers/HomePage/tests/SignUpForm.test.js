import React from 'react';
import { shallow } from 'enzyme';

import SignUpForm from '../SignUpForm';

describe('<SignUpForm />', () => {
    it('Should render the singleinput components', () => {
        const renderedComponent = shallow(<SignUpForm />);
        expect(renderedComponent.contains(

        <SingleInput
            inputType={'text'}
            title={''}
            name={'firstName'}
            controlFunc={this.handleFirstNameChange}
            content={this.state.legalFirstName}
            placeholder={'First Name'} />	

        )).toBe(true);
    });
});