/*
 * TutorProfile
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import CenteredSection from './CenteredSection';
import ProfileForm from './ProfileForm';

import HeaderSignedIn from 'components/HeaderSignedIn';
import H1 from 'components/H1';

const BodyWrapper = styled.div`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

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
        
        <HeaderSignedIn />

        <BodyWrapper>
          <CenteredSection>  
            <H1>Tutor Profile</H1>
            <ProfileForm /> 
          </CenteredSection>
        </BodyWrapper>
      </article>
    );
  }
}
