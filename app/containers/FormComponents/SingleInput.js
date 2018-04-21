import React from 'react';
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
	inputType: React.PropTypes.oneOf(['text', 'number','file','email','password']).isRequired,
	title: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	controlFunc: React.PropTypes.func.isRequired,
	content: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number,
	]).isRequired,
	placeholder: React.PropTypes.string,
};

export default SingleInput;