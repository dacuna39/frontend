/**
 *
 * StudentPosts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import styled from 'styled-components';
import HeaderFeed from 'components/HeaderFeed';

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
	border: 2px;
	border-color: FFB71C;
	width: 100%;
	height: 150px;
	background: #EEECE9;
	text-align: center;
`;

export class StudentPosts extends React.Component { // eslint-disable-line react/prefer-stateless-function

	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com/posts';

		this.setState({
			userPosts : [],
			printPosts: [],
		});

		this.componentDidMount = this.componentDidMount.bind(this);	
		this.createPostsTable = this.createPostsTable.bind(this);
	}

	componentDidMount(){

		var onlyUsers = [];

		fetch(this.link, {
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

	createPostsTable(){

		if(this.state != null){
			return this.state.userPosts.map((post) => {	
				return (
					<div>
						<Post key={post.postId}>
							<p> {post.subject} </p>
							<p> {post.location} </p>
							<p> {post.availability} </p>
							<p> {post.rate} {post.unit} </p>
						</Post>
						<br />
					</div>
				);
			});
		}
	}
	
  	render() {
    	return (
    	<div>
        	<Helmet>
        	  <title>Student Posts</title>
        	  <meta name="description" content="Description of StudentPosts" />
        	</Helmet>
		
			<HeaderFeed />

			<BodyWrapper>
				<CenteredSection>
					<H1> Your Posts </H1>

					{this.createPostsTable()}

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

export default connect(mapStateToProps)(StudentPosts);
