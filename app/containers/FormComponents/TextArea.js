import React from 'react';
import styled from 'styled-components';

const Area = styled.textarea`
  border: 1px solid #666;
  background: #ddd;
  padding: 1em;
`;

const TextArea = (props) => (
	<div className="form-group">
		<label className="form-label">{props.title}</label>
		<Area
			className="form-input"
			style={props.resize ? null : {resize: 'none'}}
			name={props.name}
			rows={props.rows}
			cols={props.cols}
			value={props.content}
			onChange={props.controlFunc}
			placeholder={props.placeholder} 
			maxlength="300" />
	</div>
);

TextArea.propTypes = {
	title: React.PropTypes.string.isRequired,
	rows: React.PropTypes.number.isRequired,
	cols: React.PropTypes.number.isRequired,
	name: React.PropTypes.string.isRequired,
	content: React.PropTypes.string.isRequired,
	resize: React.PropTypes.bool,
	placeholder: React.PropTypes.string,
	controlFunc: React.PropTypes.func.isRequired
};

export default TextArea;