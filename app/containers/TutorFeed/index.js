/**
 *
 * TutorFeed
 *
 * HOW PRINTING POSTS WORKS:
 * On componentdidmount (once page loads), it retrieves all student posts and sets it to this.state.posts
 * When that is done, it calls createpostsTable, where it creates the html to display each posts
 * createPostsTable saves the posts html in this.state.printPosts and makes this.state.postsReady to true
 * 
 * in the render method is printPosts, which is a method that waits until postsReady is set to true to render
 * the posts
 * 
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

import HeaderFeed from 'components/HeaderFeed';
import Button from 'components/Button';
import H1 from 'components/H1';
import CheckboxTableStyle from 'components/TableCheckbox/CheckboxTableStyle';
import GroupDown from 'components/FormComponents/GroupDown';

import CenteredSection from './CenteredSection';
import Modal from './Modal';
import NewPostForm from './NewPostForm';
import Img from './Img';

import Cap from 'components/Images/graduation-cap.png';

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

export class TutorFeed extends React.Component { // eslint-disable-line react/prefer-stateless-function

	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';

		this.state = {
			posts : [],
			printPosts: [],
			postsReady: false,

			filterOptions: ["All Subjects","My Subjects"],
			filter: ["All Subjects"],

			isOpen: false, //whether the sign in modal is rendered
            isLoading: true,    
		};

		this.handleFilterSelect = this.handleFilterSelect.bind(this);

		this.createPostsTable = this.createPostsTable.bind(this);
		this.printPosts = this.printPosts.bind(this);
	}

	toggleModal = () => { //opens and closes the sign in modal
		this.setState({
		  isOpen: !this.state.isOpen
		});
	}

	handleFilterSelect(e) {
		this.setState({filter: [e.target.value]});
	}

	componentDidMount(){
		this.fetchAllPosts();
	}

	filterButtonClick = () => {
		if(this.state.filter == "All Subjects"){
			this.fetchAllPosts();
		}
		else if (this.state.filter == "My Subjects"){
			this.filterPosts();
		}
	}

	filterPosts = () => {
		var allPosts = [];
		var userInfo = [];

		fetch(this.link + '/posts/subject/' + this.props.subjects, {
			method: 'get',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',	
			}
		})
		.then(response => response.json())
		.then(posts => {
			//console.log(posts);
			for (var i =0; i < posts.length; i++){
				if (i <= 25 && posts[i].posterType == "student"){// loads the 25 most recent posts
					allPosts.push(posts[i]);
				}
				else if (i > 25){
					break;
				}
			}
			this.setState({ posts: allPosts, isLoading: false, postsReady: false}, () => this.createPostsTable());
		})
		.catch(error => console.log('parsing failed', error));
	}

	fetchAllPosts = () => {
		var allPosts = [];
		var userInfo = [];

		fetch(this.link + '/posts?type=student', {
			method: 'get',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',	
			}
		})
		.then(response => response.json())
		.then(posts => {

			for (var i =0; i < posts.length; i++){
				if (i <= 25){// loads the 25 most recent posts
					allPosts.push(posts[i]);
				}
				else{
					break;
				}
			}

			this.setState({ posts: allPosts, isLoading: false, postsReady: false }, () => this.createPostsTable());
		})
		.catch(error => console.log('parsing failed', error));
	}

	apply(post){
		
		fetch('https://tutor-find.herokuapp.com/students/' + post.ownerId.toString())
      	.then(response => response.json()) //gets post owner from server
		.then(owner => owner.email) //gets owner's email	  
      	.then(mail => { //on success
        	var email = mail;
        	var subject = "A Tutor is interested in your listing!";
        	var body = "Hello, I'm interested! Please let me know if you'd like to connect.";
			body +=   "    Name: " + this.props.legalFirstName + " " + this.props.legalLastName + 
					  "    Highest degree: " + this.props.degrees + "    Bio: "+ this.props.bio;
        	                 
        	var win = window.open("", "emailLink", "width=300,height=100");
        	win.document.close();
        	win.document.write( '<a href="mailto:' + email + '?subject=' + subject + '&body=' + body + '">' + 'Click here to email the student.' + '<' + '/a>');
        	win.focus();
        })
      	.catch(error => console.log('parsing failed', error));
	}

	createPostsTable(){
		var returnPosts =[];

		if (this.state != null && this.state.isLoading == false){
			
			if (this.state.posts.length != 0){
				return this.state.posts.map((post) => {	//for each post...
					
					//ensures that no glitcy posts crash the app :)
					if(post.subject != null && post.location != null && post.availability != null
						&& post.rate != null && post.unit != null) {

							//fetch the post owner's info
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
							.then( student => {
								//console.log(student);
								if (student != null && student != undefined){
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
									//console.log("avail", avail);

									if (post.acceptsPaid){

										returnPosts.push (
											<div key={post.postId}>
												<Post>
													<h3> {student.legalFirstName} {student.legalLastName} </h3>
													<img src={student.img} width="150px" height="150px" alt="Profile Picture"/>
													<p> Major: {student.major} </p> <hr />
													<p> Subject: {post.subject} </p>
													<p> Preferred Meeting Location: {post.location} </p>
													<p> {avail} </p>
													<p> {post.rate} {post.unit} </p>
													<Button onClick={() => this.apply(post)}> Apply </Button>
												</Post>							
												<br />
											</div>
										);
									} else {
										returnPosts.push (
											<div key={post.postId}>
												<Post>
													<h3> {student.legalFirstName} {student.legalLastName} </h3>
													<img src={student.img} width="150px" height="150px" alt="Profile Picture" />
													<p> Major: {student.major} </p> <hr />
													<p> Subject: {post.subject} </p>
													<p> Preferred Meeting Location: {post.location} </p>
													<p> {avail} </p>
													<p> Requesting Free Tutoring </p>
													<Button onClick={() => this.apply(post)}> Apply </Button>
												</Post>							
												<br />
											</div>
										);
									}
									this.setState({printPosts: returnPosts, postsReady: true});
								}//end if student != null
								else {
									//console.log("null tutor: post " + post.postId + " ownerId " + post.ownerId);
								}
							})// end then				

					}//end check bad posts
				});
			}
			else {
				//return false;
			}
		}//end check if state is null
	}

	printPosts(){
		if (this.state.postsReady == true){

			var sortedPosts = this.state.printPosts.sort((a,b) => a.key < b.key); //sorts to most recent posts first
			//console.log("Sorted post", sortedPosts);
			return sortedPosts.map((post) => {
				return post;
			});//end map

		} else {

			return(
				<div>
					<br /> <h3> Could not find any posts! </h3>
						<h3> Try adding more subjects in your profile or search for all posts on the right sidebar! </h3>
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
        	  <title> TutorFeed </title>
        	  <meta name="description" content="Description of TutorFeed" />
        	</Helmet>
		
			<HeaderFeed />

			{/* sidebar: filter */}
			<CheckboxTableStyle>

				<GroupDown
					title={''}
					type={'radio'}
					setName={'filter'}
					controlFunc={this.handleFilterSelect}
					options={this.state.filterOptions}
					selectedOptions={this.state.filter}
					 />
				<Button onClick={this.filterButtonClick} >Filter Subjects</Button>
				<Button onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" })} }> Back To Top </Button>
			
			</CheckboxTableStyle>
			{/* end sidebar */}

			<BodyWrapper>
				<CenteredSection>
					<br />
					<H1> Available Students </H1>
					<Img src={Cap} alt="Graduation Cap"/>
					<h3> These students are looking for tutors! Find a student that you want to tutor and click apply to email them. </h3>
					<hr />
							{/* make a new post */}
							<Button onClick={this.toggleModal}> New Post </Button>

							<Modal show={this.state.isOpen} onClose={this.toggleModal}>
								<H1> New Post </H1>
								<NewPostForm />
							</Modal>
							{/* end make new post */}

							{/* link to tutorPost */}
							<Button onClick={() => { // link to student's posts
								if (this.state.isLoading == false){
									this.props.history.push("/tutorPosts");
								}
								}}> My Posts </Button>
							{/* end link to tutorPost */}

						{/* Load student posts */}
						{this.printPosts()}
					
				</CenteredSection>
			</BodyWrapper>
      	</div>
    	);
	  }
	  else {
		return (
			<div>
        		<Helmet>
        		  <title> TutorFeed </title>
        		  <meta name="description" content="Description of TutorFeed" />
        		</Helmet>

				<HeaderFeed />
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
		subjects: state.subjects,
	}
}

export default withRouter( connect(mapStateToProps)(TutorFeed) );
