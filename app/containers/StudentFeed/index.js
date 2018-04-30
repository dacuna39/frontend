/**
 *
 * StudentFeed
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
import styled, { keyframes } from 'styled-components';

import HeaderFeed from 'components/HeaderFeed';
import Button from 'components/Button';
import H1 from 'components/H1';
import CheckboxTableStyle from 'components/TableCheckbox/CheckboxTableStyle';
import GroupDown from 'components/FormComponents/GroupDown';
import Group from 'components/FormComponents/CheckboxOrRadioGroup';

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
	width: auto;
	height: auto;
	background: #EEECE9;
	text-align: center;
	padding: 2em;
`;

const FixedCenter = styled.div`
	position: fixed;
`;

export class StudentFeed extends React.Component { // eslint-disable-line react/prefer-stateless-function

	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';

		this.state = {
			posts : [],
			printPosts: [],
			postsReady: false,

			filterOptions: ["All Subjects","My Subjects"],
			filter: ["All Subjects"],

			stars: ["1","2","3","4","5","6","7","8","9","10"],
			starsSelected: [],
			tutorToRate: {},

			isOpen: false, //whether the new form modal is rendered
			isRatingOpen: false,

            isLoading: true, //waits till component is finished loading so that buttons dont auto redirect
		};

		this.handleFilterSelect = this.handleFilterSelect.bind(this);
		this.handleStarsSelect = this.handleStarsSelect.bind(this);

		this.createPostsTable = this.createPostsTable.bind(this);
		this.printPosts = this.printPosts.bind(this);
		
		this.clickRating = this.clickRating.bind(this);
		this.submitRating = this.submitRating.bind(this);
	}

	toggleModal = () => { //opens and closes the new form modal
		this.setState({
		  isOpen: !this.state.isOpen
		});
	}

	toggleRatingModal = () => { //opens and closes the new form modal
		this.setState({
		  isRatingOpen: !this.state.isRatingOpen
		});
	}

	handleFilterSelect(e) {
		this.setState({filter: [e.target.value]});
	}
	handleStarsSelect(e) {
		this.setState({starsSelected: [e.target.value]});
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

			for (var i =0; i < posts.length; i++){
				if (i <= 25 && posts[i].posterType == "tutor"){// loads the 25 most recent posts
					allPosts.push(posts[i]);
				}
				else{
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

		fetch(this.link + '/posts?type=tutor', {
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
			this.setState({ posts: allPosts, isLoading: false, postsReady: false}, () => this.createPostsTable());
		})
		.catch(error => console.log('parsing failed', error));
	}

	apply(post){
		
		fetch('https://tutor-find.herokuapp.com/tutors/' + post.ownerId.toString())
      	.then(response => response.json()) //gets post owner from server
		.then(owner => owner.email) //gets owner's email	  
      	.then(mail => { //on success
        	var email = mail;
        	var subject = "A Student is interested in your listing!";
        	var body = "Hello, I'm interested! Please let me know if you'd like to connect.";
			body +=   "    Name: " + this.props.legalFirstName + " " + this.props.legalLastName + 
					  "    Major: " + this.props.major + "    Bio: "+ this.props.bio;
        	                 
        	var win = window.open("", "emailLink", "width=300,height=100");
        	win.document.close();
        	win.document.write( '<a href="mailto:' + email + '?subject=' + subject + '&body=' + body + '">' + 'Click here to email the tutor.' + '<' + '/a>');
        	win.focus();
        })
		.catch(error => console.log('parsing failed', error));
	
	}

	clickRating(tutor) {
		
		var rating = JSON.parse(tutor.rating);
		var id = this.props.userId;
		var canRate = true;
		//console.log("rating: ", rating)
		//console.log("userid", id);

		Object.keys(rating).forEach(function(key) { //search through keys to see if user has alrady rated

			if (key == id){
				canRate = false;
			}
		});		

		if(canRate == true){
			//console.log("can rate!");
			this.setState({ isRatingOpen: true, tutorToRate: tutor});
		}
		else{
			alert("You already rated this tutor!");
		}
	}

	submitRating(){
		var tutor = this.state.tutorToRate;

		var rate = JSON.parse(tutor.rating);
		rate[this.props.userId] = this.state.starsSelected[0];
		//console.log("rating: ", rate);

		tutor.rating = JSON.stringify(rate);
		//console.log("tutor ", tutor);

		fetch(this.link + '/tutors/' + this.props.userId + "/addrating", { //post tutor with new rating to database :)
			method: 'post',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',	
			},
			body: JSON.stringify(tutor)
		})
		.then(response => {
			if (response.status == 200){ //checks for ok response		
				this.setState({ tutorToRate: {}, isRatingOpen: false }); //clears the grabbed tutor var
				alert("Rating Submitted!");	
			} else {
				alert("An error has occured, please try again later");
			}
		})
		.catch(error => console.log('parsing failed', error));

		this.fetchAllPosts();
	}

	createPostsTable(){
		var returnPosts =[];

		if (this.state != null && this.state.isLoading == false){
			//console.log("createPostsTable:", this.state.posts);

			if (this.state.posts.length != 0){
				return this.state.posts.map((post) => {	//for each post...
					
					//ensures that no glitcy posts crash the app :)
					if(post.subject != null && post.location != null && post.availability != null
						&& post.rate != null && post.unit != null) {

							//fetch the post owner's info
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
							.then( tutor => {

								if (tutor != null && tutor != undefined){
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

									//calculate rating
									var rate = JSON.parse(tutor.rating);
									var rateKeys = Object.keys(rate);

									var calcRating =0;
									for (var i=1; i < rateKeys.length; i ++){ //skip first element because it is 0:0
										calcRating += parseInt( rate[rateKeys[i]] );
									}

									if (calcRating <= 0) {
										calcRating = "No Ratings Yet!";
									}
									else {
										calcRating /= (rateKeys.length -1); //skip first element because it is 0:0
										calcRating = ("Rating: " + calcRating.toString() + " / " + "10");
									}
									//console.log("calcRating", calcRating);
									//end calculate rating

									//if they accept paid
									if (post.acceptsPaid){

										if (tutor.links != ""){
											returnPosts.push (
												<div key={post.postId}>
													<Post>
														<h3> {tutor.legalFirstName} {tutor.legalLastName} </h3>
														<img src={tutor.img} width="150px" height="150px" alt="Profile Picture"/>
														<p> Highest Degree: {tutor.degrees} </p> 
														<p> Professional Link: <a href={tutor.links} target="_blank"> {tutor.links} </a> </p>
														<p> {calcRating} </p>
														<hr />
														<p> Subject: {post.subject} </p>
														<p> Preferred Meeting Location: {post.location} </p>
														<p> {avail} </p>
														<p> {post.rate} {post.unit} </p>
														<Button onClick={() => this.apply(post)}> Apply </Button>
														<Button onClick={() => this.clickRating(tutor)}> Rate </Button>
													</Post>							
													<br />
												</div>
											);
										}
										else {
											returnPosts.push (
												<div key={post.postId}>
													<Post>
														<h3> {tutor.legalFirstName} {tutor.legalLastName} </h3>
														<img src={tutor.img} width="150px" height="150px" alt="Profile Picture"/>
														<p> Highest Degree: {tutor.degrees} </p>
														<p> {calcRating} </p>
														<hr />
														<p> Subject: {post.subject} </p>
														<p> Preferred Meeting Location: {post.location} </p>
														<p> {avail} </p>
														<p> {post.rate} {post.unit} </p>
														<Button onClick={() => this.apply(post)}> Apply </Button>
														<Button onClick={() => this.clickRating(tutor)}> Rate </Button>
													</Post>							
													<br />
												</div>
											);
										}//end check for links
									
									//if they don't accept paid
									} else {

										if (tutor.links != ""){
											returnPosts.push (
												<div key={post.postId}>
													<Post>
														<h3> {tutor.legalFirstName} {tutor.legalLastName} </h3>
														<img src={tutor.img} width="150px" height="150px" alt="Profile Picture"/>
														<p> Highest Degree: {tutor.degrees} </p>
														<p> Professional Link: <a href={tutor.links} target="_blank"> {tutor.links} </a> </p>
														<p> {calcRating} </p>
														<hr />
														<p> Subject: {post.subject} </p>
														<p> Preferred Meeting Location: {post.location} </p>
														<p> {avail} </p>
														<p> Offering Free Tutoring </p>
														<Button onClick={() => this.apply(post)}> Apply </Button>
														<Button onClick={() => this.clickRating(tutor)}> Rate </Button>
													</Post>							
													<br />
												</div>
											);
										}
										else {
											returnPosts.push (
												<div key={post.postId}>
													<Post>
														<h3> {tutor.legalFirstName} {tutor.legalLastName} </h3>
														<img src={tutor.img} width="150px" height="150px" alt="Profile Picture"/>
														<p> Highest Degree: {tutor.degrees} </p>
														<p> {calcRating} </p>
														<hr />
														<p> Subject: {post.subject} </p>
														<p> Preferred Meeting Location: {post.location} </p>
														<p> {avail} </p>
														<p> Offering Free Tutoring </p>
														<Button onClick={() => this.apply(post)}> Apply </Button>
														<Button onClick={() => this.clickRating(tutor)}> Rate </Button>
													</Post>							
													<br />
												</div>
											);
										}//end check for links
										
									}									
									this.setState({printPosts: returnPosts, postsReady: true});
								}//end if tutor != null
								else {
									//console.log("null tutor: post " + post.postId + " ownerId " + post.ownerId);
								}
							})// end then	
							.catch(error => console.log('parsing failed', error));

					}//end check bad posts
				});
			}//end if posts.length != 0
			else {
				//return false;
			}
		}//end check if state is null
	}//end createPostsTable

	printPosts() {
		if (this.state.postsReady == true){			
			
			var sortedPosts = this.state.printPosts.sort((a,b) => a.key > b.key); //sorts to most recent posts first
			//console.log("Sorted post", sortedPosts);
			return sortedPosts.map((post) => {
				return post;
			});//end map

		} else {
			return(
				<div>
					<br /> <h3> Could not find any posts! </h3>
						<h3> Try adding more subjects in your profile or search for all subjects on the left sidebar! </h3>
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
        	  <title> StudentFeed </title>
        	  <meta name="description" content="Description of StudentFeed" />
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

				<FixedCenter>
				<Modal show={this.state.isRatingOpen} onClose={this.toggleRatingModal}>
					
						<H1> Rate this tutor! </H1>
						<br />
						<p> Please rate this tutor based on likeability, or rate after you have received tutoring for a better review! </p>
						<Group
							title={''}
							type={'radio'}
							setName={'stars'}
							controlFunc={this.handleStarsSelect}
							options={this.state.stars}
							selectedOptions={this.state.starsSelected}
							 />

						<Button onClick={this.submitRating}> Submit Rating </Button>

				</Modal>
				</FixedCenter>

					<br />
					<H1> Available Tutors </H1>
					<Img src={Cap} alt="Graduation Cap"/>
					<h3> These tutors are looking for students! Find a tutor that you like and click on apply to email them. </h3>
					<hr />
							{/* make a new post */}
							<Button onClick={this.toggleModal}> New Post </Button>

							<Modal show={this.state.isOpen} onClose={this.toggleModal}>
								<H1> New Post </H1>
								<NewPostForm />
							</Modal>
							{/* end make new post */}

							{/* link to studentPost */}
							<Button onClick={() => this.props.history.push("/studentPosts") }> My Posts </Button>				

					{/* Load tutor posts */}
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
        	 		<title> StudentFeed </title>
        	 	    <meta name="description" content="Description of StudentFeed" />
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
		userId: state.userId,
		legalFirstName: state.legalFirstName,
		legalLastName: state.legalLastName,
		bio: state.bio,
		major: state.major,
		subjects: state.subjects,
	}
}

export default withRouter( connect(mapStateToProps)(StudentFeed) );
