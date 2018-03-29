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

import styled from 'styled-components';
import HeaderSignedIn from 'components/HeaderSignedIn';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentSignedInLandingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const BodyWrapper = styled.div`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export class StudentSignedInLandingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>StudentSignedInLandingPage</title>
          <meta name="description" content="Description of StudentSignedInLandingPage" />
        </Helmet>
        <HeaderSignedIn />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

StudentSignedInLandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentsignedinlandingpage: makeSelectStudentSignedInLandingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'studentSignedInLandingPage', reducer });
const withSaga = injectSaga({ key: 'studentSignedInLandingPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentSignedInLandingPage);
