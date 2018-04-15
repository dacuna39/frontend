import React, {Component} from 'react';
import styled from 'styled-components';

import SingleInput from 'components/FormComponents/SingleInput';
import TextArea from 'components/FormComponents/TextArea';
//import Button from 'components/Button';

import CenteredSection from './CenteredSection';
import Form from './Form';
//import Input from './Input'; delete the file!
import TableStyle from 'components/Table/TableStyle';

//button css
const Button = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;

  border: 2px solid #f5b01d;
  background-color: #002147;
  color: #FFF;

  &:active {
    background: #fff;
    color: #000;
  }
`;

class Table extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ownerId: 0,
      active: false,
      posterType: '',
      subjectId: '',
      availability: '',
      rate: 0.0,
      unit: '',
      createdTs: '',
      acceptsGroupTutoring: '',

      //post owner info
      email: '',
      legalFirstName: '',
      bio: '',
    };

    this.applyButton = this.applyButton.bind(this);
  }

componentDidMount() { //loads user from heroku
    fetch('https://tutor-find.herokuapp.com/posts/3') //doesn't work unless I specify a post number. The general 'Posts' gives an array of post objects. 
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
          ownerId: data.ownerId
        })
        .catch(error => console.log('parsing failed', error));
        console.log("componentDidMount");
        console.log(this.state);
      })
  }

// loadPostData(props) {
//   const posts = this.state.posts;
//   const postItems = posts.map((singlePost) => 
//     <div key={singlePost.toString()}>
//     {singlePost}
//     </div>
//   );
//   return (
//     <p>postItems</p>
//   );
//   alert(postItems);
// }

applyButton() { 
    fetch('https://tutor-find.herokuapp.com/students/' + this.state.ownerId.toString())
      .then(res => res.json()) //gets response (user) from server
      .then(data => {
        this.setState({ //loads values from user to state
          email: data.email,
          legalFirstName: data.legalFirstName,
          major: data.major,
          minor: data.minor,
          bio: data.bio,
        });
        return this.state.email; //returns email for the next .then()  This was the issue!!
      })
      .then(email => { //receives the email parameter that we just returned
        var email = this.state.email
        var subject = "A Student is interested in your listing!"
        var body = "Hello, I'm interested! Please let me know if you'd like to connect.\n"
                 + this.state.legalFirstName +"\n"+ this.state.major +" "+ this.state.minor +
                 "\n"+ this.state.bio

        document.write( '<a href="mailto:' + email + '?subject=' + subject + '&body=' + body + '">' + 'Click here to email the student.' + '<' + '/a>');
      })
      .catch(error => console.log('parsing failed', error));
  }

render() {

    const { subjectId, unit, rate, active, posterType, availability, createdTs, ownerId, email, userName } = this.state;
    
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
              <th><Button onClick={this.generateEmail}>Apply</Button></th>
             </tr>
            </tbody>
     </TableStyle>
<br />
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
              <th><Button onClick={this.generateEmail}>Apply</Button></th>
             </tr>
            </tbody>
     </TableStyle>
<br />
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
              <th><Button onClick={this.generateEmail}>Apply</Button></th>
             </tr>
            </tbody>
     </TableStyle>
    </div>

    );
  }
}

export default Table;


