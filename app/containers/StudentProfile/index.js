/*
 * StudentProfile
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import Wrapper from './Wrapper';
import Modal from './Modal';
import Select from './Select';
import Img from './Img';
import profile from './default_profile_pic.jpg';

import A from 'components/A';
import H2 from 'components/H2';
import H1 from 'components/H1';
import Button from 'components/Button';
import Toggle from 'components/Toggle';
import ToggleOption from 'components/ToggleOption';


export default class StudentProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {

    return (
      <article>
        <Helmet>
          <title>Student Profile</title>
          <meta name="Tutorfind" content="A web app to connect students and teachers for improved learning" />
        </Helmet>
        
        <div>
        <H1>Student Profile</H1>
    <Form onSubmit={this.handleSubmit}>
    <Wrapper>
    
      {/* About Us */}
          <CenteredSection>
            <Img src={profile} alt="Profile Picture" />
            <input type="file" class="form-control" />
          </CenteredSection>
      {/* end About Us */}
          <CenteredSection>
            <label>First Name*</label>
            <Input type="text" name="firstName" placeholder="First Name" required="" />
          </CenteredSection>
          <CenteredSection>
            <label>Last Name*</label>
            <Input type="text" name="lastName" placeholder="Last Name" required="" />
          </CenteredSection>
      </Wrapper>
      <Wrapper>
      {/* Sign up */}
          <CenteredSection>
          </CenteredSection>
          <CenteredSection>
          <label >Current Major*</label>
          <select class="form-control form-control-lg" name="major" required="">
                  <option>Biology</option>
                  <option>Business</option>
                  <option>Computer Science</option>
                  <option>English</option>
                  <option>History</option>
          </select>
          </CenteredSection>
          <CenteredSection>
            <label>Minor</label>
            <Input type="text" name="minor" placeholder="Minor" />
          </CenteredSection>
          <CenteredSection>
      
      {/* Form */}
      
        <div>
              <label htmlFor="username">
                <Input
                  id="username"
                  type="text"
                  placeholder="User Name"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
          //required
                />
              </label>
        </div>
        
        <div>
        <label htmlFor="email">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={this.props.email}
                  onChange={this.props.onChangeEmail}
          //required
                />
              </label>
        </div>
        
        <div>
        <label htmlFor="password">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={this.props.password}
                  onChange={this.props.onChangePassword}
          //required
                />
              </label>
        </div>
        
        <div>
        <label htmlFor="confirmPassword">
                <Input
                  id="password"
                  type="password"
                  placeholder="Confirm Password"
                  value={this.props.password}
                  onChange={this.props.onChangePassword}
          //required
                />
              </label>
        </div>
        
        <div>
          <p> I am a 
           <Select>
            <option value="Student">Student</option>
            <option value="Tutor">Tutor</option>
          </Select> 
          
        </p>
        </div>
        
        <div>
        <Button> Sign Up </Button>
        </div>
        
        {/*
        <div>
        <Input
          type="submit"
          value="Submit"
        />
        </div> */}
        
      {/* end Form */}
      
       </CenteredSection>  
       {/* end Sign up */}
       
    </Wrapper>
    </Form>  
        </div>
      </article>
    );
  }
}
