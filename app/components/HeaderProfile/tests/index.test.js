import React from 'react';
import { shallow } from 'enzyme';

import HeaderProfile from '../index';

describe('<HeaderProfile />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <HeaderProfile />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
  });

  it('should have the sign out & feed buttons', () =>{
    const renderedComponent = shallow(
      <HeaderProfile />
    );
    expect(renderedComponent.contains(
      <table>
				<TD>
				<Button onClick={this.redirectToFeed}> Feed </Button>
				</TD>
				<TD>
				<Button href="/loggedOut"> Sign Out </Button>
				</TD>
			</table>
    )).tobe(true);
  });
});
