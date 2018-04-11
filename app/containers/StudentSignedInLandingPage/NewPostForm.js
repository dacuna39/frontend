import React, {Component} from 'react';
import { connect } from 'react-redux'

import SingleInput from 'components/FormComponents/SingleInput';
import Group from 'components/FormComponents/CheckboxOrRadioGroup';

import CenteredSection from './CenteredSection';
import Form from './Form';
import SubmitInput from './SubmitInput';

class NewPostForm extends Component {

    constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';

		this.state = { //student post

            ownerId: 10, //need props to get ownerId

            subject: "",
            location: "",
            availability: "",
            acceptsPaid: true,
            rate: 20,
			//unit: "dollars/hour",
			
			days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
			daysSelect: [],
			
			times: ["Morning","Afternoon","Night"],
			timesSelect: [],
            
			acceptsGroupTutoring: [],
			groups: false,

            booleanOptions: ['Yes', 'No'],
        };

        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);

		this.handleDaysSelect = this.handleDaysSelect.bind(this);
		//this.handleTimesSelect = this.handleTimesSelect.bind(this);

		this.createAvailabilityString = this.createAvailabilityString.bind(this);

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
	
	handleDaysSelect(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if(this.state.daysSelect.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.daysSelect.filter(s => s !== newSelection)
		} else {
			newSelectionArray = [...this.state.daysSelect, newSelection];
		}
		this.setState({ daysSelect: newSelectionArray }, () => this.createAvailabilityString()); 		
		//need this to show setState properly!: , () => console.log...
		//because setState is an async function!
	}

	createAvailabilityString() {
		var string = "{"
		for (var i =0; i < this.state.daysSelect.length; i++){
			string += "\"" + this.state.daysSelect[i] + "\":\"" + "Afternoon\"";
			if (this.state.daysSelect[i+1] != undefined){
				string += ",";
			}
		}
		string += "}"
		this.setState({availability: string}, () => console.log("availability: " + this.state.availability));
	}
    
    handleRateChange(e) {
		this.setState({ rate: parseInt( e.target.value, 10) });

		if (e.target.value == 0){
			this.setState({acceptsPaid: false})
		} else if (e.target.value > 0){
			this.setState({acceptsPaid: true})
		}
    }
    
    handleGroupTutoringChange(e) {
		this.setState({ acceptsGroupTutoring: [e.target.value] });
	
		if (e.target.value == "Yes"){
			this.setState({groups: true});
		} else if (e.target.value == "No"){
			this.setState({groups: false});
		}
	}
    
    validateForm() {

        if ( this.state.subject == ""){
          alert("Please enter a subject");
          return false;
        }
        else if (this.state.location == ""){
          alert("Please enter a location (or state on-line tutoring");
          return false;
        }
        else if (this.state.availability == ""){
          alert("Please enter you availability (e.g. Days and hours available)");
          return false;
        }
        else if (this.state.rate == "" || this.state.rate < 0){
          	alert("Please enter a valid pay rate");
          	return false;
		}
		else if (this.state.daysSelect.length == 0){
			alert("Please enter at least one day you are available");
			return false;
	  	}
        else if (this.state.acceptsGroupTutoring == ""){
          alert("Please state if you will accept group tutoring");
          return false;
        }
        else {
          return true;
        }
    }

    handleFormSubmit(e) {
		e.preventDefault();

        if (this.validateForm()) {

         	const payload = {
            	postId: 100,
	            posterType: "student",
    	        ownerId: this.props.userId, //need props to get ownerId

	            subject: this.state.subject.toUpperCase(),
    	        location: this.state.location,
				availability: this.state.availability,
				// availability requires a format like this:
				// {"Monday":"Night","Tuesday":"Morning","Friday":"Afternoon"}
				
				acceptsPaid: this.state.acceptsPaid,

            	rate: this.state.rate,
            	unit: "dollars/hour",
            
				acceptsGroupTutoring: this.state.groups,
				
				createdTs: Math.floor(Date.now()/1000),
				active: true,		
				currentlySignedUp: 0,	
			};

			fetch(this.link + '/posts', { //post entries to database :)
				method: 'put',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json',	
				},
				body: JSON.stringify(payload)
			})
			.then(response => {
				if (response.status == 200){ //checks for ok response
					alert("Success");
					return true;
				} else {
					alert("Error submitting post");
				}
			})			
			alert("payload: " + JSON.stringify(payload));
        }//end if validateForm
    }//end handleFormSubmit

    render() {
		//console.log("acceptsPaid: ", this.state.acceptsPaid);
        //console.log("state: ", this.state);
        return(         
            <Form onSubmit={this.handleFormSubmit}>
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
						
				<p> Please enter your availability </p>
				<Group
			            title={''}
            			type={'checkbox'}
                    	setName={'days'}
                    	controlFunc={this.handleDaysSelect}
				        options={this.state.days}
				        selectedOptions={this.state.daysSelect} /> <hr />

                <p> Enter your rate per hour in dollars (Enter 0 to request free tutoring) </p>
                <SingleInput
		          		inputType={'number'} // sets this.state.rate to "" if it's not a number, validate-able
					    title={''}
          				name={'rate'}
				        controlFunc={this.handleRateChange}
        				content={this.state.rate}
				        placeholder={"20"} 
						/>

                <p> Do you accept group tutoring? </p>
                <Group
			            title={''}
            			type={'radio'}
                    	setName={'acceptsGroupTutoring'}
                    	controlFunc={this.handleGroupTutoringChange}
				        options={this.state.booleanOptions}
				        selectedOptions={this.state.acceptsGroupTutoring} />
				            
                <p>
		      	<SubmitInput
	    	    	    type="submit"
				        value="Submit" /> 
			    </p>
            </Form>
        )
    }
}

function mapStateToProps(state) {
	return{
		userId: state.userId,
	}
}

export default connect(mapStateToProps)(NewPostForm);