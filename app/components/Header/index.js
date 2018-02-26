import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import logo from './tutorfindlogo.png';
import messages from './messages';
import Wrapper from './Wrapper';
import Button from 'components/Button';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
		<Wrapper>
			<section>
				<A href="/">
					<Img src={logo} alt="Tutorfind - Logo" length="100px" width="100px"/>
				</A>
			</section>
			<section>
				<Button> Sign In </Button>
			</section>
		</Wrapper> 
      </div>
    );
  }
}

export default Header;
