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
import { createStore } from 'redux';
import { Provider } from 'react-redux';

/**import containers*/
import HomePage from 'containers/HomePage/Loadable';
import StudentProfile from 'containers/StudentProfile/Loadable';
import TutorProfile from 'containers/TutorProfile/Loadable';
import AdminFeed from 'containers/AdminFeed/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AdminPosts from 'containers/AdminPosts/Loadable';
import StudentSignedInLandingPage from 'containers/StudentSignedInLandingPage/Loadable';
import ArchivedPosts from 'containers/ArchivedPosts/Loadable';
import AdminInbox from 'containers/AdminInbox/Loadable';
import TutorSignedInLandingPage from 'containers/TutorSignedInLandingPage/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import LoggedOut from 'containers/LoggedOut/Loadable';
import StudentPosts from 'containers/StudentPosts/Loadable';
import TutorPosts from 'containers/TutorPosts/Loadable';
/**import containers end*/

/**import component*/
import Footer from 'components/Footer';
/**import component end*/

import userReducer from './userReducer';

const AppWrapper = styled.div`
  min-width: calc((1200px + 16px * 2) * .55);
`;

var store = createStore(userReducer);

export default function App() {

  return (
    <Provider store={store}>
    <AppWrapper>
      <Helmet titleTemplate="" defaultTitle="TutorFind">
        <meta name="description" content="A web app to connect students and teachers for improved learning" />
      </Helmet>
    
      <Switch>
        <Route exact path="/" component={HomePage} />
    <Route path="/StudentProfile" component={StudentProfile} />
    <Route path="/TutorProfile" component={TutorProfile} />
    <Route path="/AdminFeed" component={AdminFeed} />
    <Route path="/AdminPosts" component={AdminPosts} />
    <Route path="/StudentSignedInLandingPage" component={StudentSignedInLandingPage} />
    <Route path="/ArchivedPosts" component={ArchivedPosts} />
    <Route path="/AdminInbox" component={AdminInbox} />
    <Route path="/AdminPosts" component={AdminPosts} />
    <Route path="/TutorSignedInLandingPage" component={TutorSignedInLandingPage} />
    <Route path="/ForgotPassword" component={ForgotPassword} />
    <Route path="/LoggedOut" component={LoggedOut} />
    <Route path="/StudentPosts" component={StudentPosts} />
    <Route path="/TutorPosts" component={TutorPosts} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    
      <Footer />
    
    </AppWrapper>
    </Provider>
  );
}