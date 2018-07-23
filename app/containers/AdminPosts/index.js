/**
 *
 * Admin Posts
 *
 */

import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

import HeaderAdminLoggedIn from 'components/HeaderAdminLoggedIn';
import Button from 'components/Button';
import H1 from 'components/H1';
//import CheckboxTableStyle from 'components/TableCheckbox/CheckboxTableStyle';
//import TableStyle from 'components/Table/TableStyle';

import CenteredSection from './CenteredSection';

const BodyWrapper = styled.div`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const Post = styled.div`
  border: 2px solid;
  border-color: FFB71C;
  width: 100%;
  height: 100%;
  background: #EEECE9;
  text-align: center;
  padding: 2em;
`;

export class AdminPosts extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.link = 'https://tutor-find.herokuapp.com';

      this.state = {
        posts : [],
        printPosts: [],

        isOpen: false, //whether the sign in modal is rendered
        isLoading: true,    
    };
  }

  componentDidMount(){
    var allPosts = [];
    var allStudents =[];
    var allTutors =[];
    var userInfo = [];
    var postsReady = false;

    fetch(this.link + '/posts', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
      }
    })
    
    .then(response => response.json())
    .then(posts => {

      for (var i =0; i < posts.length; i++){
        if (posts.length <= 100){// loads the 100 most recent posts, can change to load all
          allPosts.push(posts[i]);
        }
        else {
          break;
        }
      }
      this.setState({ posts: allPosts, isLoading: false }, () => this.createPostsTable());
    })
    .catch(error => console.log('parsing failed', error));
  }

  getAllPosts = () => {
    var allPosts = [];
    var allStudents =[];
    var allTutors=[];

    fetch(this.link + '/posts', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
      }
    })
    .then(response => response.json())
    .then(posts => {
      for (var i =0; i < posts.length; i++){
        if (posts.length <= 100){ // loads the 100 most recent posts, can change to load all
          allPosts.push(posts[i]);
        }
      }

      this.setState({ posts: allPosts });
    })
    .catch(error => console.log('parsing failed', error));
    this.setState({isLoading: false});
  }

  deletePost = (post) => {
    
    post.active = false;

    fetch(this.link + "/posts/" + post.postId, { //post profile updates to database :)
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(post)          
    })
    .then(response => { //checks if post was successful
      if (response.status == 200){
        console.log('post: ' + JSON.stringify(post));
        alert("Deleted!");
        this.getAllPosts();
      } else {
        alert("An error occurred, please try again later");
        console.log('formPayload: ' + JSON.stringify(formPayload));
      }
    })
    .catch(error => console.log('parsing failed', error))
  }

 createPostsTable = () => {
  var returnPosts =[];

     if (this.state != null && this.state.isLoading == false){
      
      if (this.state.posts.length != 0){
        return this.state.posts.map((post) => { 

          //ensures that no glitcy posts crash the app :)
          if(post.postId != null && post.posterType != null && post.subject != null && post.location != null && post.availability != null
            && post.rate != null && post.unit != null) {
/*
            if (posterType="student") {
              fetch(this.link + '/students/' + post.ownerId, {
                method: 'get',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json', 
                }
              })
              .then(response => {
                if (response.status == 200){ //checks if user was found
                  return response.json();
                } else {
                  return null;
                }
              })
              .then(student => {
                console.log(student);
                if (student != null && student != undefined){
                  var avail = "";
                  for (var i =0; i < post.availability.length; i++){
                    if (post.availability.charAt(i).match(/[a-zA-Z]/)){
                      avail += post.availability.charAt(i);
                    } else if (post.availability.charAt(i).match(/[,]/)){
                      avail += " | ";
                    } else {
                      avail += " ";
                    }
                  }
                  returnPosts.push (
                    <div key={post.postId}>
                     <Post>
                        <p> Name: {student.legalFirstName}</p>
                        <p> User Type: {post.posterType} &nbsp;&nbsp; Post Id: {post.postId} </p>
                        <p> Subject: {post.subject} </p>
                        <p> Location: {post.location} </p>
                        <p> Availabilities: {avail} </p>
                        <p> Rate: {post.rate} {post.unit} </p>
                        <Button type="submit" onClick={() => {if(confirm('Delete this post?')){this.deletePost(post)}}}> Delete </Button>
                      </Post>             
                      <br />
                     </div>
                    );
                }
                  this.setState({printPosts: returnPosts});
              }
              else {
                console.log("null student");
                })
              this.setState({postsReady: true});

            } else if (posterType = 'tutor'){
                fetch(this.link + '/tutors/' + post.ownerId, {
                method: 'get',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json', 
                }
              })
              .then(response => {
                if (response.status == 200){ //checks if user was found
                  return response.json();
                } else {
                  return null;
                }
              })
              .then(tutor => {
                console.log(tutor);
                if (tutor != null && tutor != undefined){
                  var avail = "";
                  for (var i =0; i < post.availability.length; i++){
                    if (post.availability.charAt(i).match(/[a-zA-Z]/)){
                      avail += post.availability.charAt(i);
                    } else if (post.availability.charAt(i).match(/[,]/)){
                      avail += " | ";
                    } else {
                      avail += " ";
                    }
                  }
                  returnPosts.push (
                    <div key={post.postId}>
                     <Post>
                        <p> Name: {tutor.legalFirstName}</p>
                        <p> User Type: {post.posterType} &nbsp;&nbsp; Post Id: {post.postId} </p>
                        <p> Subject: {post.subject} </p>
                        <p> Location: {post.location} </p>
                        <p> Availabilities: {avail} </p>
                        <p> Rate: {post.rate} {post.unit} </p>
                        <Button type="submit" onClick={() => {if(confirm('Delete this post?')){this.deletePost(post)}}}> Delete </Button>
                      </Post>             
                      <br />
                     </div>
                    );
                  }
                  this.setState({printPosts: returnPosts});
              }
              else {
                console.log("null tutor");
              })
              this.setState({postsReady: true});
            }
            */
              //print out availiability neatly without special characters
              var avail = "";
              for (var i =0; i < post.availability.length; i++){
                if (post.availability.charAt(i).match(/[a-zA-Z]/)){
                  avail += post.availability.charAt(i);
                } else if (post.availability.charAt(i).match(/[,]/)){
                  avail += " | ";
                } else {
                  avail += " ";
                }
              }

              return (
                <div key={post.postId}>
                  <Post>

                    <p> User Type: {post.posterType} &nbsp;&nbsp; Post Id: {post.postId} </p>
                    <p> Subject: {post.subject} </p>
                    <p> Location: {post.location} </p>
                    <p> Availabilities: {avail} </p>
                    <p> Rate: {post.rate} {post.unit} </p>
                    <Button type="submit" onClick={() => {if(confirm('Delete this post?')){this.deletePost(post)}}}> Delete </Button>
                  </Post>             
                  <br />
                </div>
              );
          }
        }); //end posts.map
        
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

  printPosts = () => {
    if (this.state.postsReady == true){
      return this.state.printPosts;
    } else {
      return(
        <div>
          <br />
          <h3> Could not load any posts! </h3>
          <br />
        </div>
      );
    }
  }
  
    render() {
    
    if (this.state != null){
      return (
      <div>
          <Helmet>
            <title> Admin Posts </title>
            <meta name="description" content="Description of Admin posts" />
          </Helmet>
    
      <HeaderAdminLoggedIn />

      <BodyWrapper>
        <CenteredSection>

          {/* link to user list */}
          <Button onClick={() => { // link to admin user feed
            if (this.state.isLoading == false){
              this.props.history.push("/AdminFeed");
            }
          }}> User Lists </Button>
          {/* end link to user list */}

          
          <H1> All Posts </H1>
          <br /><br />

          {/* Load posts */}
          {this.createPostsTable()}
        
        </CenteredSection>
      </BodyWrapper>
        </div>
      );
    }
    else {
    return (
      <div>
            <Helmet>
              <title> Admin Feed </title>
                <meta name="description" content="Description of Admin Feed" />
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
    major: state.major,
  }
}

export default withRouter( connect(mapStateToProps)(AdminPosts) );
