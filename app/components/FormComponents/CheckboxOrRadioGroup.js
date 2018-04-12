import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  padding: 0 0.5em;
`;

const Div = styled.div `
	padding: .3em 3em;
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
	title: React.PropTypes.string.isRequired,
	type: React.PropTypes.oneOf(['checkbox', 'radio']).isRequired,
	setName: React.PropTypes.string.isRequired,
	options: React.PropTypes.array.isRequired,
	selectedOptions: React.PropTypes.array,
	controlFunc: React.PropTypes.func.isRequired
};

export default CheckboxOrRadioGroup;
