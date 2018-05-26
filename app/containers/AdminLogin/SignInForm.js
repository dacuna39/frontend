import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import SingleInput from '../FormComponents/SingleInput';
import Select from 'components/FormComponents/Select';
import Radio from 'components/FormComponents/CheckboxOrRadioGroup';

import Button from 'components/Button';
import CenteredSection from './CenteredSection';
import SubmitInput from './SubmitInput';

//actions
import {loadProfile} from './loadProfile';

class SignInForm extends Component {
	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';
		
		this.state = {
			userName: '',
			password: '',
			accountOptions: ['admin'],
			accountSelection: ['admin'],
		};
	}
	
	handleUserNameChange = (e) => {
		this.setState({ userName: e.target.value });
	}
	
	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	}

	handleAccountOptionSelect = (e) => {
		this.setState({ accountSelection: [e.target.value]});
	}

	handleFormSubmit = (e) => { //validates and submits the form to the server
		e.preventDefault();

		const formPayload = {
			userName: this.state.userName,
			passhash: this.state.password
		};
		console.log(JSON.stringify(formPayload));	

		//admin post
		if(this.state.accountSelection[0] == 'admin'){
		
			fetch(this.link + '/admin/login', { 
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',	
				},
				body: JSON.stringify(formPayload)			
			})
			.then(response => {
				if (response.status == 200){ //checks if user was found
					console.log("Loggin in");
					return response.json();
				} else {
					alert("Invalid login");
				}
			})
			.then(data => { // loads data into store/props
				this.props.loadProfile(data);			
				return true;
			})
			.then(doneLoading => { //once job is finished, go to posts page
				if(doneLoading == true){
					this.props.history.push("/AdminPosts");					
				}				
			})
			.catch(error => console.log('parsing failed', error));
			
		}// end admin post
	}
		

	render() {
		return (
			<article>
				
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
			</article>
		);
	}
}

function mapStateToProps(state) {
	return{
		userId: state.userId,
		userName: state.userName,
		email: state.email,
		salt: state.salt,
		passhash: state.hash,
		userType: state.userType,

	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({loadProfile: loadProfile}, dispatch)
}

export default withRouter( connect(mapStateToProps, matchDispatchToProps)(SignInForm) );
