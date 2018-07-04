import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Post = styled.div`
	border: 2px solid;
	border-color: FFB71C;
	width: 250px;
	height: 350px;
	background: #EEECE9;
	text-align: center;
	padding: 1em;
	float: left;
	margin: 1em;
	cursor: pointer;
`;

const PostStudent = (props) => (
	<Post className="post" key={props.postId} onClick={props.expandPostFunc}>
		<h3> {props.firstName} {props.lastName} </h3>
		<img src={props.img} width="150px" height="150px" alt="Profile Picture"/>
		<p> Subject: {props.subject} </p>
		<p> {props.rate} </p>
	</Post>
);

PostStudent.PropTypes = {
	postId: PropTypes.number.isRequired,
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	degrees: PropTypes.string.isRequired,
	links: PropTypes.string,
	rating: PropTypes.string.isRequired,

	subject: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	availability: PropTypes.string.isRequired,
	rate: PropTypes.string.isRequired,
	expandPostFunc: PropTypes.func.isRequired,
};

export default PostStudent;
