import React, {Component} from 'react';

import SingleInput from 'components/FormComponents/SingleInput';
import Radio from 'components/FormComponents/CheckboxOrRadioGroup';

import CenteredSection from './CenteredSection';
import Form from './Form';

class NewPostForm extends Component {

    constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';

		this.state = { //student post

			postId: 100,
            posterType: "student",
            ownerId: 10, //need props to get ownerId

            subject: "",
            location: "",
            availability: "",
            acceptsPaid: [],
            rate: 0.0,
            //unit: "dollars/hour",
            
            acceptsGroupTutoring: [],
            currentlySignedUp: 0,

            booleanOptions: ["Yes", "No"],
        }

        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
        this.handleAcceptsPaidChange = this.handleAcceptsPaidChange.bind(this);
        this.handleRateChange = this.handleRateChange.bind(this);
        this.handleGroupTutoringChange = this.handleGroupTutoringChange.bind(this);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
		    this.validateForm = this.validateForm.bind(this);
    };

    handleSubjectChange(e) {
		  this.setState({ subject: e.target.value });
    }
    
    handleLocationChange(e) {
		  this.setState({ location: e.target.value });
    }
    
    handleAvailabilityChange(e) {
		  this.setState({ availability: e.target.value });
    }
    
    handleAcceptsPaidChange(e) {
		  this.setState({ acceptsPaid: [e.target.value] }, console.log("paid: ", this.state.acceptsPaid));
    }
    
    handleRateChange(e) {
		  this.setState({ rate: e.target.value });
    }
    
    handleGroupTutoringChange(e) {
		  this.setState({ acceptsGroupTutoring: [e.target.value] }, console.log("group: ", this.state.acceptsGroupTutoring));
    }
    
    validateForm(){
        
    }

    handleFormSubmit(e) {

    }

    render() {
        
        return(
            <Form>
                <SingleInput
		          			inputType={'text'}
					          title={''}
          					name={'subject'}
					          controlFunc={this.handleSubjectChange}
          					content={this.state.subject}
					          placeholder={'Subject'} />

                <SingleInput
		          			inputType={'text'}
					          title={''}
          					name={'location'}
					          controlFunc={this.handleLocationChange}
          					content={this.state.location}
					          placeholder={'Location'} />
                
                <SingleInput
		          			inputType={'text'}
					          title={''}
          					name={'availability'}
					          controlFunc={this.handleAvailabilityChange}
          					content={this.state.availability}
					          placeholder={'Availability'} />

                <p> Do you accept paid tutoring? </p>
                <Radio
			            	title={''}
            				type={'radio'}
                    setName={'acceptsPaid'}
                    controlFunc={this.handleAcceptsPaidChange}
				            options={this.state.booleanOptions}
				            selectedOptions={this.state.acceptsPaid} />

                <p> Enter your rate (per hour) </p>
                <SingleInput
		          			inputType={'number'} // sets this.state.rate to null if it's not a number, validate this
					          title={''}
          					name={'rate'}
					          controlFunc={this.handleRateChange}
          					content={this.state.rate}
					          placeholder={'Pay Rate'} />

                <p> Do you accept group tutoring? </p>
                <Radio
			            	title={''}
            				type={'radio'}
                    setName={'acceptsGroupTutoring'}
                    controlFunc={this.handleGroupTutoringChange}
				            options={this.state.booleanOptions}
				            selectedOptions={this.state.acceptsGroupTutoring} />
				            
            </Form>
        )
    }

}

export default NewPostForm;