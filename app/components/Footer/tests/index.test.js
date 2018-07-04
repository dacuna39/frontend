import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import messages from '../messages';
import Footer from '../index';

describe('<Footer />', () => {
  it('should render About us and Contact us', () => {
    const renderedComponent = shallow(
      <Footer />
    );
    expect(renderedComponent.contains(
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
		  </List>
		</section>
	</Wrapper>
    )).toBe(true);
  });

});
