/*
 * HomePage
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { withRouter } from "react-router-dom";

import styled from 'styled-components';

import CenteredSection from './CenteredSection';
import messages from './messages';
import Wrapper from './Wrapper';
import SignInForm from './SignInForm';

import HeaderAdminLoggedOut from 'components/HeaderAdminLoggedOut';
import H1 from 'components/H1';

const BodyWrapper = styled.span`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;
  
export default class AdminLogin extends React.Component { // eslint-disable-line react/prefer-stateless-function

	constructor() {
    super();
  }

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Admin Login</title>
          <meta name="Tutorfind" content="A web app to connect students and tutors for improved learning" />
        </Helmet>
      
      <HeaderAdminLoggedOut />
		
      <BodyWrapper>

		    <Wrapper>
		      {/* Sign up */}
          <CenteredSection>
			      <H1> Sign In </H1>
            <SignInForm /> 
		      </CenteredSection>
		      {/* end Sign In */}
	  	  </Wrapper>	
        
      </BodyWrapper>
      </article>
    );
  }
}
