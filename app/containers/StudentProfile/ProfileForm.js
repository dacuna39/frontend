import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'

import CheckboxOrRadioGroup from 'components/FormComponents/CheckboxOrRadioGroup';
import SingleInput from 'components/FormComponents/SingleInput';
import TextArea from 'components/FormComponents/TextArea';

import CenteredSection from './CenteredSection';
import Form from './Form';
import messages from './messages';
import Wrapper from './Wrapper';
import Img from './Img';
import Modal from './Modal'

import profile from './default_profile_pic.jpg';

//var {Link, IndexLink} = require('react-router');

//css
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
  margin: 3em 0;
`;

class ProfileForm extends Component {

	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';
		this.linkUser = '/students/101'; 

		this.state = {
			userName: "",
			email: "",
			salt: "",
			password: "",
			userType: "",

			legalFirstName: "",
            legalLastName: "",
            major: "",
            minor: "",
            img: profile,
			bio: "",

			subjects: ["English", "Math", "Science", "History", "Computer Science", "Business", "Psychology","Spanish"],
			selectedSubjects: [],
			
			active: true,
			timestamp: 10000000000000,

			isChangePassOpen: false, //whether the change password modal is rendered
			isDeactivateOpen: false, //whether the deactivate account modal is rendered

			enterPassword: "",
			newPassword: "",
			reenterPassword: "",
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handlePictureChange = this.handlePictureChange.bind(this);
		this.handleMajorChange = this.handleMajorChange.bind(this);
		this.handleMinorChange = this.handleMinorChange.bind(this);
		this.handleBioChange = this.handleBioChange.bind(this);
		this.handleSubjectSelection = this.handleSubjectSelection.bind(this);

		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleNewPassChange = this.handleNewPassChange.bind(this);
		this.handleReenterPassChange = this.handleReenterPassChange.bind(this);

		this.validateForm = this.validateForm.bind(this);
		this.validatePassChange = this.validatePassChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.deactivateAccount = this.deactivateAccount.bind(this);
		this.changePassword = this.changePassword.bind(this);
	}

	toggleChangePassModal = () => { //opens and closes the modal
		this.setState({
		  isChangePassOpen: !this.state.isChangePassOpen
		});
	  }

	toggleDeactivateModal = () => { //opens and closes the modal
		this.setState({
		  isDeactivateOpen: !this.state.isDeactivateOpen
		});
	}

	componentDidMount() {

        fetch(this.link + this.linkUser)
        .then(response => response.json())
        .then(data => this.setState({
			userName: data.userName,
			email: data.email,
			salt: data.salt,
			password: data.passhash,
			userType: data.userType,

	        legalFirstName: data.legalFirstName,
    	    legalLastName: data.legalLastName,
            major: data.major,
            minor: data.minor,
            img: data.img,
			bio: data.bio,
			//selectedSubjects: data.subjects,
		  
			active: data.active,
			timestamp: data.timestamp,
       }))
	   .catch(error => console.log('parsing failed', error));
	}

	/* handle variable changes */

	handleFirstNameChange(e) {
		this.setState({ legalFirstName: e.target.value });
	}

	handleLastNameChange(e) {
		this.setState({ legalLastName: e.target.value });
	}

	handlePictureChange(e) {
		this.setState({ img: e.target.value });
	}

	handleMajorChange(e) {
		this.setState({ major: e.target.value });
	}

	handleMinorChange(e) {
		this.setState({ minor: e.target.value });
	}

	handleBioChange(e) {
		this.setState({ bio: e.target.value });
	}

	handleSubjectSelection(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if(this.state.selectedSubjects.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.selectedSubjects.filter(s => s !== newSelection)
		} else {
			newSelectionArray = [...this.state.selectedSubjects, newSelection];
		}
		this.setState({ selectedSubjects: newSelectionArray }, () => console.log('subject selection', this.state.selectedSubjects));
	}

	handlePasswordChange(e) {
		this.setState({ enterPassword: e.target.value }, () => console.log('enterPassword:', this.state.enterPassword));
	}

	handleNewPassChange(e) {
		this.setState({ newPassword: e.target.value }, () => console.log('new password:', this.state.newPassword));
	}

	handleReenterPassChange(e) {
		this.setState({ reenterPassword: e.target.value }, () => console.log('reenter password:', this.state.reenterPassword));
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
		else if(this.state.major == ''){
			alert('Please enter a major');
			return false;
		}
		else if(this.state.bio == ''){
			alert('Please write a bio. Express yourself!');
			return false;
		}		
		else if(this.state.selectedSubjects.length == 0){
			alert('Please select at least one subject you need help with');
			return false;
		}
		else {
			return true;
		}
	}

	validatePassChange() {

		if (this.state.enterPassword != this.state.password){
			alert('Your current password is incorrect');
			return false;
		}
		else if (this.state.newPassword.length < 6){
			alert('Password must be at least 6 characters long');
			return false;
		}
		else if (this.state.newPassword != this.state.reenterPassword){
			alert('New passwords do not match');
			return false;
		}
	}

	handleFormSubmit(e) {

		e.preventDefault();

		if(this.validateForm()){

			const formPayload = { //Json to be submitted
				userName: this.state.userName,
				email: this.state.email,
				salt: this.state.salt,
				passhash: this.state.password,
				userType: this.state.userType,

				legalFirstName: this.state.legalFirstName,
				legalLastName: this.state.legalLastName,
				img: this.state.img,
				major: this.state.major,
				minor: this.state.minor,
				bio: this.state.bio,
				//selectedSubjects: this.state.subjects,				

				active: this.state.active,
		  		creationDate: this.state.timestamp,
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

			alert('formPayload: ' + JSON.stringify(formPayload));
			alert("Saved!");
			
		}// end if validating form

	}// end handleformsubmit

	deactivateAccount(){
		this.setState({ 
			bio: "being deleted",//because the form still validates before deleting the user, will change this
			major: "deleted",
			selectedSubjects: ["deleted"],
			active: false 
		});
		this.handleFormSubmit();
	}

	changePassword(){

		if (this.validatePassChange()){

			this.setState({ password: this.state.enterPassword });
			this.handleFormSubmit();
		}
	}

	render() {

		console.log("first: ", this.props.legalFirstName);
        const { legalFirstName, legalLastName, major, minor, img, bio, password, selectedSubjects } = this.state;

        return(
        <div>
            <p>  {legalFirstName} {legalLastName} {major} {minor} {img} {bio} {selectedSubjects} </p> 
			<p> {password} </p>
        <Form id="form" onSubmit={this.handleFormSubmit}>
			{/* Profile pic, first/last name, major/minor */}
            <Wrapper>
          	<CenteredSection>
          		<p> Profile Picture </p>
            	<Img src={img} alt="Profile Picture" />
					<SingleInput
						inputType={'text'}
						title={''}
						name={'img'}
						controlFunc={this.handlePictureChange}
						content={img}
						placeholder={'No Image Selected'} />          							
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
            		<p>Major</p>
            		<SingleInput
						inputType={'text'}
						title={''}
						name={'major'}
						controlFunc={this.handleMajorChange}
						content={major}
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
						content={legalLastName}
						placeholder={'Last Name'} />	
         		</LeftAlignSection>

            	<LeftAlignSection>
             		<p>Minor</p>
            		<SingleInput
						inputType={'text'}
						title={''}
						name={'minor'}
						controlFunc={this.handleMinorChange}
						content={minor}
						placeholder={'Minor'} />
				</LeftAlignSection>
          	</div>
    	    </Wrapper>

			{/* Subject Options */}
			<Wrapper>
				<CheckboxOrRadioGroup
						title={'Select the subjects you need help with'}
						setName={'subjects'}
						type={'checkbox'}
						controlFunc={this.handleSubjectSelection}
						options={this.state.subjects}
						selectedOptions={this.state.selectedSubjects} />
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
					<a href="/studentSignedInLandingPage"> <Button form="" > Back </Button> </a>
				</CenteredSection>
			</Wrapper>
			
			<Wrapper>
				<CenteredSection>
					 <Button form="" onClick={this.toggleChangePassModal}> Change Password </Button>
					 <Button form="" onClick={this.toggleDeactivateModal}> Deactivate Account </Button>
        	    	  
		        </CenteredSection>
      		</Wrapper>
	  	</Form>

		{/* Change Password Modal */}
		<Modal show={this.state.isChangePassOpen}
					onClose={this.toggleChangePassModal}>

				<h4> Change password </h4>
				<label> Enter current password </label> 
				<SingleInput
					inputType={'password'}
					title={''}
					name={'password'}
					controlFunc={this.handlePasswordChange}
					content={this.state.enterPassword}
					placeholder={'Password'} />	

				<label> Enter new password </label> 
				<SingleInput
					inputType={'password'}
					title={''}
					name={'newPassword'}
					controlFunc={this.handleNewPassChange}
					content={this.state.newPassword}
					placeholder={'Password'} />

				<label> Re-enter password </label> 
				<SingleInput
					inputType={'password'}
					title={''}
					name={'reenterPassword'}
					controlFunc={this.handleReenterPassChange}
					content={this.state.reenterPassword}
					placeholder={'Password'} />	

				<Button form="" onClick={this.changePassword}> Change </Button>
		</Modal>

		{/* Deactivate Account Modal */}
		<Modal show={this.state.isDeactivateOpen}
					onClose={this.toggleDeactivateModal}>

				<p> This will deactivate your account. Are you sure? </p>
				<Button form="form" onClick={this.deactivateAccount}> Deactivate Account </Button>
		</Modal>		
	
    	</div>
		) //end return
		
	} // end render
}

function mapStateToProps(state) {
	return{
		userId: state.userId,
		userName: state.userName,
		email: state.email,
		password: state.password,
		salt: state.salt,
		userType: state.userType,

		legalFirstName: state.legalFirstName,
		legalLastName: state.legalLastName,
		bio: state.bio,
		img: state.img,
		active: state.active,

		major: state.major, //student props
		minor: state.minor,
		creationDate: state.creationDate,

		degrees: state.degrees, //tutor props
		links: state.links,
		timestamp: state.timestamp,
		ratings: state.ratings,
	}
}

export default connect(mapStateToProps)(ProfileForm);
