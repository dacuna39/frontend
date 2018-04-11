import React, {Component} from 'react';
import styled from 'styled-components';

import SingleInput from 'components/FormComponents/SingleInput';
import TextArea from 'components/FormComponents/TextArea';
//import Button from 'components/Button';

import CenteredSection from './CenteredSection';
import Form from './Form';
//import Input from './Input'; delete the file!
import TableStyle from 'components/Table/TableStyle';
import Button from 'components/Button';

class Table extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active: '',
      posterType: '',
      subjectId: '',
      availability: '',
      rate: '',
      unit: '',
      createdTs: '',
      acceptsGroupTutoring: '',
      email: '',
      userName: '',
      ownerId: 0,
    };

    // this.handleActiveChange = this.handleActiveChange.bind(this);
    // this.handlePosterTypeChange = this.handlePosterTypeChange.bind(this);
    // this.handleSubjectIdChange = this.handleSubjectIdChange.bind(this);
    // this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
    // this.handleRateChange = this.handleRateChange.bind(this);
    // this.handleUnitChange = this.handleUnitChange.bind(this);
    // this.handleCreatedTsChange = this.handleCreatedTsChange.bind(this);
    this.applyButton = this.applyButton.bind(this);
  }

componentDidMount() { //loads user from heroku
    fetch('https://tutor-find.herokuapp.com/posts/3')
      .then(res => res.json())
      .then(data => {
        this.setState({ //loads values from user to data
          active: data.active,
          posterType: data.posterType,
          subjectId: data.subjectId,
          availability: data.availability,
          rate: data.rate,
          unit: data.unit,
          createdTs: data.createdTs,
          acceptsGroupTutoring: data.acceptsGroupTutoring,
          ownerId: data.ownerId
        });
      })
      .catch(error => console.log('parsing failed', error));
  }

applyButton() { //sends email to post applied to
    
    fetch('https://tutor-find.herokuapp.com/tutors/' + this.state.ownerId.toString())
      .then(res => res.json()) //gets response (user) from server
      .then(data => {
        this.setState({ //loads values from user to state
          email: data.email,
          userName: data.userName
        });
        return this.state.email; //returns email for the next .then()  This was the issue!!
      })
      .then(email => { //receives the email parameter that we just returned
        var email = this.state.email
        var subject = "A Student is interested in your listing!"
        var body = "Hello, I'm interested! Please let me know if you'd like to connect."

        document.write( '<a href="mailto:' + email + '?subject=' + subject + '&body=' + body + '">' + 'Click here to email the student.' + '<' + '/a>');
      })
      .catch(error => console.log('parsing failed', error));
  }


render() {

    const { subjectId, unit, rate, active, posterType, availability, createdTs, acceptsGroupTutoring, ownerId, email, userName } = this.state;
    console.log('https://tutor-find.herokuapp.com/tutors/' + this.state.ownerId.toString());
    return (
    <div>
     <TableStyle>
             <tbody>
              <tr>
                <th><center><label>{posterType}</label></center></th>
               </tr>
               <tr> 
                <th><center><label>{rate} {unit}</label></center></th>
              </tr>
              <tr>
                <th><label>{subjectId}</label></th>
              </tr>
              <tr>
                <th><label>{availability}</label></th>
              </tr>
              <tr>
                <th><label>Group tutoring?{acceptsGroupTutoring}</label></th>
              </tr>
               <tr>
              <th><h1 onClick={this.applyButton}>Apply</h1></th>
             </tr>
            </tbody>
     </TableStyle>
    </div>
    
    );
  }
}

export default Table;


