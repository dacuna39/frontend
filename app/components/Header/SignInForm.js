import React, {Component} from 'react';
import styled from 'styled-components';

import SingleInput from '../FormComponents/SingleInput';

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

class SignInForm extends Component {
	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';
		this.linkUser = '/students';

		this.state = {
			email: '',
			password: '',
			errors: [],
			isLoading: false		
		};

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	
	handleEmailChange(e) {
		this.setState({ email: e.target.value }, () => console.log('email:', this.state.email));
	}
	
	handlePasswordChange(e) {
		this.setState({ password: e.target.value }, () => console.log('password:', this.state.password));
	}

	handleFormSubmit(e) { //validates and submits the form to the server
		e.preventDefault();

		this.setState({isLoading: true});
		this.props.login(this.state);

		const formPayload = {
			email: this.state.email,
			passhash: this.state.password
		};

		fetch(this.link + this.linkUser, { 
			method: 'get',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',	
			},
			body: JSON.stringify(formPayload)					
		})
		.then(response => console.log(response.json()))
		.catch(error => console.log('parsing failed', error));
	}

	render() {
		return (
			<div>
			<form onSubmit={this.handleFormSubmit}>
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
				<p>			
				<SubmitInput
					type="submit"
					value="Sign In"
					/>
				</p>
			</form>
			</div>
		);
	}
}

export default SignInForm;
