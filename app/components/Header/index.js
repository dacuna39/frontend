import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BindActionCreators } from 'redux';
import { connect } from 'react-redux'

import A from './A';
import Img from './Img';
import messages from './messages';
import Wrapper from './Wrapper';
import Button from 'components/Button';
import CenteredSection from './CenteredSection';
import H1 from 'components/H1';
import Modal from './Modal'
import SignInForm from './SignInForm';

import logo from './tutorfindlogo.png';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
	
	constructor(props) {
    super(props);
    this.state = { isOpen: false };  //whether the sign in modal is rendered
  }

	toggleModal = () => { //opens and closes the sign in modal
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
		<Wrapper>
			{/* Logo */}
			<section>
				<A href="/">
					<Img src={logo} alt="Tutorfind - Logo" />
				</A>
			</section>
			
			{/* Sign In Button */}
			<section>
				<Button onClick={this.toggleModal}> Sign In </Button>
			</section>
		</Wrapper> 
		
		{/* Modal for Signing In (popup) */}
		<CenteredSection>
			<Modal show={this.state.isOpen}
					onClose={this.toggleModal}>
					<H1> Sign In </H1>
					<SignInForm />
					<p><a href="./ForgotPassword"> I forgot my password </a></p>
			</Modal>
		</CenteredSection>
      </div>
    );
  }
}

/*
function mapStateToProps(state) {
	return{
		userId: store.userId,
		userName: store.userName,
		email: store.email,
		password: store.password,
		salt: store.salt,
		userType: store.userType,

		legalFirstName: store.legalFirstName,
		legalLastName: store.legalLastName,
		bio: store.bio,
		img: store.img,
		active: store.active,

		major: store.major, //student props
		minor: store.minor,
		creationDate: store.creationDate,

		degrees: store.degrees, //tutor props
		links: store.links,
		timestamp: store.timestamp,
		ratings: store.ratings,
	}
}
*/

export default Header;
