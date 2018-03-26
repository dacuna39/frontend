import React, {Component} from 'react';
import styled from 'styled-components';

import SingleInput from 'components/FormComponents/SingleInput';
import TextArea from 'components/FormComponents/TextArea';

import CenteredSection from './CenteredSection';
import Form from './Form';
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
		this.link = 'https://tutor-find.herokuapp.com';

		this.state = {
			legalFirstName: "",
            legalLastName: "",
            degrees: "",
            links: "",
            img: "",
            bio: ""
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handlePictureChange = this.handlePictureChange.bind(this);
		this.handleDegreesChange = this.handleDegreesChange.bind(this);
		this.handleLinksChange = this.handleLinksChange.bind(this);
		this.handleBioChange = this.handleBioChange.bind(this);
	}

	/*
	componentWillMount() {
		localStorage.getItem('studentInfo') && this.setState({
				studentInfo: JSON.parse(localStorage.getItem('studentInfo')),
				isLoading: false
		})
	}
	*/

	componentDidMount() {

        fetch("https://tutor-find.herokuapp.com/tutors/4")
        .then(response => response.json())
        .then(data => this.setState({ 
          legalFirstName: data.legalFirstName,
          legalLastName: data.legalLastName,
          degrees: data.degrees,
          links: data.links,
          img: data.img,
          bio: data.bio
       }))
       .catch(error => console.log('parsing failed', error));
	}

	// handle variable changes
	
	handleFirstNameChange(e) {
		this.setState({ legalFirstName: e.target.value });
	}

	handleLastNameChange(e) {
		this.setState({ legalLastName: e.target.value });
	}

	handlePictureChange(e) {
		this.setState({ picture: e.target.value });
	}

	handleDegreesChange(e) {
		this.setState({ degrees: e.target.value });
	}

	handleLinksChange(e) {
		this.setState({ links: e.target.value });
	}

	handleBioChange(e) {
		this.setState({ bio: e.target.value });
	}
	
	// handle forms 
	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			legalFirstName: "",
            legalLastName: "",
            degrees: "",
            links: "",
            img: "",
            bio: ""
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();

		const formPayload = {
			legalFirstName: this.state.legalFirstName,
			legalLastName: this.state.legalLastName,
			img: this.state.img,
			degrees: this.state.degrees,
			links: this.state.links,
			bio: this.state.bio
		};

		console.log('Send this in a POST request:', formPayload);
		//this.handleClearForm(e);
	}

	render() {

        const { legalFirstName, legalLastName, degrees, links, img, bio } = this.state;

        return(
        <div>
            <p>  {legalFirstName} {legalLastName} {degrees} {links} {img} {bio} </p> 
        <Form id="form">
			{/* Profile pic, first/last name, major/minor */}
            <Wrapper>
          <CenteredSection>
          <p> Profile Picture </p>
            <Img src={profile} alt="Profile Picture" />
						<SingleInput
								inputType={'text'}
								title={''}
								name={'picture'}
								controlFunc={this.handlePictureChange}
								content={img}
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
								content={legalFirstName}
								placeholder={"First Name"}
								/>	
          </LeftAlignSection>

          <LeftAlignSection>
            <p>Degrees</p>
            <SingleInput
								inputType={'text'}
								title={''}
								name={'degrees'}
								controlFunc={this.handleDegreesChange}
								content={degrees}
								placeholder={'No Degrees'} />	
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
								content={legalLastName}
								placeholder={'Last Name'} />	
          </LeftAlignSection>

          <LeftAlignSection>
            <p>Links</p>
            <SingleInput
								inputType={'text'}
								title={''}
								name={'links'}
								controlFunc={this.handleLinksChange}
								content={links}
								placeholder={'No Links'} />
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
    ) //end return
	}// end render
}

export default ProfileForm;
