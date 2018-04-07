import React, {Component} from 'react';
import styled from 'styled-components';
//import request from "../../../node_modules/superagent/superagent"; uninstall this dependency!!!

import SingleInput from 'components/FormComponents/SingleInput';
import Select from 'components/FormComponents/Select';
import Button from 'components/Button';

import CenteredSection from './CenteredSection';
import Form from './Form';

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

class ForgotPasswordForm extends Component {
	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';

		this.state = {
			email: '',
			accountOptions: ['Student','Tutor'],
			accountSelection: ''
		};

		this.handleAccountOptionSelect = this.handleAccountOptionSelect.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.validateForm = this.validateForm.bind(this);
		
	}

	handleAccountOptionSelect(e) {
		this.setState({ accountSelection: e.target.value }, () => console.log('accountType:', this.state.accountSelection));
	}
	handleEmailChange(e) {
		this.setState({ email: e.target.value });
	}
	/*handleClearForm(e) {
		e.preventDefault();
		this.state = {
			email: '',
			accountOptions: ['Student','Tutor'],
			accountSelection: ''
		};
	}*/

	validateForm(){
		if(this.state.accountSelection == ''){
			alert('Please select an account type');
			return false;
		}
		else if(this.state.email == ''){
			alert('Please enter your email');
			return false;
		}	
		else {
			return true;
		}
	}

	handleFormSubmit(e) {

		e.preventDefault();

		if(this.validateForm()){

					//forgot password submit for student
			if(this.state.accountSelection == 'Student'){

					const studentPayload = {
						email: this.state.email,
						userType: "student",
					};
				fetch(this.link + '/forgotpassword/student/{email}/', { //Get true/false from database
					method: 'get',
					headers: {
					  //"Content-type": "application/x-www-form-urlencoded",
					  //'Access-Control-Allow-Origin':'*',
					  'Accept': 'application/json',
					  'Content-Type': 'application/json',	
					},
					body: JSON.stringify(studentPayload)					
				}) // close fetch
				.then(response => {
				if (response.status == 200){ //email found, endpoint has already sent email with link
					console.log("Password changed for student");
					alert("Please check your email for further instructions.");
					return response.json();
				} else {
					console.log("Password did not change");
					alert("Invalid email"); //if no 200 response, alert invalid
				}
			})
				.catch(error => console.log('parsing failed', error))

				alert('studentPayload' + JSON.stringify(studentPayload));
			}// end student forgot password


			//forgot password submit for tutor
			else if (this.state.accountSelection == 'Tutor'){
					const tutorPayload = {
						email: this.state.email,
						userType: "tutor",
					};
				
				fetch(this.link + '/forgotpassword/tutor/{email}/', { //get reset true/false from database 
					method: 'get',
					headers: {
					  //"Content-type": "application/x-www-form-urlencoded",
					  //'Access-Control-Allow-Origin':'*',
					  'Accept': 'application/json',
					  'Content-Type': 'application/json',	
					},
					body: JSON.stringify(tutorPayload)					
				})
				.then(response => {
				if (response.status == 200){ //checks if email was found, if found, endpoint has already sent email with link
					console.log("Password changed for tutor");
					alert("Please check your email for further instructions.");
					return response.json();
				} else {
					console.log("Password did not change"); 
					alert("Invalid email");  //if no email found, alert invalid
				}
			})
				.catch(error => console.log('parsing failed', error))
	
				alert('tutorPayload' + JSON.stringify(tutorPayload));
			}//end tutor forgot password
		}// end if validateForm()
	}//end handleformsubmit()

	render() {
		return (
			<div>
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
			</div>
		);
	}
}

export default ForgotPasswordForm;
