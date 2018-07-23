import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  padding: 0 0.5em;
`;

const Div = styled.div `
	padding: 0em .1em;
`;

const CheckboxOrRadioGroup = (props) => (
	<div>
		<p className="form-label">{props.title}</p>
		<Div className="checkbox-group">
			{props.options.map(option => {
				return (
					<Label key={option} className="form-label capitalize">
						<input
							className="form-checkbox"
							name={props.setName}
							onChange={props.controlFunc}
							value={option}
							checked={props.selectedOptions.indexOf(option) > -1}
							type={props.type} /> {option}
					</Label>
				);
			})}
		</Div>
	</div>
);

CheckboxOrRadioGroup.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
	setName: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array,
	controlFunc: PropTypes.func.isRequired
};

export default CheckboxOrRadioGroup;
