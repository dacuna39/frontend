import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'

import Img from './Img';
import Wrapper from './Wrapper';
import Button from 'components/Button';

import logo from './tutorfindlogo.png';

class HeaderAdminLoggedIn extends React.Component { // eslint-disable-line react/prefer-stateless-function
	
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		if (this.props.userId == 0 || this.props.userId == undefined){
			alert("You must be signed in as admin to view this page!");
			this.props.history.push("/AdminLogin");
		}
	}

	redirectToFeed = () => {
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
				<Button onClick={() => localStorage.clear()} href="/AdminLogin"> Sign Out </Button>
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
