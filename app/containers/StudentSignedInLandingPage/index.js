/**
 *
 * StudentSignedInLandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CenteredSection from './CenteredSection';
import Input from './Input';
import Section from './Section';
import styled from 'styled-components';

import HeaderFeed from 'components/HeaderFeed';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentSignedInLandingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Form from './Form';
import Img from './Img';
import graduationcap from './images/graduation-cap.png';
import CheckboxTableStyle from 'components/TableCheckbox/CheckboxTableStyle';
import TableStyle from 'components/Table/TableStyle';
import Table from './Table';
import Button from 'components/Button';
import H1 from 'components/H1';

const BodyWrapper = styled.div`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default class StudentSignedInLandingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
 shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
    <article>
    <Helmet>
    <title>Student Landing Page</title>
    <meta name="description" content="Description of Student Landing Page" />
    </Helmet>

    <HeaderFeed />

    <BodyWrapper>
    <Form onSubmit={this.handleSubmit}>

   {/* Page */}
   <CenteredSection>
     <H1>Avaiable Tutors</H1>
   </CenteredSection>

   <CenteredSection>
     <Img src={graduationcap} alt="graduation-cap"/>
   </CenteredSection>

   <CenteredSection>

        <CheckboxTableStyle>

         <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label htmlFor="classSubject">   Calculus </label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label htmlFor="classSubject">   Computer Science </label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label htmlFor="classSubject">   English </label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label htmlFor="classSubject">   Algebra</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label htmlFor="classSubject">   History</label>
            </th>
        </tr>
        <tr>
            <th><Button>Filter Subjects</Button></th>
        </tr>

        </CheckboxTableStyle>
        
   </CenteredSection>

  {/* end Page Title */}

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
