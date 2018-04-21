import React from 'react';
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { BindActionCreators } from 'redux';
import { connect } from 'react-redux'

import Img from './Img';
import Wrapper from './Wrapper';
import Button from 'components/Button';
import CenteredSection from './CenteredSection';
import H1 from 'components/H1';
import AdminLogin from 'containers/AdminLogin';

import logo from './tutorfindlogo.png';

const TD = styled.td`
		padding: 0 .5em;
`;

class HeaderAdminLoggedIn extends React.Component { // eslint-disable-line react/prefer-stateless-function
	
	constructor(props) {
		super(props);

		this.redirectToFeed = this.redirectToFeed.bind(this);
	}

	componentDidMount(){
		if (this.props.userId == 0 || this.props.userId == undefined){
			alert("You must be signed in as admin to view this page!");
			this.props.history.push("/AdminLogin");
		}
	}

	redirectToFeed() {
			if (this.props.userType == "admin"){
					this.props.history.push("/AdminPosts");	
			} 
			else if (this.props.userType == "student"){
					this.props.history.push("/AdminLogin");	
			}
			else if (this.props.userType == "tutor"){
					this.props.history.push("/AdminLogin");	
			}
	}


  render() {
    return (
      <div>
		<Wrapper>
			{/* Logo */}
			<section>
					{/* <Img src={logo} onClick={this.props.history.push("/")} alt="Tutorfind - Logo" /> */}
					<Img src={logo} alt="Tutorfind - Logo" />
			</section>
			
			{/* Sign Out Button */}
			<section>
				<Button href="/AdminLogin"> Sign Out </Button>
			</section>
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

export default withRouter( connect(mapStateToProps)(HeaderAdminLoggedIn) );
