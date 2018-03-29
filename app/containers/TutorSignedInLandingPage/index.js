/**
 *
 * TutorSignedInLandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

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
// import Table from 'components/Table';
import CheckboxTableStyle from 'components/TableCheckbox/CheckboxTableStyle';
import TableStyle from 'components/Table/TableStyle';
import Button from 'components/Button';

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

export default class TutorSignedInLandingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
    constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';

		this.state = {
            rate: '',
            unit: '',
            acceptsGroupTutoring: false,
            
        };
    }

 shouldComponentUpdate() {
    return false;
  }

  render() {

    return (
    <article>
    <Helmet>
    <title>Tutor Landing Page</title>
    <meta name="description" content="Description of Tutor Landing Page" />
    </Helmet>

    <HeaderSignedIn />

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

        <CheckboxTableStyle>

         <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">   Subject 1</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">   Subject 2</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">   Subject 3</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">   Subject 4</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">   Subject 5</label>
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
     <TableStyle>
             <tbody>
              <tr>
                <th><center><label>Student Post Name</label></center></th>
               </tr>
               <tr> 
                <th><center><label>Student Post Rate</label></center></th>
              </tr>
              <tr>
                <th><label>Student Post Desired Subject</label></th>
              </tr>
              <tr>
                <th><label>Student Post Description</label></th>
              </tr>
              <tr>
                <th><label>Willing to tutor groups?</label></th>
              </tr>
               <tr>
            <th><Button>Apply</Button></th>
        </tr>
            </tbody>
     </TableStyle>
  </CenteredSection>


  </Form>
  </BodyWrapper>
  </article>
  );
}
}
