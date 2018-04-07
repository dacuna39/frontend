import React from 'react';
import { withRouter } from "react-router-dom";

import { BindActionCreators } from 'redux';
import { connect } from 'react-redux'

import Img from './Img';
import Wrapper from './Wrapper';
import Button from 'components/Button';

import logo from './tutorfindlogo.png';

class HeaderFeed extends React.Component { // eslint-disable-line react/prefer-stateless-function

	constructor(props) {
		super(props);

		this.redirectToProfile = this.redirectToProfile.bind(this);
	}

	redirectToProfile() {
			if (this.props.userType == "student"){
					this.props.history.push("/studentProfile");	
			} 
			else if (this.props.userType == "tutor"){
					this.props.history.push("/tutorProfile");	
			}
	}

  render() {
    return (
      <div>
		<Wrapper>
			<section>
					<Img src={logo} alt="Tutorfind - Logo"/>
			</section>
			
			<section>
				<Button onClick={this.redirectToProfile}> Edit Profile </Button>
				<Button href="/loggedOut"> Sign Out </Button>
			</section>
		</Wrapper> 
      </div>
    );
  }
}

function mapStateToProps(state) {
	return{
		userType: state.userType,
	}
}

export default withRouter( connect(mapStateToProps)(HeaderFeed));
