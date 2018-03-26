/*
 * HomePage
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import CenteredSection from './CenteredSection';
import messages from './messages';
import Wrapper from './Wrapper';
import SignUpForm from './SignUpForm';

import H1 from 'components/H1';
  
export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
          <title>TutorFind</title>
          <meta name="Tutorfind" content="A web app to connect students and tutors for improved learning" />
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
			      <H1> Sign Up </H1>
            <SignUpForm /> 
		      </CenteredSection>
		      {/* end Sign up */}
	  	  </Wrapper>	
      </div>
      </article>
    );
  }
}
