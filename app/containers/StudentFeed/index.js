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
import PostTutor from 'components/PostTutor';

import CenteredSection from './CenteredSection';
import Modal from './Modal';
import ModalFixed from './ModalFixed';
import NewPostForm from './NewPostForm';
import Img from './Img';
import Wrapper from './Wrapper';

import Cap from 'components/Images/graduation-cap.png';

const BodyWrapper = styled.div`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const FixedCenter = styled.div`
	position: fixed;
`;

const FilterContainer = styled.div`
	width: 18%;
`;

const FeedContainer = styled.div`
	width: 82%;
`;

const ExpandedPost = styled.div`
	position: fixed
	border: 2px solid;
	border-color: FFB71C;
	left: 20px;
	width: 500px;
	height: 500px;
	background: #EEECE9;
	text-align: center;
	padding: 2em;
`;

const TD = styled.td`
	padding: 0 1em;
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

			expandPostOpen: false, //whether the expanded post is rendered
			tutor: {firstName: '', lastName: '', img: '', degrees: '', rating: ''},
			post: {subject: '', availability: '', location: '', rate: ''},
		};
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

	handleFilterSelect = (e) => {
		this.setState({filter: [e.target.value]});
	}
	handleStarsSelect = (e) => {
		this.setState({starsSelected: [e.target.value]});
	}

	componentDidMount(){
			this.fetchAllPosts();
	}

	/* 
	 * Fetch & filter methods 
	 */

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
			this.setState({ posts: allPosts, postsReady: false}, () => this.createPostsTable());
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
				if (i <= 25 && posts[i].posterType == "tutor"){// loads the 25 most recent posts
					allPosts.push(posts[i]);
				}
				else if (i > 25){
					break;
				}
			}
			this.setState({ posts: allPosts, postsReady: false}, () => this.createPostsTable());
		})
		.catch(error => console.log('parsing failed', error));
	}

	/* 
	 * Rating methods 
	 */

	clickRating = () => {
		
		//console.log(this.state.tutor);
		var rating = JSON.parse(this.state.tutor.rating);
		var id = this.props.userId;
		var canRate = true;

		Object.keys(rating).forEach(function(key) { //search through keys to see if user has alrady rated

			if (key == id){
				canRate = false;
			}
		});

		if(canRate == true){
			//console.log("can rate!");
			this.setState({ isRatingOpen: true, expandPostOpen: false, tutorToRate: this.state.tutor });
		}
		else{
			alert("You already rated this tutor!");
		}
	}

	submitRating = () => {
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
				this.setState({ tutorToRate: {}, isRatingOpen: false}); //clears the grabbed tutor var
				alert("Rating Submitted!");	
			} else {
				alert("An error has occured, please try again later");
			}
		})
		.catch(error => console.log('parsing failed', error));

		this.fetchAllPosts();
	}

	/* 
	 * Create and render posts methods 
	 */

	createPostsTable = () => {
		var returnPosts =[];

		if (this.state != null){
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
									//end calculate rating

									/* make hourly rate string */
									var rateString = 'Offering Free Tutoring';

									if (post.acceptsPaid == true) {
										rateString = post.rate + ' ' + post.unit;
									}
									//tutor.rating = calcRating;

									returnPosts.push (
										<PostTutor
											postId={post.postId}
											firstName={tutor.legalFirstName}
											lastName={tutor.legalLastName}
											img={tutor.img}
											degrees={tutor.degrees}
											links={tutor.links}
											rating={calcRating}

											subject={post.subject}
											location={post.location}
											availability={avail}
											rate={rateString}
											expandPostFunc={() => {
												this.expandPost(tutor, {subject: post.subject,
																		  location: post.location,
																		  availability: avail,
																		  rate: rateString,
																		  ownerId: post.ownerId,
																		  ratingString: calcRating,
																		})
												}}
										/>
									);

									this.setState({printPosts: returnPosts, postsReady: true});
								}//end if tutor != null
							})//end then	
							.catch(error => console.log('parsing failed', error));
					}//end check bad posts
				});//end map posts
			}//end if posts.length != 0
		}//end check if state is null
	}//end createPostsTable

	printPosts = () => {
		if (this.state.postsReady == true){
			console.log('printposts', this.state.printPosts);
			
			//var sortedPosts = this.state.printPosts.sort((a,b) => a.key < b.key); //sorts to most recent posts first
			//console.log("Sorted post", sortedPosts);

			return this.state.printPosts.map((post) => {
				return (
					<div> {post} </div>
				);
			});//end map
		} else {
			return(
				<CenteredSection>
					<br /> <h3> Could not find any posts! </h3>
						<h3> Try adding more subjects in your profile or search for all posts on the right sidebar! </h3>
					<br />
				</CenteredSection>
			);
		}
	}

	/* 
	 * expand post and apply methods 
	 */

	expandPost = (tutor, post) => {
		this.setState({
			expandPostOpen: true,
			tutor: tutor,
			post: post,
		});
	}

	apply = () => {
		fetch('https://tutor-find.herokuapp.com/tutors/' + this.state.post.ownerId.toString())
      	.then(response => response.json()) //gets post owner from server
		.then(owner => owner.email) //gets owner's email	  
      	.then(mail => { //on success
        	var email = mail;
        	var subject = "A Student is interested in your listing!";
        	var body = "Hello, I'm interested! Please let me know if you'd like to connect.";
			body +=   "    Name: " + this.props.legalFirstName + " " + this.props.legalLastName + 
					  "    Major: " + this.props.major;
        	                 
        	var win = window.open("", "emailLink", "width=300,height=100");
        	win.document.close();
        	win.document.write( '<a href="mailto:' + email + '?subject=' + subject + '&body=' + body + '">' + 'Click here to email the tutor.' + '<' + '/a>');
        	win.focus();
        })
		.catch(error => console.log('parsing failed', error));
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

				
				<ModalFixed show={this.state.isRatingOpen} onClose={this.toggleRatingModal}>
					
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
				</ModalFixed>
			

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

					{/* render expanded post modal */}
					<ModalFixed show={this.state.expandPostOpen} onClose={() => this.setState({expandPostOpen: false})}>
						<Wrapper>
							<table>
								<TD>
									<h3> {this.state.tutor.legalFirstName} {this.state.tutor.legalLastName} </h3>
									<img src={this.state.tutor.img} width="150px" height="150px" alt="Profile Picture"/>
								</TD>
								<TD> </TD>
								<TD>
									<h3> Info </h3>
									<p> Degree: {this.state.tutor.degrees} </p>
									<p> {this.state.post.ratingString} </p>
									<a href={this.state.tutor.links} target='_blank'> {this.state.tutor.links} </a>
								</TD>
							</table>
						</Wrapper>
						<hr />
						<p> Subject: {this.state.post.subject} </p>
						<p> Preferred Meeting Location: {this.state.post.location} </p>
						<p> {this.state.post.availability} </p>
						<p> {this.state.post.rate} </p>
						<Wrapper>
							<table>
								<TD> <Button onClick={this.apply}> Apply </Button> </TD>
								<TD> <Button onClick={this.clickRating}> Rate </Button> </TD>
							</table>
						</Wrapper>
					</ModalFixed>
					{/* end render expanded post modal */}

				</CenteredSection>
			</BodyWrapper>

			<Wrapper>
				<FilterContainer>
					{/* placeholder that reserves space for the fixed filter component*/}
				</FilterContainer>
				
				<FeedContainer>
					{/* Load student posts */}
					{this.printPosts()}
				</FeedContainer>
			</Wrapper>
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
