/**
 *
 * AdminFeed
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from "react-router-dom";
import injectSaga from 'utils/injectSaga';
import makeSelectAdminInbox from './selectors';
import saga from './saga';
import messages from './messages';
import styled from 'styled-components';
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
import Table from './Table';
import HeaderAdminLoggedIn from 'components/HeaderAdminLoggedIn';
import Button from 'components/Button';

const BodyWrapper = styled.div`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export class AdminFeed extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
    this.link = 'https://tutor-find.herokuapp.com';

    this.state = {
      students : [],
      tutors : [],

      isOpen: false, //whether the sign in modal is rendered
      isLoading: true,    
    };
  }

  toggleModal = () => { //opens and closes the sign in modal
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  componentDidMount(){
      this.fetchStudents();
      this.fetchTutors();
  }

fetchStudents = () => {
  var allStudents = [];

    fetch(this.link + '/students', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
      }
    })
    .then(response => response.json())
    .then(students => {
      for (var i =0; i < students.length; i++){
        if (students.length <= 30){// loads the 30 most recent posts
          allStudents.push(students[i]);
        }
      }

      this.setState({ students: allStudents });
    })
    .catch(error => console.log('parsing failed', error));

    this.setState({ isLoading: false });
}

fetchTutors = () => {
  var allTutors = [];

  fetch(this.link + '/tutors', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(tutors => {
    for (var i=0; i < tutors.length; i++){
      if (tutors.length <= 30) {
        allTutors.push(tutors[i]);
      }
    }
    this.setState({ tutors: allTutors });
  })
  .catch(error => console.log('parsing failed', error));
  this.setState({ isLoading: false });
}

createStudentsTable = () => {

    if (this.state != null && this.state.students != null){
      
      console.log(this.state.students);
      console.log("createStudentTable:this.state.students");
      if (this.state.students.length != 0){
        return this.state.students.map((student) => { 
          return (
            <div key={student.userId}>
                <p> 
                {"User Id: " + student.userId}<br />
                {"Name: " + student.legalFirstName + " "}
                {student.legalLastName + " "}<br />
                {"Type: " + student.userType + " "} 
                <Button type="submit" onClick={() => {if(confirm('Make Inactive?')){this.deleteStudent(student)}}}> Make Inactive </Button> 
                <Button type="submit" onClick={() => {if(confirm('Make Admin?')){this.makeStudentAdmin(student)}}}> Make Admin </Button>          
              <br /></p>
            </div>
          );
        });
      }
      else {
        return(
          <div>
            <br />
            <h3> Could not load any posts! </h3>
            <br />
          </div>
        );
      }
      
    }//end check if state is null
  }

  createTutorsTable = () => {

    if (this.state != null && this.state.tutors != null){
      
      console.log(this.state.tutors);
      console.log("createStudentTable:this.state.tutors");
      if (this.state.tutors.length != 0){
        return this.state.tutors.map((tutor) => { 
          return (
            <div key={tutor.userId}>
                <p> 
                {"User Id: " + tutor.userId}<br />
                {"Name: " + tutor.legalFirstName + " "}
                {tutor.legalLastName + " "}<br />
                {"Type: " + tutor.userType + " "} 
                <Button type="submit" onClick={() => {if(confirm('Make Inactive?')){this.deleteTutor(tutor)}}}> Make Inactive </Button> 
                <Button type="submit" onClick={() => {if(confirm('Make Admin?')){this.makeTutorAdmin(tutor)}}}> Make Admin </Button>          
              <br /></p>
            </div>
          );
        });
      }
      else {
        return(
          <div>
            <br />
            <h3> Could not load any posts! </h3>
            <br />
          </div>
        );
      }
      
    }//end check if state is null
  }

deleteStudent = (student) => {

    fetch(this.link + "/students/" + student.userId, { //post profile updates to database :)
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(student)          
    })

    .then(response => { //checks if post was successful
      if (response.status == 200){
        console.log('student: ' + JSON.stringify(student));
        alert("Deleted!");
        this.componentDidMount();
      } else {
        alert("An error occurred, please try again later");
        console.log('formPayload: ' + JSON.stringify(formPayload));
      }
    })
    .catch(error => console.log('parsing failed', error))
  }

deleteTutor = (tutor) => {

    fetch(this.link + "/tutors/" + tutor.userId, { //post profile updates to database :)
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(tutor)          
    })
    .then(response => { //checks if post was successful
      if (response.status == 200){
        console.log('tutor: ' + JSON.stringify(tutor));
        alert("Deleted!");
        this.componentDidMount();
      } else {
        alert("An error occurred, please try again later");
        console.log('formPayload: ' + JSON.stringify(formPayload));
      }
    })
    .catch(error => console.log('parsing failed', error))
  }

makeStudentAdmin = (student) => {

      const payload = {
        userId: student.userId,
        userType: "admin",
      }

      fetch(this.link + "/admin/updateUserType/" + student.userId, { //post profile updates to database :)
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload)          
      })
      .then(response => { //checks if post was successful
        if (response.status == 200){
          console.log('student: ' + JSON.stringify(student));
          alert("Making this student an Admin!");
          this.componentDidMount();
        } else {
          alert("An error occurred, please try again later");
          console.log('formPayload: ' + JSON.stringify(formPayload));
        }
      })
      .catch(error => console.log('parsing failed', error))
}

makeTutorAdmin = (tutor) => {
  tutor.active = false;

      fetch(this.link + "/admin/updateUserType/" + tutor.userId, { //post profile updates to database :)
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(tutor)          
      })
      .then(response => { //checks if post was successful
        if (response.status == 200){
          console.log('tutor: ' + JSON.stringify(tutor));
          alert("Making this tutor an admin!");
          this.componentDidMount();
        } else {
          alert("An error occurred, please try again later");
          console.log('formPayload: ' + JSON.stringify(formPayload));
        }
      })
      .catch(error => console.log('parsing failed', error))
}

  render() {
    if (this.state != null){
    return (
    <div>
      <Helmet>
      <title>Admin User Feed</title>
      <meta name="description" content="Description of Admin Feed" />
      </Helmet>
       <HeaderAdminLoggedIn />

   <CenteredSection>
      <Button onClick={() => { // link to admin user posts
            if (this.state.isLoading == false){
              this.props.history.push("/AdminPosts");
            }
          }}> Users Posts </Button>
          {/* end link to user posts */}
     <H1>Users</H1>
   </CenteredSection>

   <CenteredSection>
     <Img src={graduationcap} alt="graduation-cap"/>
    {this.createStudentsTable()}
  </CenteredSection>

  <CenteredSection>
    {this.createTutorsTable()}
  </CenteredSection>
    

  </div>
    );
  }
    else {
      return (
        <div>
              <Helmet>
                <title> AdminFeed </title>
                  <meta name="description" content="Description of AdminFeed" />
              </Helmet>
          <HeaderAdminLoggedIn />
          <CenteredSection>
            <br /> <H1> Loading... </H1> <br />
          </CenteredSection>
        </div>
      );
  }}
}

function mapStateToProps(state) {

  return{
      legalFirstName: state.legalFirstName,
    legalLastName: state.legalLastName,
    bio: state.bio,
    degrees: state.degrees,
  }

}

export default withRouter( connect(mapStateToProps)(AdminFeed) );
