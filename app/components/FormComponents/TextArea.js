import React from 'react';
import PropTypes from 'prop-types';
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
			placeholder={props.placeholder} />
	</div>
);

TextArea.propTypes = {
	title: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
	cols: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	resize: PropTypes.bool,
	placeholder: PropTypes.string,
	controlFunc: PropTypes.func.isRequired
};

export default TextArea;