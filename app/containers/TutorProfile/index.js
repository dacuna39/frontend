/*
 * TutorProfile
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import CenteredSection from './CenteredSection';
import ProfileForm from './ProfileForm';

import H1 from 'components/H1';

export default class TutorProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {

    return (
      <article>
        <Helmet>
          <title>Tutor Profile</title>
          <meta name="Tutorfind" content="A web app to connect students and teachers for improved learning" />
        </Helmet>
        
        <div>
          <CenteredSection>  
            <H1>Tutor Profile</H1>
            <ProfileForm /> 
          </CenteredSection>
        </div>
      </article>
    );
  }
}
