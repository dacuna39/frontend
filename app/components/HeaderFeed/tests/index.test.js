import React from 'react';
import { shallow } from 'enzyme';

import HeaderFeed from '../index';

describe('<HeaderFeed />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <HeaderFeed />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
  });

  it('should have the sign out & edit profile buttons', () =>{
    const renderedComponent = shallow(
      <HeaderFeed />
    );
    expect(renderedComponent.contains(
      <table>
			<tbody>
				<TD>
				<Button onClick={this.redirectToProfile}> Edit Profile </Button>
				</TD>
				<TD>
				<Button href="/loggedOut"> Sign Out </Button>
				</TD>
			</tbody>
			</table>
    )).tobe(true);
  });
});
