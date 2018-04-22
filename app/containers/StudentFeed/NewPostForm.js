import React, {Component} from 'react';
import { connect } from 'react-redux';
//import withRouter from 'react-router-dom';

import SingleInput from 'components/FormComponents/SingleInput';
import Group from 'components/FormComponents/CheckboxOrRadioGroup';
import GroupDown from 'components/FormComponents/GroupDown';

import CenteredSection from './CenteredSection';
import Form from './Form';
import SubmitInput from './SubmitInput';

import jsonSubjects from 'components/subjects.json';

let arraySubjects = eval(jsonSubjects.arraySubjects);

class NewPostForm extends Component {

    constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com';

		this.state = { //student post

			subject: [],
			subjects: arraySubjects,
			
            location: "",
            availability: "",
            rate: 0,
			
			days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
			daysSelect: [],
			
			times: ["Morning","Afternoon","Night"],
			timeSelect: [],

			monday: [],
			mondayShow: false,
			tuesday: [],
			tuesdayShow: false,
			wednesday: [],
			wednesdayShow: false,
			thursday: [],
			thursdayShow: false,
			friday: [],
			fridayShow: false,
			saturday: [],
			saturdayShow: false,
			sunday: [],
			sundayShow: false,
            
			acceptsGroupTutoring: [],
			groups: false,

			acceptsPaid: [],
			paid: false,

			booleanOptions: ["Yes", "No"],
        };

		this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
		this.handleDaysSelect = this.handleDaysSelect.bind(this);
		this.handleRateChange = this.handleRateChange.bind(this);
		this.handleGroupTutoringChange = this.handleGroupTutoringChange.bind(this);
		this.handleAcceptsPaidChange = this.handleAcceptsPaidChange.bind(this);
		
		this.handleMondayChange = this.handleMondayChange.bind(this);
		this.handleTuesdayChange = this.handleTuesdayChange.bind(this);
		this.handleWednesdayChange = this.handleWednesdayChange.bind(this);
		this.handleThursdayChange = this.handleThursdayChange.bind(this);
		this.handleFridayChange = this.handleFridayChange.bind(this);
		this.handleSaturdayChange = this.handleSaturdayChange.bind(this);
		this.handleSundayChange = this.handleSundayChange.bind(this);

