import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import SingleInput from '../FormComponents/SingleInput';

import Button from 'components/Button';
import CenteredSection from './CenteredSection';
import SubmitInput from './SubmitInput';

//actions
import {actionProfile} from './actionProfile';

class SignInForm extends Component {
	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';
		
		this.state = {
			userName: '',
			password: '',	
		};

		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	
	handleUserNameChange(e) {
		this.setState({ userName: e.target.value }, () => console.log('userName:', this.state.userName));
	}
	
	handlePasswordChange(e) {
		this.setState({ password: e.target.value }, () => console.log('password:', this.state.password));
	}

	handleFormSubmit(e) { //validates and submits the form to the server
		e.preventDefault();

		const formPayload = {
			userName: this.state.userName,
			passhash: this.state.password
		};

		fetch(this.link + '/login', { 
			method: 'post',
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
		console.log("store first name", this.props.legalFirstName);
		return (
			<div>
				<p onClick={() => this.props.actionProfile("Test")}> hello </p>
			<form onSubmit={this.handleFormSubmit}>
				<SingleInput
					inputType={'text'}
					title={''}
					name={'userName'}
					controlFunc={this.handleUserNameChange}
					content={this.state.userName}
					placeholder={'User Name'} />
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
	return bindActionCreators({actionProfile: actionProfile}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps) (SignInForm);
