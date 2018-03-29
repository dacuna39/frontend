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
      acceptsGroupTutoring: ''
    };

    // this.handleActiveChange = this.handleActiveChange.bind(this);
    // this.handlePosterTypeChange = this.handlePosterTypeChange.bind(this);
    // this.handleSubjectIdChange = this.handleSubjectIdChange.bind(this);
    // this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
    // this.handleRateChange = this.handleRateChange.bind(this);
    // this.handleUnitChange = this.handleUnitChange.bind(this);
    // this.handleCreatedTsChange = this.handleCreatedTsChange.bind(this);
    // this.handleAcceptsGroupTutoringChange = this.handleAcceptsGroupTutoringChange.bind(this);
  }

componentDidMount() { //loads user from heroku
    fetch('https://tutor-find.herokuapp.com/posts')
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
          acceptsGroupTutoring: data.acceptsGroupTutoring
        });
      })
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formPayload = {
      active: this.state.active,
      posterType: this.state.posterType,
      subjectId: this.state.subjectId,
      availability: this.state.availability,
      rate: this.state.rate,
      unit: this.state.unit, 
      createdTs: this.state.createdTs,
      acceptsGroupTutoring: this.state.acceptsGroupTutoring
    };

    console.log('state', formPayload);
  }


render() {

    return (
    <div>
     <TableStyle>
             <tbody>
              <tr>
                <th><center><label>{this.state.subjectId}</label></center></th>
               </tr>
               <tr> 
                <th><center><label>{this.state.unit}{this.state.rate}</label></center></th>
              </tr>
              <tr>
                <th><label>Student Post Desired Subject</label></th>
              </tr>
              <tr>
                <th><label>Student Post Description</label></th>
              </tr>
              <tr>
                <th><label>Willing to tutor groups?</label></th>
              </tr>
               <tr>
              <th><Button>Apply</Button></th>
             </tr>
            </tbody>
     </TableStyle>
    </div>
    
    );
  }
}

export default Table;


