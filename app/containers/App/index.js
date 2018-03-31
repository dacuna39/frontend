/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

/**import containers*/
import HomePage from 'containers/HomePage/Loadable';
import StudentProfile from 'containers/StudentProfile/Loadable';
import StudentFeed from 'containers/StudentFeed/Loadable';
import TutorProfile from 'containers/TutorProfile/Loadable';
import TutorFeed from 'containers/TutorFeed/Loadable';
import AdminFeed from 'containers/AdminFeed/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import TutorSendRequests from 'containers/TutorSendRequests/Loadable';
import AdminPosts from 'containers/AdminPosts/Loadable';
import StudentSignedInLandingPage from 'containers/StudentSignedInLandingPage/Loadable';
import ArchivedPosts from 'containers/ArchivedPosts/Loadable';
import AdminInbox from 'containers/AdminInbox/Loadable';
import TutorSignedInLandingPage from 'containers/TutorSignedInLandingPage/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import LoggedOut from 'containers/LoggedOut/Loadable';
/**import containers end*/

/**import component*/
import Footer from 'components/Footer';
import Header from 'components/Header';
import HeaderSignedIn from 'components/HeaderSignedIn';
/**import component end*/

const AppWrapper = styled.div`
  min-width: calc((1200px + 16px * 2) * .55);
`;

//load header
function LoggedOutNav(props) {
		return <Header />;
	}
	
function LoggedInNav(props) {
	return <HeaderSignedIn />;
}

function NavLoad(props){
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
		return <LoggedInNav />;
	} 
	return <LoggedOutNav />;
}
//end load header

export default function App() {

  return (
    <AppWrapper>
      <Helmet titleTemplate="" defaultTitle="TutorFind">
        <meta name="description" content="A web app to connect students and teachers for improved learning" />
      </Helmet>
	  
      {/* <NavLoad isLoggedIn={false} />  loads the appropriate header (signed in/out)*/}
	  
      <Switch>
        <Route exact path="/" component={HomePage} />
		<Route path="/StudentProfile" component={StudentProfile} />
		<Route path="/StudentFeed" component={StudentFeed} />
		<Route path="/TutorProfile" component={TutorProfile} />
		<Route path="/TutorFeed" component={TutorFeed} />
		<Route path="/AdminFeed" component={AdminFeed} />
    <Route path="/TutorSendRequests" component={TutorSendRequests} />
    <Route path="/AdminPosts" component={AdminPosts} />
    <Route path="/StudentSignedInLandingPage" component={StudentSignedInLandingPage} />
    <Route path="/ArchivedPosts" component={ArchivedPosts} />
    <Route path="/AdminInbox" component={AdminInbox} />
    <Route path="/AdminPosts" component={AdminPosts} />
    <Route path="/TutorSignedInLandingPage" component={TutorSignedInLandingPage} />
    <Route path="/ForgotPassword" component={ForgotPassword} />
    <Route path="/LoggedOut" component={LoggedOut} />
        <Route path="" component={NotFoundPage} />
      </Switch>
	  
      <Footer />
    </AppWrapper>
  );
}
