import React, {Component} from 'react';
import styled from 'styled-components';

import SingleInput from 'components/FormComponents/SingleInput';
import TextArea from 'components/FormComponents/TextArea';
//import Button from 'components/Button';

import CenteredSection from './CenteredSection';
import Form from './Form';
//import Input from './Input'; delete the file!
import Section from './Section';
import messages from './messages';
import Wrapper from './Wrapper';
import Img from './Img';
import profile from './default_profile_pic.jpg';

//button css
const Button = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;

  border: 2px solid #f5b01d;
  background-color: #002147;
  color: #FFF;

  &:active {
    background: #fff;
    color: #000;
  }
`;

const SubmitInput = styled.input`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;

  border: 2px solid #f5b01d;
  background-color: #002147;
  color: #FFF;

  &:active {
    background: #fff;
    color: #000;
  }
`;

const LeftAlignSection = styled.section`
  text-align: left;
  padding-right: 15%;
`;

class ProfileForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			firstName: '',
			lastName: '',
			picture: '',
			major: '',
			minor: '',
			bio: ''
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handlePictureChange = this.handlePictureChange.bind(this);
		this.handleMajorChange = this.handleMajorChange.bind(this);
		this.handleMinorChange = this.handleMinorChange.bind(this);
		this.handleBioChange = this.handleBioChange.bind(this);
	}

	componentDidMount() { //loads user from heroku
		fetch('https://tutor-find.herokuapp.com/users?userName=joetest')
			.then(res => res.json())
			.then(data => {
				this.setState({ //loads values from user to data
					firstName: data.firstName,
					lastName: data.lastName,
					picture: data.picture,
					major: data.major,
					minor: data.minor,
					bio: data.bio
				});
			});
	}
	
	handleFirstNameChange(e) {
		this.setState({ firstName: e.target.value }, () => console.log('firstName:', this.state.firstName));
	}

	handleLastNameChange(e) {
		this.setState({ lastName: e.target.value }, () => console.log('lastName:', this.state.lastName));
	}

	handlePictureChange(e) {
		this.setState({ picture: e.target.value }, () => console.log('picture:', this.state.picture));
	}

	handleMajorChange(e) {
		this.setState({ major: e.target.value }, () => console.log('major:', this.state.major));
	}

	handleMinorChange(e) {
		this.setState({ minor: e.target.value }, () => console.log('minor:', this.state.minor));
	}

	handleBioChange(e) {
		this.setState({ bio: e.target.value }, () => console.log('bio:', this.state.bio));
	}
	
	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			firstName: '',
			lastName: '',
			picture: '',
			major: '',
			minor: '',
			bio: ''
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();

		const formPayload = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			picture: this.state.picture,
			major: this.state.major,
			minor: this.state.minor,
			bio: this.state.bio
		};

		console.log('Send this in a POST request:', formPayload);
		this.handleClearForm(e);
	}

	render() {
		return (
			<div>
			<Form className="container" onSubmit={this.handleFormSubmit}>

			{/* Profile pic, first and last name */}
      <Wrapper>
          <CenteredSection>
          <p> Profile Picture </p>
            <Img src={profile} alt="Profile Picture" />
						<SingleInput
								inputType={'file'}
								title={''}
								name={'picture'}
								controlFunc={this.handlePictureChange}
								content={this.state.picture}
								placeholder={'No File Selected'} />
          </CenteredSection>
          
          <div>
          <LeftAlignSection>
            <p>First Name</p>
						<SingleInput
								inputType={'text'}
								title={''}
								name={'firstName'}
								controlFunc={this.handleFirstNameChange}
								content={this.state.firstName}
								placeholder={'First Name'} />	
          </LeftAlignSection>

          <LeftAlignSection>
            <p>Major</p>
            <SingleInput
								inputType={'text'}
								title={''}
								name={'major'}
								controlFunc={this.handleMajorChange}
								content={this.state.major}
								placeholder={'Major'} />	
          </LeftAlignSection> 
          </div>

          <div>
          <LeftAlignSection>
            <p>Last Name</p>
            <SingleInput
								inputType={'text'}
								title={''}
								name={'lastName'}
								controlFunc={this.handleLastNameChange}
								content={this.state.lastName}
								placeholder={'Last Name'} />	
          </LeftAlignSection>
           

          <LeftAlignSection>
            <p>Minor</p>
            <SingleInput
								inputType={'text'}
								title={''}
								name={'minor'}
								controlFunc={this.handleMinorChange}
								content={this.state.minor}
								placeholder={'Minor'} />
					</LeftAlignSection>
          </div>
      </Wrapper>

      {/* Bio */}
      <Wrapper>
          <CenteredSection>
            <p> Bio </p>
						<TextArea
								inputType={'text'}
								rows={5}
								cols={100}
								resize={false}
								title={''}
								name={'bio'}
								controlFunc={this.handleBioChange}
								content={this.state.bio}
								placeholder={'Experience, details, and other juicy info goes here!'} />
          </CenteredSection>
      </Wrapper>

      {/* save, cancel, change password, deactivate account */}
      <Wrapper>
          <CenteredSection>
						<SubmitInput 
								type="submit"
								value="Save Changes" />
						<Button> Cancel </Button>

            <p> <a href="/"> Change Password </a> </p>
            <p> <a href="/"> Deactivate Account </a> </p>
          </CenteredSection>
      </Wrapper>

			</Form>
			</div>
		);
	}
}

export default ProfileForm;
