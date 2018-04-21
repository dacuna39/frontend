/**
 *
 * Admin Posts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

import HeaderAdminLoggedIn from 'components/HeaderAdminLoggedIn';
import Button from 'components/Button';
import H1 from 'components/H1';
import CheckboxTableStyle from 'components/TableCheckbox/CheckboxTableStyle';
//import TableStyle from 'components/Table/TableStyle';

import CenteredSection from './CenteredSection';
import Img from './Img';


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

    this.componentDidMount = this.componentDidMount.bind(this); 
    this.createPostsTable = this.createPostsTable.bind(this);
  }

  componentDidMount(){

    var allPosts = [];

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
        if (posts.length <= 60){// loads the 30 most recent posts
          allPosts.push(posts[i]);
        }
      }

      this.setState({ posts: allPosts });
    })
    .catch(error => console.log('parsing failed', error));

    this.setState({ isLoading: false });
  }

  getAllPosts(){
    var allPosts = [];

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
        if (posts.length <= 60){
          allPosts.push(posts[i]);
        }
      }

      this.setState({ posts: allPosts });
    })
    .catch(error => console.log('parsing failed', error));
    this.setState({isLoading: false});
  }

  deletePost(post){
    
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

  createPostsTable(){

    if (this.state != null && this.state.isLoading == false){
      
      if (this.state.posts.length != 0){
        return this.state.posts.map((post) => { 

          //ensures that no glitcy posts crash the app :)
          if(post.postId != null && post.posterType != null && post.subject != null && post.location != null && post.availability != null
            && post.rate != null && post.unit != null) {

              //get students information
              fetch(this.link + '/students/' + post.ownerId, {
                method: 'get',
                header: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json', 
                }
              })
              .then(response => {
                  if (response.status == 200) {
                    return response.json();
                  }
                  else {
                    return null;
                  }
              })

              //get tutors information
              fetch(this.link + '/tutors/' + post.ownerId, {
                method: 'get',
                header: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json', 
                }
              })
              .then(response => {
                  if (response.status == 200) {
                    return response.json();
                  }
                  else {
                    return null;
                  }
              })

              //get admin information
              fetch(this.link + '/admin/' + post.ownerId, {
                method: 'get',
                header: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json', 
                }
              })
              .then(response => {
                  if (response.status == 200) {
                    return response.json();
                  }
                  else {
                    return null;
                  }
              })

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
                    <h3> {}</h3>
                    <p> User Type: {post.posterType} &nbsp;&nbsp; Post Id: {post.postId} </p>
                    <p> {post.subject} </p>
                    <p> {post.location} </p>
                    <p> {avail} </p>
                    <p> {post.rate} {post.unit} </p>
                    <Button type="submit" onClick={() => {this.deletePost(post)}}> Delete </Button>
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
          
          <Button onClick={() => this.props.history.goBack()}> Back </Button>
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
