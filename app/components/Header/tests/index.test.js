import React from 'react';
import { shallow } from 'enzyme';

import Header from '../index';

describe('<Header />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <Header />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
  });

  it('should have the sign in button', () =>{
    const renderedComponent = shallow(
      <Header />
    );
    expect(renderedComponent.contains(
      <section>
				<Button onClick={this.toggleModal}> Sign In </Button>
			</section>
    )).tobe(true);
  });
});
