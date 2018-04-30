import React from 'react';
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { BindActionCreators } from 'redux';
import { connect } from 'react-redux'

import Img from './Img';
import Wrapper from './Wrapper';
import Button from 'components/Button';

import logo from './tutorfindlogo.png';

const TD = styled.td`
		padding: 0 .5em;
`;

class HeaderProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function

	constructor(props) {
		super(props);
	}

	componentDidMount(){
		if (this.props.userId == 0){ //on first sign up, userId will be undefined
			alert("You must be signed in to view this page!");
			this.props.history.push("/");
		}
	}

	redirectToFeed = () => {

		if (this.validateForm()) {

			if (this.props.userType == "admin") {
					this.props.history.push("/AdminPosts");
			}
			if (this.props.userType == "student"){
					this.props.history.push("/StudentFeed");	
			} 
			else if (this.props.userType == "tutor"){
					this.props.history.push("/tutorFeed");	
			}
		}
	}

	validateForm = () => {

		if(this.props.legalFirstName == '' || this.props.legalLastName == '' ||
			(this.props.major == "" && this.props.userType == "student") ||
			(this.props.degrees == "" && this.props.userType == "tutor") ||
			this.props.subjects.length == 0) {
				alert('Please save your information before continuing');
				return false;
		}
		return true;
	}

  render() {
    return (
      <div>
		<Wrapper>
			<section>
					<Img src={logo} alt="Tutorfind - Logo"/>
			</section>
			
			<table>
				<TD>
				<Button onClick={this.redirectToFeed}> Feed </Button>
				</TD>
				<TD>
				<Button href="/loggedOut"> Sign Out </Button>
				</TD>
			</table>
		</Wrapper> 
      </div>
    );
  }
}

function mapStateToProps(state) {
	return{
		userId: state.userId,
		userType: state.userType,

		legalFirstName: state.legalFirstName,
		legalLastName: state.legalLastName,

		major: state.major,
		degrees: state.degrees,

		subjects: state.subjects,
	}
}

export default withRouter( connect(mapStateToProps)(HeaderProfile));
