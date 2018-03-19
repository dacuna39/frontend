/**
 *
 * AdminPosts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAdminPosts from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import CenteredSection from './CenteredSection';
import Input from './Input';
import Section from './Section';
import makeSelectTutorSendRequests from './selectors';
import Wrapper from './Wrapper';
import Form from './Form';
import Img from './Img';
import graduationcap from './images/graduation-cap.png';
// import Table from 'components/Table';
import CheckboxTableStyle from 'components/TableCheckbox/CheckboxTableStyle';
import TableStyle from 'components/Table/TableStyle';
import H1 from 'components/H1';
import Button from 'components/Button';


export default class AdminPosts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
    <article>
    <Helmet>
    <title>Admin Posts</title>
    <meta name="description" content="Description of Admin Posts" />
    </Helmet>


    <div>
    <Form onSubmit={this.handleSubmit}>
    

   {/* Page */}
   <CenteredSection>
     <H1>All Active Posts</H1>
   </CenteredSection>

   <CenteredSection>
     <Img src={graduationcap} alt="graduation-cap"/>
   </CenteredSection>

   <CenteredSection>

        <CheckboxTableStyle>

         <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">  Mathematics</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">  English</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">  Computer Science</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">  Chemistry</label>
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
            <th><Button>Manage Post</Button></th>
        </tr>
            </tbody>
     </TableStyle>
  </CenteredSection>


  </Form>
  </div>
  </article>
  );
  }
}