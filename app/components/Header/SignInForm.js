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
			accountOptions: ['Student','Tutor'],
			accountSelection: [],
		};

		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleAccountOptionSelect = this.handleAccountOptionSelect.bind(this);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	
	handleUserNameChange(e) {
		this.setState({ userName: e.target.value });
	}
	
	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}

	handleAccountOptionSelect(e) {
		this.setState({ accountSelection: [e.target.value]});
	}

	handleFormSubmit(e) { //validates and submits the form to the server
		e.preventDefault();

		const formPayload = {
			userName: this.state.userName,
			passhash: this.state.password
		};

		//student post
		if(this.state.accountSelection[0] == 'Student'){
		
			fetch(this.link + '/students/login', { 
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
			.then(doneLoading => { //once job is finished, go to profile page
				if(doneLoading == true){
					this.props.history.push("/studentProfile");					
				}				
			})
			.catch(error => console.log('parsing failed', error));
			
		}// end student post

		//Tutor post
		else if (this.state.accountSelection[0] == 'Tutor'){
			fetch(this.link + '/tutors/login', { 
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',	
				},
				body: JSON.stringify(formPayload)					
			})
			.then(response => { //checks if user was found
				if (response.status == 200){
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
			.then(doneLoading => { //once job is finished, go to profile page
				if(doneLoading == true){
					this.props.history.push("/tutorProfile");					
				}				
			})
			.catch(error => console.log('parsing failed', error));
		}
		//end tutor post
	}

	render() {
		return (
			<article>
				
			<form onSubmit={this.handleFormSubmit}>

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

export default withRouter( connect(mapStateToProps, matchDispatchToProps)(SignInForm) );
