import React, {Component} from 'react';
import { connect } from 'react-redux';

import CheckboxOrRadioGroup from 'components/FormComponents/CheckboxOrRadioGroup';
import SingleInput from 'components/FormComponents/SingleInput';
import TextArea from 'components/FormComponents/TextArea';

import CenteredSection from './CenteredSection';
import LeftAlignSection from './LeftAlignSection';
import SubmitInput from './SubmitInput';
import BlueButton from './BlueButton';
import Form from './Form';
import Wrapper from './Wrapper';
import Img from './Img';
import Modal from './Modal';

import profile from './default_profile_pic.jpg';

class ProfileForm extends Component {
	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';
		this.linkUser = '/tutors/100';

		this.state = {
			userName: "",
			email: "",
			salt: "",
			password: "",
			userType: "",

			legalFirstName: "",
            legalLastName: "",
            degrees: "",
            links: "",
            img: profile,
			bio: "",

			subjects: ["English", "Math", "Science", "History", "Computer Science", "Business", "Psychology","Spanish"],
			selectedSubjects: [],

			active: true,
			timestamp: 10000000000000,
			ratings: [],

			isChangePassOpen: false, //whether the change password modal is rendered
			isDeactivateOpen: false, //whether the deactivate account modal is rendered

			enterPassword: "",
			newPassword: "",
			reenterPassword: "",
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handlePictureChange = this.handlePictureChange.bind(this);
		this.handleDegreesChange = this.handleDegreesChange.bind(this);
		this.handleLinksChange = this.handleLinksChange.bind(this);
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

	/*
	componentWillMount() {
		localStorage.getItem('studentInfo') && this.setState({
				studentInfo: JSON.parse(localStorage.getItem('studentInfo')),
				isLoading: false
		})
	}
	*/
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
        	degrees: data.degrees,
        	links: data.links,
        	img: data.img,
			bio: data.bio,
			//selectedSubjects: data.subjects,
		  
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
		this.setState({ img: e.target.value });
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
		else if(this.state.bio == ''){
			alert('Please write a bio. Express yourself!');
			return false;
		}
		else if(this.state.selectedSubjects.length == 0){
			alert('Please select at least one subject you are willing to tutor');
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
				degrees: this.state.degrees,
				links: this.state.links,
				bio: this.state.bio,
				//selectedSubjects: this.state.subjects,

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

			alert('formPayload: ' + JSON.stringify(formPayload));
			alert("Saved!");

		}// end if
	}// end handleformsubmit

	deactivateAccount(){
		this.setState({ 
			bio: "being deleted",//because the form still validates before deleting the user, will change this
			degrees: "deleted", 
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

        const { legalFirstName, legalLastName, degrees, links, img, bio, password, selectedSubjects } = this.state;

        return(
        <div>
            <p>  {legalFirstName} {legalLastName} {degrees} {links} {img} {bio} {selectedSubjects} </p> 
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
					<a href="/tutorSignedInLandingPage"> <BlueButton form="" > Back </BlueButton> </a>
				</CenteredSection>
			</Wrapper>
			
			<Wrapper>
				<CenteredSection>
					 <BlueButton form="" onClick={this.toggleChangePassModal}> Change Password </BlueButton>
					 <BlueButton form="" onClick={this.toggleDeactivateModal}> Deactivate Account </BlueButton>
        	    	  
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

				<BlueButton form="" onClick={this.changePassword}> Change </BlueButton>
		</Modal>

		{/* Deactivate Account Modal */}
		<Modal show={this.state.isDeactivateOpen}
					onClose={this.toggleDeactivateModal}>

				<p> This will deactivate your account. Are you sure? </p>
				<BlueButton form="form" onClick={this.deactivateAccount}> Deactivate Account </BlueButton>
		</Modal>		
	
    </div>
    ) //end return
	}// end render
}

export default ProfileForm;
