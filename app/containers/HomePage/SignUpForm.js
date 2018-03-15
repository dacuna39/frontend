import React, {Component} from 'react';
import styled from 'styled-components';

import SingleInput from 'components/FormComponents/SingleInput';
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

const Form = styled.form`
 
`;

class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			email: '',
			password: '',
			confirmPassword: ''
		};

		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
	}
	componentDidMount() {
		fetch('./fake_db.json')
			.then(res => res.json())
			.then(data => {
				this.setState({
					userName: data.userName,
					email: data.email,
					password: data.password,
					//confirmPassword: data.confirmPassword
				});
			});
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
	
	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			userName: '',
			email: '',
			password: '',
			confirmPassword: ''
		});
	}
	handleFormSubmit(e) {
		e.preventDefault();

		const formPayload = {
			userName: this.state.userName,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};

		console.log('Send this in a POST request:', formPayload);
		this.handleClearForm(e);
	}
	render() {
		return (
			<div>
			<Form className="container" onSubmit={this.handleFormSubmit}>
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
				<SubmitInput
					type="submit"
					className="btn btn-primary float-right"
					value="Sign Up"
					/>
			</Form>
			</div>
		);
	}
}

export default SignUpForm;
