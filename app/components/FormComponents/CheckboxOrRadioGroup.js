import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  outline: none;

  padding: 0.25em;
`;

const CheckboxOrRadioGroup = (props) => (
	<div>
		<label className="form-label">{props.title}</label>
		<div className="checkbox-group">
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
		</div>
	</div>
);

CheckboxOrRadioGroup.propTypes = {
	title: React.PropTypes.string.isRequired,
	type: React.PropTypes.oneOf(['checkbox', 'radio']).isRequired,
	setName: React.PropTypes.string.isRequired,
	options: React.PropTypes.array.isRequired,
	selectedOptions: React.PropTypes.array,
	controlFunc: React.PropTypes.func.isRequired
};

export default CheckboxOrRadioGroup;
