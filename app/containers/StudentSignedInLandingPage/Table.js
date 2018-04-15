import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

//import Button from 'components/Button';

import CenteredSection from './CenteredSection';

//import Input from './Input'; delete the file!
import TableStyle from 'components/Table/TableStyle';
import Button from 'components/Button';

class Table extends React.Component {
  constructor(props) {
	super(props);
	this.link = 'https://tutor-find.herokuapp.com';
    
    this.state = {
      posts: [],

	  //logged in user's info
      userId: state.userId,
      email: state.email,
      legalFirstName: state.legalFirstName,
      legalLastName: state.legalLastName,
      bio: state.bio,
      major: state.major, //student props
	  minor: state.minor,
	  
	  //post owner's info
	  ownerId: 0,
    };

	this.componentDidMount = this.componentDidMount.bind(this);
	this.createPostsTable = this.createPostsTable.bind(this);
    this.applyButton = this.applyButton.bind(this);
  }

componentDidMount() { //loads user from heroku
     var allPosts = [];

    fetch(this.link + '/posts?type=student', {
       method: 'get',
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',	
       }
    })
    .then(response => response.json())
    .then(posts => {
        for (var i =0; i < posts.length; i++){
            if (allPosts.length <= 30){ //limit to show 30 most recent posts
                allPosts.push(posts[i]);
            }
        }
        this.setState({ posts: allPosts }, () => console.log("user's posts: ", this.state.posts));
    })
    .catch(error => console.log('parsing failed', error));
  }

  /*
applyButton() { //sends email to post applied to
    
    fetch('https://tutor-find.herokuapp.com/tutors/' + this.state.ownerId.toString())
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
        var body = "Hello, I'm interested! Please let me know if you'd like to connect."
        body +=   "    Name: " + this.state.legalFirstName + "    Major: "+ this.state.major +
                  "    Bio: "+ this.state.bio;
        
        var win = window.open("", "emailLink", "width=300,height=100");
        win.document.close();
        win.document.write( '<a href="mailto:' + email + '?subject=' + subject + '&body=' + body + '">' + 'Click here to email the tutor.' + '<' + '/a>');
        win.focus();
        

        //document.write( '<a href="mailto:' + email + '?subject=' + subject + '&body=' + body + '">' + 'Click here to email the tutor.' + '<' + '/a>');
      })
      .catch(error => console.log('parsing failed', error));
  }
*/

createPostsTable(){
	if (this.state != null){
		
		if (this.state.posts.length != 0){
			return this.state.posts.map((post) => {	
				return (
					<div key={post.postId}>
						<Post>
							<p> {post.subject} </p>
							<p> {post.location} </p>
							<p> {post.availability} </p>
							<p> {post.rate} {post.unit} </p>
							<Button onClick={() => console.log("applied")}> Apply </Button>
						</Post>							
						<br />
					</div>
				);
			});
		}
		else {
			return(
				<div>
					<br />
					<h3> Unable to load any posts! </h3>
					<br />
				</div>
			);
		}
	}//end check if state is null
}

render() {
    return (
    <div>

		{this.createPostsTable()};

	{/*
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
	*/}
    </div>
    
    );
  }
}

function mapStateToProps(state) {
	return{
		userId: state.userId,
		email: state.email,

		legalFirstName: state.legalFirstName,
		legalLastName: state.legalLastName,
		bio: state.bio,

		major: state.major, //student props
		minor: state.minor,
	}
}

export default connect(mapStateToProps)(Table);


