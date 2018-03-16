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

const Form = styled.form`
  
`;

class SignInForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''			
		};

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	componentDidMount() {
		fetch('./fake_db.json') //creates the json form for backend
			.then(res => res.json())
			.then(data => {
				this.setState({
					email: data.email,
					password: data.password
				});
			});
	}
	
	handleEmailChange(e) {
		this.setState({ email: e.target.value }, () => console.log('email:', this.state.email));
	}
	
	handlePasswordChange(e) {
		this.setState({ password: e.target.value }, () => console.log('password:', this.state.password));
	}
	
	handleClearForm(e) { // clears all fields of the form
		e.preventDefault();
		this.setState({
			email: '',
			password: ''
		});
	}

	handleFormSubmit(e) { //validates and submits the form to the server
		e.preventDefault();

		const formPayload = {
			email: this.state.email,
			password: this.state.password
		};

		console.log('Send this in a POST request:', formPayload);
		this.handleClearForm(e);
	}

	render() {
		return (
			<div>
			<Form className="container" onSubmit={this.handleFormSubmit}>
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
			</Form>
			</div>
		);
	}
}

export default SignInForm;
