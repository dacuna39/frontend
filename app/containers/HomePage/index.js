/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import Wrapper from './Wrapper';
import Modal from'./Modal';

import H2 from 'components/H2';
import H1 from 'components/H1';
import Button from 'components/Button';
import Toggle from 'components/Toggle';
import ToggleOption from 'components/ToggleOption';

const { array } = ["Student","Teacher"];
//functions (will probably remove)
  function ToggleModal(props) { //opens and closes the sign in modal
	const signUp = props.signUp;
		if (signUp) {
			return <SignUpModal />;
		} 
	return <SignInModal />;
  }
  
  function SignUpModal(props) { //The sign up modal
	return (
		<div>
		
		</div>
	);
  }
  
  function SignInModal(props) { //The sign in modal
	return (
		<div>
			hi
		</div>
	);
  }
//end functions
  
export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {

    return (
      <article>
        <Helmet>
          <title>TutorFind</title>
          <meta name="Tutorfind" content="A web app to connect students and teachers for improved learning" />
        </Helmet>
		
        <div>
		<Wrapper>
		
		  {/* About Us */}
          <CenteredSection>
            <H1>
              About Us
            </H1>
            <p>
              <FormattedMessage {...messages.aboutMessage} />
            </p>
          </CenteredSection>
		  {/* end About Us */}
		  
		  {/* Sign up */}
          <CenteredSection>
			<H1>
			  Sign Up
			</H1>
			
			{/* Form */}
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
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={this.props.email}
                  onChange={this.props.onChangeEmail}
                />
              </label>
			  </div>
			  
			  <div>
			  <label htmlFor="password">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={this.props.password}
                  onChange={this.props.onChangePassword}
                />
              </label>
			  </div>
			  
			  <div>
			  <label htmlFor="confirmPassword">
                <Input
                  id="password"
                  type="password"
                  placeholder="Confirm Password"
                  value={this.props.password}
                  onChange={this.props.onChangePassword}
                />
              </label>
			  </div>
			  
			  <div>
			    <p> I am a 
				<Toggle value="Student" values={array} />
					
				</p>
			  </div>
			  
			  <div>
				<Button> Sign Up </Button>
			  </div>
			  
			</Form>
			{/* end Form */}
			
		   </CenteredSection>  
		   {/* end Sign up */}
		   
		</Wrapper>	
        </div>
      </article>
    );
  }
}
