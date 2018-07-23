/*
 * HomePage
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
//import { withRouter } from "react-router-dom";

import styled from 'styled-components';

import CenteredSection from './CenteredSection';
import messages from './messages';
import Wrapper from './Wrapper';
import SignUpForm from './SignUpForm';

import Header from 'components/Header';
import H1 from 'components/H1';

const BodyWrapper = styled.span`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;
  
export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <article>
        <Helmet>
          <title>TutorFind</title>
          <meta name="Tutorfind" content="A web app to connect students and tutors for improved learning" />
        </Helmet>
      
      <Header />
		
      <BodyWrapper>

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
			      <H1> Sign Up </H1>
            <SignUpForm /> 
		      </CenteredSection>
		      {/* end Sign up */}
	  	  </Wrapper>	
        
      </BodyWrapper>
      </article>
    );
  }
}
