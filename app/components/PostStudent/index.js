import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';

const Post = styled.div`
	border: 2px solid;
	border-color: FFB71C;
	width: 200px;
	height: 350px;
	background: #EEECE9;
	text-align: center;
	padding: 1em;
	float: left;
	margin: 1em;
`;

/*
const PostStudent = (props) => (
	<Post className="post" key={props.postId}>
        <h3> {props.firstName} {props.lastName} </h3>
		<img src={props.img} width="150px" height="150px" alt="Profile Picture"/>
		<p> Major: {props.major} </p>
		<hr />
		<p> Subject: {props.subject} </p>
		<p> Preferred Meeting Location: {props.location} </p>
		<p> {props.availability} </p>
		<p> {props.rate} </p>
		<Button onClick={props.applyFunc}> Apply </Button>
	</Post>
);
*/

const PostStudent = (props) => (
	<Post className="post" key={props.postId} onClick={props.expandPostFunc}>
		<h3> {props.firstName} {props.lastName} </h3>
		<img src={props.img} width="150px" height="150px" alt="Profile Picture"/>
		<p> Subject: {props.subject} </p>
		<p> {props.rate} </p>
	</Post>
);

PostStudent.propTypes = {
	postId: React.PropTypes.number.isRequired,
	firstName: React.PropTypes.string.isRequired,
	lastName: React.PropTypes.string.isRequired,
	img: React.PropTypes.string.isRequired,
	major: React.PropTypes.string.isRequired,
	subject: React.PropTypes.string.isRequired,
	location: React.PropTypes.string.isRequired,
	availability: React.PropTypes.string.isRequired,
	rate: React.PropTypes.string.isRequired,
	expandPostFunc: React.PropTypes.func.isRequired,

	applyFunc: React.PropTypes.func.isRequired,
};

export default PostStudent;
