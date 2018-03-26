import React, {Component} from 'react';
import styled from 'styled-components';
//import request from "../../../node_modules/superagent/superagent"; uninstall this dependency!!!

import SingleInput from 'components/FormComponents/SingleInput';
import Select from 'components/FormComponents/Select';
import Button from 'components/Button';

import CenteredSection from './CenteredSection';

//button css
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
  background: #f5b01d;
  color: #FFF;

  &:active {
    background: #002147;
    color: #FFF;
  }
`;

//form css
const Form = styled.form`
 
`;

class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';

		this.state = {
			legalFirstName: '',
			legalLastName: '',
			userName: '',
			email: '',
			password: '',
			confirmPassword: '',

			accountOptions: ['Student','Tutor'],
			accountSelection: ''
		};

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
		this.handleAccountOptionSelect = this.handleAccountOptionSelect.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		
	}

	handleFirstNameChange(e) {
		this.setState({ legalFirstName: e.target.value }, () => console.log('legalFirstName:', this.state.legalFirstName));
	}

	handleLastNameChange(e) {
		this.setState({ legalLastName: e.target.value }, () => console.log('legalLastName:', this.state.legalLastName));
	}

	handleUserNameChange(e) {
		this.setState({ userName: e.target.value }, () => console.log('userName:', this.state.userName));
	}

	handleEmailChange(e) {
		this.setState({ email: e.target.value }, () => console.log('email:', this.state.email));
	}
	
	handlePasswordChange(e) {
		this.setState({ password: e.target.value }, () => console.log('password:', this.state.password));
	}

	handleConfirmPasswordChange(e) {
		this.setState({ confirmPassword: e.target.value }, () => console.log('confirmPassword:', this.state.confirmPassword));
	}

	handleAccountOptionSelect(e) {
		this.setState({ accountSelection: e.target.value }, () => console.log('accountType:', this.state.accountSelection));
	}
	
	handleClearForm(e) {
		e.preventDefault();
		this.state = {
			legalFirstName: '',
			legalLastName: '',
			userName: '',
			email: '',
			password: '',
			confirmPassword: '',

			accountOptions: ['Student','Tutor'],
			accountSelection: ''
		};
	}

	handleFormSubmit(e) {

		e.preventDefault();

		//user Put
		if(this.state.accountSelection == 'Student'){

		const studentPayload = {
			userName: this.state.userName,
			email: this.state.email,
			passhash: this.state.passhash,
			userType: "student",
			legalFirstName: this.state.legalFirstName,
			legalLastName: this.state.legalLastName,
			bio: "",
			major: "",
			minor: "",
			img: "No Image Selected",
		};
		
		fetch('https://tutor-find.herokuapp.com/students', { //post entries to database :)
			method: 'post',
			headers: {
			  //"Content-type": "application/x-www-form-urlencoded",
			  //'Access-Control-Allow-Origin':'*',
			  'Content-Type': 'application/json',	
			},
			body: JSON.stringify(studentPayload)					
		})
		.catch(error => console.log('parsing failed', error))

		alert('studentPayload' + JSON.stringify(studentPayload));
		}

		//Tutor put
		else if (this.state.accountSelection == 'Tutor'){
			const tutorPayload = {
				userName: this.state.userName,
				email: this.state.email,
				passhash: this.state.passhash,
				userType: "tutor",
				legalFirstName: this.state.legalFirstName,
				legalLastName: this.state.legalLastName,
				degrees: "",
				links: "",
				bio: "",
				img: "No Image Selected",
			};
			
			fetch('https://tutor-find.herokuapp.com/tutors', { //post entries to database :)
				method: 'post',
				headers: {
				  //"Content-type": "application/x-www-form-urlencoded",
				  //'Access-Control-Allow-Origin':'*',
				  'Content-Type': 'application/json',	
				},
				body: JSON.stringify(tutorPayload)					
			})
			.catch(error => console.log('parsing failed', error))
	
			alert('tutorPayload' + JSON.stringify(tutorPayload));
		}
	}

	render() {
		return (
			<div>
			<Form className="container" onSubmit={this.handleFormSubmit}>
			<p> I am a </p>
				<Select
					name={'accountSelection'}
					placeholder={'------'}
					controlFunc={this.handleAccountOptionSelect}
					options={this.state.accountOptions}
					selectedOption={this.state.accountSelection} />	
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

				<p id="errorMessage"> </p>
				<SubmitInput
					type="submit"
					value="Sign Up"
					/>
			</Form>
			</div>
		);
	}
}

export default SignUpForm;