		this.createAvailabilityString = this.createAvailabilityString.bind(this);
		this.clearForm = this.clearForm.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.validateForm = this.validateForm.bind(this);
    };

    handleSubjectChange(e) {
		  this.setState({ subject: [e.target.value] });
	}
    
    handleLocationChange(e) {
		  this.setState({ location: e.target.value });
    }
    
    handleAvailabilityChange(e) {
		  this.setState({ availability: e.target.value });
	}

	handleMondayChange(e) {
		this.setState({ monday: [e.target.value]});
	}
	handleTuesdayChange(e) {
		this.setState({ tuesday: [e.target.value]});
	} 
	handleWednesdayChange(e) {
		this.setState({ wednesday: [e.target.value]});
	} 
	handleThursdayChange(e) {
		this.setState({ thursday: [e.target.value] });
	} 
	  handleFridayChange(e) {
		this.setState({ friday: [e.target.value] });
	}
	handleSaturdayChange(e) {
		this.setState({ saturday: [e.target.value] });
	}
	handleSundayChange(e) {
		this.setState({ sunday: [e.target.value] });
  	}
	
	handleDaysSelect(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if(this.state.daysSelect.indexOf(newSelection) > -1) { //remove
			newSelectionArray = this.state.daysSelect.filter(s => s !== newSelection)
		} else {//add
			newSelectionArray = [...this.state.daysSelect, newSelection];
		}
		
		switch (e.target.value){
				case "Monday":
					this.setState({ mondayShow: !this.state.mondayShow, daysSelect: newSelectionArray});
					break;
				case "Tuesday":
					this.setState({ tuesdayShow: !this.state.tuesdayShow, daysSelect: newSelectionArray});
					break;
				case "Wednesday":
					this.setState({ wednesdayShow: !this.state.wednesdayShow, daysSelect: newSelectionArray});
					break;
				case "Thursday":
					this.setState({ thursdayShow: !this.state.thursdayShow, daysSelect: newSelectionArray});
					break;
				case "Friday":
					this.setState({ fridayShow: !this.state.fridayShow, daysSelect: newSelectionArray});
					break;
				case "Saturday":
					this.setState({ saturdayShow: !this.state.saturdayShow, daysSelect: newSelectionArray});
					break;
				case "Sunday":
					this.setState({ sundayShow: !this.state.sundayShow, daysSelect: newSelectionArray});
					break;					
		} 
		//this.setState({ daysSelect: newSelectionArray }); 		
	}

	createAvailabilityString() {
		var t = [];

		for (var j=0; j < this.state.daysSelect.length; j++){ //gets the appropriate time for each day selected
			if(this.state.daysSelect[j] == "Monday" && this.state.monday.length != 0){
				t.push(this.state.monday);
			}
			else if(this.state.daysSelect[j] == "Tuesday" && this.state.tuesday.length != 0){
				t.push(this.state.tuesday);
			}
			else if(this.state.daysSelect[j] == "Wednesday" && this.state.wednesday.length != 0){
				t.push(this.state.wednesday);
			}
			else if(this.state.daysSelect[j] == "Thursday" && this.state.thursday.length != 0){
				t.push(this.state.thursday);
			}
			else if(this.state.daysSelect[j] == "Friday" && this.state.friday.length != 0){
				t.push(this.state.friday);
			}
			else if(this.state.daysSelect[j] == "Saturday" && this.state.saturday.length != 0){
				t.push(this.state.saturday);
			}
			else if(this.state.daysSelect[j] == "Sunday" && this.state.sunday.length != 0){
				t.push(this.state.sunday);
			}
		}

		var string = "{"
		for (var i =0; i < this.state.daysSelect.length; i++){
			if (t[i] != undefined){

				string += "\"" + this.state.daysSelect[i] + "\":\"" + t[i] + "\"";
				if (this.state.daysSelect[i+1] != undefined && t[i+1] != undefined){
					string += ",";
				}
			}
		}
		string += "}"
		
		console.log("string: ", string);
		return string;
	}
    
    handleRateChange(e) {
		this.setState({ rate: e.target.value }, () => console.log("rate", this.state.rate));
    }
    
    handleGroupTutoringChange(e) {
		if (e.target.value == "Yes"){
			this.setState({groups: true, acceptsGroupTutoring: [e.target.value]});
		} else if (e.target.value == "No"){
			this.setState({groups: false, acceptsGroupTutoring: [e.target.value]});
		}
	}

	handleAcceptsPaidChange(e) {
		if (e.target.value == "Yes"){
			this.setState({paid: true, acceptsPaid: [e.target.value]});
		} else if (e.target.value == "No"){
			this.setState({paid: false, acceptsPaid: [e.target.value], rate: 0});
		}
	}
	
	clearForm(){
		this.setState({
			subject: [],
	
            location: "",
            availability: "",
            acceptsPaid: true,
            rate: 20,
			//unit: "dollars/hour",
			
			daysSelect: [],
			timeSelect: [],

			monday: [],
			mondayShow: false,
			tuesday: [],
			tuesdayShow: false,
			wednesday: [],
			wednesdayShow: false,
			thursday: [],
			thursdayShow: false,
			friday: [],
			fridayShow: false,
			saturday: [],
			saturdayShow: false,
			sunday: [],
			sundayShow: false,

			rateShow: false,
            
			acceptsGroupTutoring: [],
			groups: false,
		})
	}

    validateForm(availability) {

        if ( this.state.subject[0] == ""){
          alert("Please select a subject");
          return false;
        }
        else if (this.state.location == ""){
          alert("Please enter a location (or state on-line tutoring");
          return false;
        }
        else if (availability == ""){
          alert("Please enter you availability (e.g. Days and hours available)");
          return false;
		}
		else if (this.state.acceptsPaid.length == 0){
			alert("Please select whether you want free or paid tutoring");
			return false;
		}
        else if ((this.state.rate == "" || this.state.rate <= 0) && this.state.paid == true){
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
		var availability = this.createAvailabilityString();

			if (this.validateForm(availability)) {

				const payload = {
				   postId: 100,
				   posterType: "student",
				   ownerId: this.props.userId, //need props to get ownerId
   
				   subject: this.state.subject[0].toUpperCase(),
				   location: this.state.location,
				   availability: availability,
				   // availability requires a format like this:
				   // {"Monday":"Night","Tuesday":"Morning","Friday":"Afternoon"}
				   
				   acceptsPaid: this.state.paid,
   
				   rate: this.state.rate,
				   unit: "dollars/hour",
			   
				   acceptsGroupTutoring: this.state.groups,
				   
				   createdTs: Math.floor(Date.now()/1000),
				   active: true,		
				   currentlySignedUp: 0,	
			   };
			   console.log("payload: " + JSON.stringify(payload));
   
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
					   this.clearForm();			
				   } else {
					   alert("Error submitting post");
				   }
			   })
		   }//end if validateForm
    }//end handleFormSubmit

    render() {
        //console.log("state: ", this.state);
        return(         
            <Form onSubmit={this.handleFormSubmit} >
				<h4> Subject </h4>
				<Group
					title={''}
					type={'radio'}
					setName={'subject'}
					controlFunc={this.handleSubjectChange}
					options={this.state.subjects}
					selectedOptions={this.state.subject}
					 />

				<h4> Preferred Meeting Location </h4>
                <SingleInput
		          		inputType={'text'}
					    title={''}
          				name={'location'}
				        controlFunc={this.handleLocationChange}
          				content={this.state.location}
		                placeholder={''} />
				
				{/* Availiability */}
				<h4> Please enter your availability </h4>
				<Group
			            title={''}
            			type={'checkbox'}
                    	setName={'days'}
                    	controlFunc={this.handleDaysSelect}
				        options={this.state.days}
				        selectedOptions={this.state.daysSelect} /> 
				<hr />
				
				{this.renderTimeOptions()}

				{/* end Availiability */}

				<p> Are you offering payment for tutoring? </p>
				<Group
			            title={''}
            			type={'radio'}
                    	setName={'acceptsPaid'}
                    	controlFunc={this.handleAcceptsPaidChange}
				        options={this.state.booleanOptions}
				        selectedOptions={this.state.acceptsPaid} />

                {this.renderRateInput()}

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

	renderRateInput() {
		if (this.state.paid){
			return (
				<div>
					<p> Enter your rate per hour in dollars </p>
					<SingleInput
						inputType={'number'} // sets this.state.rate to "" if it's not a number, validate-able
			      		title={''}
						name={'rate'}
		    			controlFunc={this.handleRateChange}
		    			content={this.state.rate}
		    			/>
				</div>
			);
		}
	}

	renderTimeOptions() {
		var options = [];
		var i = 0;

			if (this.state.mondayShow){
				options[i] = (
					<td key={i}>
					<GroupDown
						title={'Monday Time'}
						type={'radio'}
						setName={'monday'}
						controlFunc={this.handleMondayChange}
						options={this.state.times}
						selectedOptions={this.state.monday}
						disabled={!this.state.mondayShow} />
					</td>
				);
				i++;
			};
			if (this.state.tuesdayShow){
				options[i] = (
					<td key={i}>
					<GroupDown
						title={'Tuesday Time'}
						type={'radio'}
						setName={'tuesday'}
						controlFunc={this.handleTuesdayChange}
						options={this.state.times}
						selectedOptions={this.state.tuesday}
						disabled={!this.state.tuesdayShow}
						 />
					</td>
				);
				i++;
			};
			if (this.state.wednesdayShow){
				options[i] =  (
					<td key={i}>
					<GroupDown
						title={'Wednesday Time'}
						type={'radio'}
						setName={'wednesday'}
						controlFunc={this.handleWednesdayChange}
						options={this.state.times}
						selectedOptions={this.state.wednesday}
						disabled={!this.state.wednesdayShow}
						 />
					</td>
				);
				i++;
			};
			if (this.state.thursdayShow){
				options[i] = (
					<td key={i}>
					<GroupDown
						title={'Thursday Time'}
						type={'radio'}
						setName={'thursday'}
						controlFunc={this.handleThursdayChange}
						options={this.state.times}
						selectedOptions={this.state.thursday}
						disabled={!this.state.thursdayShow}
						 />
					</td>
				);
				i++;
			};
			if (this.state.fridayShow){
				options[i] = (
					<td key={i}>
					<GroupDown
						title={'Friday Time'}
						type={'radio'}
						setName={'friday'}
						controlFunc={this.handleFridayChange}
						options={this.state.times}
						selectedOptions={this.state.friday}
						disabled={!this.state.fridayShow} />
					</td>
				);
				i++;
			};
			if (this.state.saturdayShow){
				options[i] = (
					<td key={i}>
					<GroupDown
						title={'Saturday Time'}
						type={'radio'}
						setName={'saturday'}
						controlFunc={this.handleSaturdayChange}
						options={this.state.times}
						selectedOptions={this.state.saturday}
						disabled={!this.state.saturdayShow}
						 />
					</td>
				);
				i++;
			};
			if (this.state.sundayShow){
				options[i] = (
					<td key={i}>
					<GroupDown
						title={'Sunday Time'}
						type={'radio'}
						setName={'sunday'}
						controlFunc={this.handleSundayChange}
						options={this.state.times}
						selectedOptions={this.state.sunday}
						disabled={!this.state.sundayShow}
						 />
					</td>
				);
				i++;
			};
			return options;
	}
}

function mapStateToProps(state) {
	return{
		userId: state.userId,
	}
}

export default connect(mapStateToProps)(NewPostForm);