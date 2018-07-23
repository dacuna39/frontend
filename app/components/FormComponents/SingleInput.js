import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//Input css
const Input = styled.input`
  outline: none;
  border: 1px solid #666;
  padding: 0.25em;
  background: #ddd;
`;

const SingleInput = (props) => (
	<div className="form-group">
		<label className="form-label">{props.title}</label>
		<Input
			className="form-input"
			name={props.name}
			type={props.inputType}
			value={props.content}
			onChange={props.controlFunc}
			placeholder={props.placeholder} />
	</div>
);

SingleInput.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number','file','email','password']).isRequired,
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	controlFunc: PropTypes.func.isRequired,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	placeholder: PropTypes.string,
};

export default SingleInput;