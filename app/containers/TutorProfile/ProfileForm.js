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
import Modal from './Modal'

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
		this.linkUser = '/tutors/4';

		this.state = {
			userName: "",
			email: "",
			salt: "",
			passhash: "",
			userType: "",

			legalFirstName: "",
            legalLastName: "",
            degrees: "",
            links: "",
            img: "",
			bio: "",

			active: true,
			timestamp: 10000000000000,
			ratings: [],

			isOpen: false //whether the modal is rendered
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handlePictureChange = this.handlePictureChange.bind(this);
		this.handleDegreesChange = this.handleDegreesChange.bind(this);
		this.handleLinksChange = this.handleLinksChange.bind(this);
		this.handleBioChange = this.handleBioChange.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.deactivateAccount = this.deactivateAccount.bind(this);
	}

	/*
	componentWillMount() {
		localStorage.getItem('studentInfo') && this.setState({
				studentInfo: JSON.parse(localStorage.getItem('studentInfo')),
				isLoading: false
		})
	}
	*/
	toggleModal = () => { //opens and closes the modal
		this.setState({
		  isOpen: !this.state.isOpen
		});
	  }

	componentDidMount() {

        fetch(this.link + this.linkUser)
        .then(response => response.json())
        .then(data => this.setState({ 
			userName: data.userName,
			email: data.email,
			salt: data.salt,
			passhash: data.passhash,
			userType: data.userType,

        	legalFirstName: data.legalFirstName,
        	legalLastName: data.legalLastName,
        	degrees: data.degrees,
        	links: data.links,
        	img: data.img,
			bio: data.bio,
		  
			active: data.active,
			timestamp: data.timestamp,
			ratings: data.ratings,

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
	
	/* handle forms */

	validateForm(){

		if(this.state.legalFirstName == ''){
			alert('Please enter your first name');
			return false;
		}
		else if(this.state.legalLastName == ''){
			alert('Please enter your last name');
			return false;
		}
		else if(this.state.bio == ''){
			alert('Please write a bio. Express yourself!');
			return false;
		}		
		else {
			return true;
		}
	}

	handleFormSubmit(e) {

		e.preventDefault();

			if(this.validateForm()){

			const formPayload = { //Json to be submitted
				userName: this.state.userName,
				email: this.state.email,
				salt: this.state.salt,
				passhash: this.state.passhash,
				userType: this.state.userType,

				legalFirstName: this.state.legalFirstName,
				legalLastName: this.state.legalLastName,
				img: this.state.img,
				degrees: this.state.degrees,
				links: this.state.links,
				bio: this.state.bio,

				active: this.state.active,
		  		timestamp: this.state.timestamp,
		  		ratings: this.state.ratings,
			};

			fetch(this.link + this.linkUser, { //post profile updates to database :)
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',	
				},
				body: JSON.stringify(formPayload)					
			})
			.catch(error => console.log('parsing failed', error))

			alert('formPayload' + JSON.stringify(formPayload));
			alert("Saved!");

		}// end if
	}// end handleformsubmit

	deactivateAccount(){
		this.setState({ 
			bio: "being deleted", //because the form still checks if bio is empty before deleting the user
			active: false 
		});
		this.handleFormSubmit();
	}

	render() {

        const { legalFirstName, legalLastName, degrees, links, img, bio } = this.state;

        return(
        <div>
            <p>  {legalFirstName} {legalLastName} {degrees} {links} {img} {bio} </p> 
			<Form id="form" onSubmit={this.handleFormSubmit}>
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
						placeholder={"First Name"}/>	
          		</LeftAlignSection>

            	<LeftAlignSection>
            		<p>Degrees</p>
            		<SingleInput
						inputType={'text'}
						title={''}
						name={'degrees'}
						controlFunc={this.handleDegreesChange}
						content={degrees}
						placeholder={'Degrees'} />	
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
						placeholder={'Links'} />
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
					<Button> Back </Button>

		        	<p> <a href="/tutorProfile"> Change Password </a> </p>
        	    	<Button form="" onClick={this.toggleModal}> Deactivate Account </Button>
		        </CenteredSection>
      		</Wrapper>
	  	</Form>

		<Modal show={this.state.isOpen}
					onClose={this.toggleModal}>

				<p> This will deactivate your account. Are you sure? </p>
				<Button form="form" onClick={this.deactivateAccount}> Deactivate Account </Button>

		</Modal>
	
    </div>
    ) //end return
	}// end render
}

export default ProfileForm;
