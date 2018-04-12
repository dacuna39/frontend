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

		this.redirectToFeed = this.redirectToFeed.bind(this);
	}

	redirectToFeed() {
			if (this.props.userType == "student"){
					this.props.history.push("/studentSignedInLandingPage");	
			} 
			else if (this.props.userType == "tutor"){
					this.props.history.push("/tutorSignedInLandingPage");	
			}
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
		userType: state.userType,
	}
}

export default withRouter( connect(mapStateToProps)(HeaderProfile));
