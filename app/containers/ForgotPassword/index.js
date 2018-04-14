/*
 * Forgot Password
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import CenteredSection from './CenteredSection';
import messages from './messages';
import Wrapper from './Wrapper';
import ForgotPasswordForm from './ForgotPasswordForm';

import Header from 'components/Header';
import H1 from 'components/H1';
  
export default class ForgotPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
		<Header />
      <div>
		    <Wrapper>
		      {/* Forgot Password Message */}
          <CenteredSection>
            <H1>
              Forgot Password?
            </H1>
            <p>
              <FormattedMessage {...messages.aboutMessage} />
            </p>
            <ForgotPasswordForm />
            <br />
            <p> <a href="/"> Click here </a> to return Home </p>
          </CenteredSection>
		      {/* end ForgotPassword */}
	  	  </Wrapper>	
      </div>
      </article>
    );
  }
}
