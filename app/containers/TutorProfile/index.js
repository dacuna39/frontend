/*
 * TutorProfile
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

import CenteredSection from './CenteredSection';
import ProfileForm from './ProfileForm';

import HeaderProfile from 'components/HeaderProfile';
import Button from 'components/Button';
import H1 from 'components/H1';
import Cap from 'components/Images/graduation-cap.png';

const BodyWrapper = styled.div`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class TutorProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
        
        <HeaderProfile />

        <BodyWrapper>
          <CenteredSection> 
            <br />
            <H1>Tutor Profile</H1>
            <img src={Cap} width="50px" height="50px" alt="Graduation Cap" />
            <h3> Edit your profile here to make yourself stand out and get more tutoring! </h3>
            <ProfileForm /> 

            <Button onClick={() => { // link to student's posts
								//if (this.state.isLoading == false){
									this.props.history.push("/tutorFeed");
								//}
								}}> Go To Feed </Button>
          </CenteredSection>
        </BodyWrapper>
      </article>
    );
  }
}

export default withRouter(TutorProfile);