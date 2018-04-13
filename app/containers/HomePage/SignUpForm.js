import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import styled from 'styled-components';

import SingleInput from 'components/FormComponents/SingleInput';
import Select from 'components/FormComponents/Select';
import Button from 'components/Button';
import Radio from 'components/FormComponents/CheckboxOrRadioGroup';

import CenteredSection from './CenteredSection';
import Form from './Form';
import SubmitInput from './SubmitInput';

//actions
import {loadProfile} from './loadProfile';

import profile from './default_profile_pic.jpg';

class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';

		this.state = {
			
			userName: '',
			email: '',
			password: '',
			legalFirstName: '',
			legalLastName: '',

			confirmPassword: '',
			accountOptions: ['Student','Tutor'],
			accountSelection: [],
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
		this.handleAccountOptionSelect = this.handleAccountOptionSelect.bind(this);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.validateForm = this.validateForm.bind(this);
		
		console.log("Props at signupform: ",this.props);
	}

	handleFirstNameChange(e) {
		this.setState({ legalFirstName: e.target.value });
	}

	handleLastNameChange(e) {
		this.setState({ legalLastName: e.target.value });
	}

	handleUserNameChange(e) {
		this.setState({ userName: e.target.value });
	}

	handleEmailChange(e) {
		this.setState({ email: e.target.value });
	}
	
	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}

	handleConfirmPasswordChange(e) {
		this.setState({ confirmPassword: e.target.value });
	}

	handleAccountOptionSelect(e) {
		this.setState({ accountSelection: [e.target.value] });
	}

	validateForm(){
		if(this.state.accountSelection == ''){
			alert('Please select an account type');
			return false;
		}
		else if(this.state.legalFirstName == ''){
			alert('Please enter your first name');
			return false;
		}
		else if(this.state.legalLastName == ''){
			alert('Please enter your last name');
			return false;
		}
		else if(this.state.userName == ''){
			alert('Please enter a user name');
			return false;
		}
		else if(this.state.email == ''){
			alert('Please enter your email');
			return false;
		}
		else if(this.state.password.length < 6){
			alert('Password must be at least 6 characters long');
			return false;
		}
		else if (this.state.password != this.state.confirmPassword){
			alert('Passwords do not match')
			return false;
		}
		else {
			return true;
		}
	}

	handleFormSubmit(e) {

		e.preventDefault();

		if(this.validateForm()){

			//student Put
			if(this.state.accountSelection[0] == 'Student'){

				const studentPayload = { //userId is automatically incremented
					userName: this.state.userName,
					email: this.state.email,
					passhash: this.state.password,
					salt: "",
					userType: "student",
					subjects: [],

					legalFirstName: this.state.legalFirstName,
					legalLastName: this.state.legalLastName,
					bio: "",
					img: "https:d30y9cdsu7xlg0.cloudfront.net/png/1095867-200.png",

					major: "",
					minor: "",

					active: true,
					creationDate: Math.floor(Date.now()/1000),						
				};
		
				fetch(this.link + '/students', { //post entries to database :)
					method: 'put',
					headers: {
					  'Accept': 'application/json',
					  'Content-Type': 'application/json',	
					},
					body: JSON.stringify(studentPayload)					
				})
				.then(response => {
					if (response.status == 200){ //checks if user was found
						console.log("success");
						this.props.loadProfile(studentPayload);
						return true;
					} else {
						alert("Error signing Up");
					}
				})
				.then(doneLoading => { //once job is finished, go to profile page
					if(doneLoading == true){
						this.props.history.push("/studentProfile");					
					}
					
				})
				.catch(error => console.log('parsing failed', error))

				alert('studentPayload' + JSON.stringify(studentPayload));

			}// end student put

			//Tutor put
			else if (this.state.accountSelection[0] == 'Tutor'){
				const tutorPayload = {
					userName: this.state.userName,
					email: this.state.email,
					passhash: this.state.password,
					salt: "",
					userType: "tutor",
					subjects: [],

					legalFirstName: this.state.legalFirstName,
					legalLastName: this.state.legalLastName,
					bio: "",
					img: "https:d30y9cdsu7xlg0.cloudfront.net/png/1095867-200.png",

					degrees: "",
					links: "",

					active: true,
					timestamp: Math.floor(Date.now()/1000),
					ratings: [],
				};
				
				fetch(this.link + '/tutors', { //post entries to database :)
					method: 'put',
					headers: {
					  'Accept': 'application/json',
					  'Content-Type': 'application/json',	
					},
					body: JSON.stringify(tutorPayload)					
				})
				.then(response => {
					if (response.status == 200){ //checks if user was found
						console.log("success");
						this.props.loadProfile(tutorPayload);
						return true;
					} else {
						alert("Error signing Up");
					}
				})
				.then(doneLoading => { //once job is finished, go to profile page
					if(doneLoading == true){
						this.props.history.push("/tutorProfile");					
					}
					
				})
				.catch(error => console.log('parsing failed', error))
	
				alert('tutorPayload' + JSON.stringify(tutorPayload));
			}//end tutor put

		}// end if validateForm()
	}//end handleformsubmit()

	render() {
		return (
			<Form onSubmit={this.handleFormSubmit}>
			<p> I am a: 
			<Radio
				title={''}
				type={'radio'}
				setName={'accountSelection'}
				controlFunc={this.handleAccountOptionSelect}
				options={this.state.accountOptions}
				selectedOptions={this.state.accountSelection}
				
				/>
			</p>
			
				<SingleInput
					inputType={'text'}
					title={''}
					name={'firstName'}
					controlFunc={this.handleFirstNameChange}
					content={this.state.legalFirstName}
					placeholder={'First Name'} />	
				<SingleInput
					inputType={'text'}
					title={''}
					name={'lastName'}
					controlFunc={this.handleLastNameChange}
					content={this.state.legalLastName}
					placeholder={'Last Name'} />	
				<SingleInput
					inputType={'text'}
					title={''}
					name={'userName'}
					controlFunc={this.handleUserNameChange}
					content={this.state.userName}
					placeholder={'User Name'} />	
				<SingleInput
					inputType={'email'}
					title={''}
					name={'email'}
					controlFunc={this.handleEmailChange}
					content={this.state.email}
					placeholder={'Email'} />
				<SingleInput
					inputType={'password'}
					title={''}
					name={'password'}
					controlFunc={this.handlePasswordChange}
					content={this.state.password}
					placeholder={'Password'} />		
				<SingleInput
					inputType={'password'}
					title={''}
					name={'confirmPassword'}
					controlFunc={this.handleConfirmPasswordChange}
					content={this.state.confirmPassword}
					placeholder={'Confirm Password'} />

				<p>
					<SubmitInput
							type="submit"
							value="Sign Up"
							/> 
				</p>
			</Form>
		);
	}
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

function matchDispatchToProps(dispatch) {
	return bindActionCreators({loadProfile: loadProfile}, dispatch)
}

export default withRouter( connect(mapStateToProps, matchDispatchToProps)(SignUpForm) );

