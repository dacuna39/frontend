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
import CheckboxTableStyle from 'components/TableCheckbox/CheckboxTableStyle';


class SubjectFilter extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: []
    };
      // active: '',
      // posterType: '',
      // subjectId: '',
      // availability: '',
      // rate: '',
      // unit: '',
      // createdTs: '',
      // email: '',
      // userName: ''

// loadData() {
//   function animation(json) {
//       return json.map(function(data) {
//         return (
//           new StudentPost(
//             document.getElementById(data.postId),
//             data.posterType,
//             data.subjectId,
//             data.availability,
//             data.rate,
//             data.units,
//             data.createdTs,
//           )
//         );
//       });
//     }
    fetch('https://tutor-find.herokuapp.com/posts')
        .then(res => res.json())
        .then(data => {
      //    console.log(data);
          this.setState({ //loads values from user to data
            data: data
            // active: data.active,
            // posterType: data.posterType,
            // subjectId: data.subjectId,
            // availability: data.availability,
            // rate: data.rate,
            // unit: data.unit,
            // createdTs: data.createdTs,
            // ownerId: data.ownerId
          });
        });
      }


// componentDidMount() { //loads user from heroku
//       // this.loadData();
//       alert(StudentPost);

//   }


render() {

    const { subjectId } = this.state;
    
    return (
    <div>
        <CheckboxTableStyle>

         <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">   Calculus </label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">   Computer Science </label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">   English </label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">   Algebra</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">   History</label>
            </th>
        </tr>
        <tr>
            <th><Button>Filter Subjects</Button></th>
        </tr>

        </CheckboxTableStyle>
    </div>
    
    );
  }
}

export default SubjectFilter;


