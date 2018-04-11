/**
 *
 * TutorSignedInLandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
//import withRouter from "react-router-dom";

import styled from 'styled-components';

import CenteredSection from './CenteredSection';
import Input from './Input';
import Section from './Section';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTutorSignedInLandingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Wrapper from './Wrapper';
import Form from './Form';
import Img from './Img';
import graduationcap from './images/graduation-cap.png';
import TableStyle from 'components/Table/TableStyle';
import Table from './Table';
import Button from 'components/Button';
import H1 from 'components/H1';
import SubjectFilter from './SubjectFilter';

import HeaderFeed from 'components/HeaderFeed';
import Modal from './Modal';
import NewPostForm from './NewPostForm';

const BodyWrapper = styled.div`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class TutorSignedInLandingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false,
      isLoading: true,
  };  //whether the sign in modal is rendered
  }

  toggleModal = () => { //opens and closes the sign in modal
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount(){
    this.setState({ isLoading: false });
  }

  render() {
    return (
    <article>
    <Helmet>
    <title>Tutor Landing Page</title>
    <meta name="description" content="Description of Tutor Landing Page" />
    </Helmet>

    <HeaderFeed />

    <BodyWrapper>

    <Form onSubmit={this.handleSubmit}>

   {/* Page */}
   <CenteredSection>
     <H1>Student Listings</H1>
   </CenteredSection>

   <CenteredSection>
     <Img src={graduationcap} alt="graduation-cap"/>
   </CenteredSection>

   <CenteredSection>
      <SubjectFilter />        
   </CenteredSection>

  {/* end Page Title */}

      <CenteredSection>

        {/* make a new post */}
        <Button onClick={this.toggleModal}> New Post </Button>

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
            <H1> New Post </H1>
            <NewPostForm />
        </Modal>
        {/* end make new post */}
      
        {/* link to studentPost */}
        <Button onClick={() => { // link to student's posts
            if (this.state.isLoading == false){
                this.props.history.push("/tutorPosts");
            }
        }}> My Posts </Button>
        {/* end link to studentPost */}

      </CenteredSection>

  {/*For every request - we need another centered section*/}
  <CenteredSection>
     <Table />
  </CenteredSection>

  </Form>
  </BodyWrapper>
  </article>
  );
}
}

//export default withRouter(TutorSignedInLandingPage);
export default TutorSignedInLandingPage;