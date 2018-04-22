/**
 *
 * TutorPosts
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

export class TutorPosts extends React.Component { // eslint-disable-line react/prefer-stateless-function

	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';

		this.setState({
			userPosts : [],
		});

		this.componentDidMount = this.componentDidMount.bind(this);	
		this.getPosts = this.getPosts.bind(this);
		this.createPostsTable = this.createPostsTable.bind(this);
	}

	getPosts(){
		var onlyUsers = [];

		fetch(this.link + '/posts?type=tutor', {
			method: 'get',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',	
			}
		})
		.then(response => response.json())
		.then(posts => {console.log("all posts: ", posts);

			for (var i =0; i < posts.length; i++){
				if (posts[i].ownerId == this.props.userId){
					onlyUsers.push(posts[i]);
				}
			}

			this.setState({ userPosts: onlyUsers }, () => console.log("user's posts: ", this.state.userPosts));
		})
		.catch(error => console.log('parsing failed', error));
	}

	componentDidMount(){
		this.getPosts();
	}

	deletePost(post){
		
		post.active = false;

		fetch(this.link + "/posts/" + post.postId.toString(), { //post profile updates to database :)
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
				this.getPosts();
			} else {
				alert("An error occurred, please try again later");
				console.log('formPayload: ' + JSON.stringify(formPayload));
			}
		})
		.catch(error => alert('parsing failed', error))
	}

	createPostsTable(){

		if(this.state != null){

			if (this.state.userPosts.length != 0){
				return this.state.userPosts.map((post) => {	

					//ensures that no glitcy posts crash the app :)
					if(post.subject != null && post.location != null && post.availability != null
						&& post.rate != null && post.unit != null) {
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

							if (post.acceptsPaid){
								return (
									<div key={post.postId}>
										<Post>
											<p> Subject: {post.subject} </p>
											<p> Preferred Meeting Location: {post.location} </p>
											<p> {avail} </p>
											<p> {post.rate} {post.unit} </p>
											<Button onClick={() => this.deletePost(post)}> Delete </Button>
										</Post>							
										<br />
									</div>
								);
							}
							else {
								return (
									<div key={post.postId}>
										<Post>
											<p> Subject: {post.subject} </p>
											<p> Preferred Meeting Location: {post.location} </p>
											<p> {avail} </p>
											<p> Offering Free Tutoring </p>
											<Button onClick={() => this.deletePost(post)}> Delete </Button>
										</Post>							
										<br />
									</div>
								);
							}
					}
				});
			}
			else {
				return(
					<div>
						<br />
						<h3> You have not created any posts! Please go back and click New Post! </h3>
						<br />
					</div>
				);
			}
		}// end check if state is null
	}
	
  	render() {
    	return (
    	<div>
        	<Helmet>
        	  <title>Tutor Posts</title>
        	  <meta name="description" content="Description of TutorPosts" />
        	</Helmet>
		
			<HeaderFeed />

			<BodyWrapper>
				<CenteredSection>
					<br />
					<H1> Your Posts </H1>
					<h3> Here are your current active posts. Delete a post to stop receiving incoming tutoring requests </h3>
					<hr /> <br />
					{this.createPostsTable()}

					<Button onClick={() => this.props.history.goBack()}> Back </Button>
				</CenteredSection>
			</BodyWrapper>
      	</div>
    	);
  	}
}

function mapStateToProps(state) {
	return{
		userId: state.userId,
	}
}

export default withRouter( connect(mapStateToProps)(TutorPosts) );
