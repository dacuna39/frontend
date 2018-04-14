/*
 * Logged Out
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import CenteredSection from './CenteredSection';
import messages from './messages';
import Wrapper from './Wrapper';
import Header from 'components/Header';

import H1 from 'components/H1';
  
export default class LoggedOut extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
		      {/* Logged Out Message */}
          <CenteredSection>
            <H1>
              Logged Out!
            </H1>
            <p>
              <FormattedMessage {...messages.aboutMessage} />
            </p>
            <p> <a href="/"> Click here </a> to return Home </p>
          </CenteredSection>
		      {/* end Logged out */}
	  	  </Wrapper>	
      </div>
      </article>
    );
  }
}
