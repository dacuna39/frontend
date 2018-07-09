import React from 'react';
import { shallow } from 'enzyme';

import ProfileForm from '../ProfileForm';

describe('<ProfileForm />', () => {

  it('should render the dropzone component for uploading images', () => {
    const renderedComponent = shallow( <ProfileForm /> );
    expect(renderedComponent.contains(
        <Dropzone
			multiple={false}
			accept="image/*"
    		onDrop={this.onImageDrop.bind(this)}
			style={{"width" : "100%", "height" : "5%", "border" : "0px solid black"}}>
	  
			<BlueButton form="" onClick={() => {
				this.setState({ img: this.state.uploadedFileCloudinaryUrl})
			}}> Change Picture </BlueButton>			  
		</Dropzone>
    ).toBe(true));
  });

  it('should render the change password and deactivate account buttons/functions', () => {
    const renderedComponent = shallow( <ProfileForm /> );
    expect(renderedComponent.contains(
        <Wrapper>
			<CenteredSection>
				<BlueButton form="" onClick={this.toggleChangePassModal}> Change Password </BlueButton>

				<BlueButton form="" onClick={this.toggleDeactivateModal}> Deactivate Account </BlueButton>
		    </CenteredSection>
      	</Wrapper>
    ).toBe(true));
  });

});
