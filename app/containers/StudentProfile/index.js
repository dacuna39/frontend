/*
 * StudentProfile
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import Wrapper from './Wrapper';
import Select from './Select';
import Img from './Img';
import profile from './default_profile_pic.jpg';

import A from 'components/A';
import H2 from 'components/H2';
import H1 from 'components/H1';
//import Button from 'components/Button';
import Toggle from 'components/Toggle';
import ToggleOption from 'components/ToggleOption';

const TextArea = styled.textarea`
  border: 1px solid #666;
  background: #ddd;
  padding: 1em;
`;

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

const LeftAlignSection = styled.section`
  text-align: left;
  padding-right: 15%;
`;

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
          <CenteredSection>  
            <H1>Student Profile</H1>
          </CenteredSection>

      {/* Profile pic, first and last name */}
      <Wrapper>
          <CenteredSection>
          <p> Profile Picture </p>
            <Img src={profile} alt="Profile Picture" />
              <input type="file" class="form-control" />
          </CenteredSection>
          
          <div>
          <LeftAlignSection>
            <p>First Name</p>
            <Input type="text" name="firstName" placeholder="First Name" required="" />
          </LeftAlignSection>

          <LeftAlignSection>
            <p>User Name</p>
            <Input type="text" name="userName" placeholder="User Name" required="" />
          </LeftAlignSection> 
          </div>

          <div>
          <LeftAlignSection>
            <p>Last Name</p>
            <Input type="text" name="lastName" placeholder="Last Name" required="" />
          </LeftAlignSection>
           

          <LeftAlignSection>
            <p>Email</p>
            <Input type="text" name="email" placeholder="Email" required="" />
          </LeftAlignSection>  
          </div>

      </Wrapper>

      {/* major, subjects, pay */}
      <Wrapper>
          <Section>
            <p>Current Major</p>
            <Select name="major" required="">
                  <option>Biology</option>
                  <option>English</option>
                  <option>Business</option>
                  <option>History</option>
                  <option>Computer Science</option>
                  <option>Math</option>
                  <option>Psychology</option>            
            </Select>
          </Section>

          <CenteredSection>
            <p>Subjects I Need Help With</p>
            <Select name="subjects" required="">
                  <option>English</option>
                  <option>Math</option>
                  <option>Biology</option>
                  <option>Chemistry</option>
                  <option>History</option>                 
                  <option>Business</option>
                  <option>Computer Science</option>
            </Select>
          </CenteredSection>

          <CenteredSection>
            <p>Pay Amount</p>
            <Select name="pay" required="">
                  <option>Free</option>
                  <option>$10</option>
                  <option>$20</option>
                  <option>$30</option>
                  <option>$40</option>               
                  <option>$50</option>
                  <option>$100</option>
            </Select>
          </CenteredSection>
      </Wrapper>

      {/* Bio */}
      <Wrapper>
          <CenteredSection>
            <p> Bio </p>
            <TextArea rows="5" cols="100" name="bio" placeholder="Experience, details, and other juicy info goes here!" 
                 required="" />
          </CenteredSection>
      </Wrapper>

      {/* save, cancel, change password, deactivate account */}
      <Wrapper>
          <CenteredSection>
            <Button> Save Changes </Button>
            <Button> Cancel </Button>
            <p> <a href="/"> Change Password </a> </p>
            <p> <a href="/"> Deactivate Account </a> </p>
          </CenteredSection>
      </Wrapper>

        </div>
      </article>
    );
  }
}
