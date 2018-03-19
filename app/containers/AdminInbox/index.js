/**
 *
 * AdminInbox
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
import makeSelectAdminInbox from './selectors';
import saga from './saga';
import messages from './messages';

import CenteredSection from './CenteredSection';
import Input from './Input';
import Section from './Section';
import injectReducer from 'utils/injectReducer';
import makeSelectTutorSendRequests from './selectors';
import reducer from './reducer';
import Wrapper from './Wrapper';
import Form from './Form';
import Img from './Img';
import graduationcap from './images/graduation-cap.png';
// import Table from 'components/Table';
import CheckboxTableStyle from 'components/TableCheckbox/CheckboxTableStyle';
import TableStyle from 'components/Table/TableStyle';
import H1 from 'components/H1';

export default class AdminInbox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
    <article>
    <Helmet>
    <title>Admin Inbox</title>
    <meta name="description" content="Description of Admin Inbox" />
    </Helmet>


    <div>
    <Form onSubmit={this.handleSubmit}>
    

   {/* Page */}
   <CenteredSection>
     <H1>Inbox</H1>
   </CenteredSection>

   <CenteredSection>
     <Img src={graduationcap} alt="graduation-cap"/>
   </CenteredSection>

   <CenteredSection>

        <CheckboxTableStyle>

         <tr>
            <th>
                <input type="radio" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">  Inbox</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="radio" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">  Sent</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="radio" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">  Deleted</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="radio" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">  Archived</label>
            </th>
        </tr>
        <tr>
            <th><button type="submit">Filter</button></th>
        </tr>

        </CheckboxTableStyle>
        
   </CenteredSection>

  {/* end Page Title */}

  {/*For every request - we need another centered section*/}
  <CenteredSection>
     <TableStyle>
             <tbody>
              <tr>
                <th><center><label>Name of User</label></center></th>
               </tr>
               <tr> 
                <th><center><label>Message</label></center></th>
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
