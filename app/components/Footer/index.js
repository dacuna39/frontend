import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';
import H2 from 'components/H2';
import List from './List';
import ListItem from './ListItem';

const YellowWrapper = styled.div`
 display: flex;
 justify-content: space-around;
 padding: 1em 0;

 border-top: 1px solid #666;
 background: #f5b01d;
`;

function Footer() {
  return (
  <div>
	<Wrapper>
		<section>
		  <H2> About Us </H2>
		  <p>We are fantastic and our project is awesome!</p>
		</section>

		<section>
	      <H2> Contact Us </H2>
		  <List>
			<ListItem>
				<A href="mailto:info@tutorfind.com">tutorfindapp@gmail.com</A>
			</ListItem>
			<ListItem>
				<p> (408) 123-2018 </p>
			</ListItem>
		  </List>
		</section>
	</Wrapper>
    
	
    <YellowWrapper>
      <section>
        <h4> <FormattedMessage {...messages.copyrightMessage} /> </h4>
      </section>
	  {/* max stoiber 
      <section>
        <LocaleToggle />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://twitter.com/mxstbr">Max Stoiber</A>,
          }}
        />
      </section>
	  */}
    </YellowWrapper>
	
  </div>	
  );
}

export default Footer;
