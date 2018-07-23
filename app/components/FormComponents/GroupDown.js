import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
    padding: 0 0.5em;
`;

const Div = styled.div `
	margin: .75em .2em;
`;

const GroupDown = (props) => (
	<span>
		<p className="form-label">{props.title}</p>
		<Div className="checkbox-group">
			{props.options.map(option => {
				return (
					<table key={option}>
					<Label className="form-label capitalize">
						<input
							className="form-checkbox"
							name={props.setName}
							onChange={props.controlFunc}
							value={option}
							checked={props.selectedOptions.indexOf(option) > -1}
							type={props.type} /> {option}
					</Label>
					</table>
				);
			})}
		</Div>
	</span>
);

GroupDown.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
	setName: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array,
	controlFunc: PropTypes.func.isRequired
};

export default GroupDown;
