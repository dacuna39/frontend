import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import A from './A';
import Img from './Img';
import HeaderLink from './HeaderLink';
import logo from './tutorfindlogo.png';
import messages from './messages';
import Wrapper from './Wrapper';
import Button from 'components/Button';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import H1 from 'components/H1';
import Modal from './Modal'

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
			<section>
				<A href="/">
					<Img src={logo} alt="Tutorfind - Logo" />
				</A>
			</section>
			<section>
				<Button onClick={this.toggleModal}> Sign In </Button>
			</section>
		</Wrapper> 
		
		<CenteredSection>
			<Modal show={this.state.isOpen}
					onClose={this.toggleModal}>
					
					<H1>
					  Sign In
					</H1>
					
					{/*Form*/}
					<Form onSubmit={this.props.onSubmitForm}>
					  <div>
						<label htmlFor="username">
						  <Input
							id="username"
							type="text"
							placeholder="User Name"
							value={this.props.username}
							onChange={this.props.onChangeUsername}
						  />
						</label>
					  </div>
			  
					  <div>
						<label htmlFor="email">
						  <Input
							id="password"
							type="password"
							placeholder="********"
							value={this.props.password}
							onChange={this.props.password}
						  />
						</label>
					  </div>
					</Form>
					{/*end Form*/}	

					<Button>
						Sign In
					</Button>
			</Modal>
		</CenteredSection>
      </div>
    );
  }
}

export default Header;
