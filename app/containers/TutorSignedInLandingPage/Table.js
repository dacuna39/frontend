import React, {Component} from 'react';
import styled from 'styled-components';

import SingleInput from 'components/FormComponents/SingleInput';
import TextArea from 'components/FormComponents/TextArea';
//import Button from 'components/Button';

import CenteredSection from './CenteredSection';
import Form from './Form';
//import Input from './Input'; delete the file!
import Section from './Section';
import messages from './messages';
import Wrapper from './Wrapper';
import Img from './Img';


class Table extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activePost: '',
      posterType: '',
      subjectId: '',
      availability: '',
      rate: '',
      unit: '',
      createdTime: '',
      acceptsGroup: ''
    };

    this.handleActivePostChange = this.handleActivePostChange.bind(this);
    this.handlePosterTypeChange = this.handlePosterTypeChange.bind(this);
    this.handleSubjectIdChange = this.handleSubjectIdChange.bind(this);
    this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleCreatedTimeChange = this.handleCreatedTimeChange.bind(this);
    this.handleAcceptsGroupChange = this.handleAcceptsGroupChange.bind(this);
  }

componentDidMount() { //loads user from heroku
    fetch('https://tutor-find.herokuapp.com/posts?type=student')
      .then(res => res.json())
      .then(data => {
        this.setState({ //loads values from user to data
          activePost: data.active,
          posterType: data.posterType,
          subjectId: data.subjectId,
          availability: data.availability,
          rate: data.rate,
          unit: data.unit,
          createdTime: data.createdTs,
          acceptsGroup: data.acceptsGroupTutoring
        });
      });
  }



{/*Table Style CSS goes here.*/}

render() {
    return (

<CenteredSection>
     <TableStyle>
             <tbody>
              <tr>
                <th><center><label>Student Post Name</label></center></th>
               </tr>
               <tr> 
                <th><center><label>Student Post Rate</label></center></th>
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
  </CenteredSection>
  );
}
