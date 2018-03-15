/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import Wrapper from './Wrapper';
import Modal from './Modal';
import Select from './Select';
import SignUpForm from './SignUpForm';

import A from 'components/A';
import H2 from 'components/H2';
import H1 from 'components/H1';
import Button from 'components/Button';
import Toggle from 'components/Toggle';
import ToggleOption from 'components/ToggleOption';

/*
function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}
*/
  
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
