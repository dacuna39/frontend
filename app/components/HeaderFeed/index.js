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

class HeaderFeed extends React.Component { // eslint-disable-line react/prefer-stateless-function

	constructor(props) {
		super(props);
	}

	componentDidMount(){
		if (this.props.userId == 0 || this.props.userId == undefined){
			alert("You must be signed in to view this page!");
			this.props.history.push("/");
		}
	}

	redirectToProfile = () => {
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
			
			<table>
			<tbody>
				<TD>
				<Button onClick={this.redirectToProfile}> Edit Profile </Button>
				</TD>
				<TD>
				<Button href="/loggedOut"> Sign Out </Button>
				</TD>
			</tbody>
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
	}
}

export default withRouter( connect(mapStateToProps)(HeaderFeed) );
