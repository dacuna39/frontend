/**
 *
 * ResetPassword
 * 
 * The landing page for users when clicking the link in their email to reset their password
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import injectReducer from 'utils/injectReducer';
import makeSelectResetPassword from './selectors';
import reducer from './reducer';
import Section from './Section';
import CenteredSection from './CenteredSection';

import Header from 'components/Header';
import H1 from 'components/H1';

const BodyWrapper = styled.span`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default class ResetPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  	constructor(props) {
    super(props);
    
    

		this.state = {
			newPassword: ''
		};
  	}

  componentDidMount() {

    //gets current url and only saves the cookie string

    var uniqueURL = window.location.href;
    var uniqueKey = uniqueURL.replace('http://www.tutor-find.me/resetpassword/','');
    //var uniqueKey = uniqueURL.replace('http://localhost:3000/resetpassword/',''); for testing locally
    //console.log('uniqueKey', uniqueKey);

    fetch('https://tutor-find.herokuapp.com/forgotpassword/' + uniqueKey, {
		method: 'get',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',	
		}
	})
	.then(response => {
        if (response.status == 200){ //checks if link is valid
          //console.log('response', response)
        	return response.text();
      	} else {
        	return null;
      	}
    })
    .then( result => {
      	if (result != null){
			    //console.log(result);
			    this.setState({ newPassword: result });
      	}
    })
    .catch(error => console.log('parsing failed', error));
  }
  
  render() {
    return (
      <article>
        <Helmet>
          <title>ResetPassword</title>
          <meta name="description" content="Description of ResetPassword" />
        </Helmet>

        <Header />

        <BodyWrapper>
          <CenteredSection>
            <H1> Reset Password </H1>

            <p> Your new password is {this.state.newPassword}</p>
            <p> You can now log in with your new password. Go to your profile and scroll down to change password if you want to make your password your own again! </p>
          </CenteredSection>
          
        </BodyWrapper>
        
      </article>
    );
  }
}

/*
ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resetpassword: makeSelectResetPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'resetPassword', reducer });

export default compose(
  withReducer,
  withConnect,
)(ResetPassword);
*/
