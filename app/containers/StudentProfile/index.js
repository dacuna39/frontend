/*
 * StudentProfile
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import CenteredSection from './CenteredSection';
//import Input from './Input'; delete the file!
import messages from './messages';
import ProfileForm from './ProfileForm';

import H1 from 'components/H1';

export default class StudentProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {

    return (
      <article>
        <Helmet>
          <title>Student Profile</title>
          <meta name="Tutorfind" content="A web app to connect students and teachers for improved learning" />
        </Helmet>
        
        <div>
          <CenteredSection>  
            <H1>Student Profile</H1>
            <ProfileForm /> 
          </CenteredSection>
        </div>
      </article>
    );
  }
}
