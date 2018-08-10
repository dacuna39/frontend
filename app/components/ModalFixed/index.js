import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//import Button from 'components/Button';
import buttonStyles from 'components/Button/buttonStyles';

const Button = styled.button`${buttonStyles}`;

const ModalStyle = styled.div`
position: fixed;

right: 0;
left: 0;
top: 1.5em;
margin-right: auto;
margin-left: auto;

min-height: 10em;
width: 60%;

  background-color: #ccc;
  padding: 0.75em;
`;

class ModalFixed extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <ModalStyle>
        <div className="footer" style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button onClick={this.props.onClose}> Close </Button>
        </div>
          {this.props.children}
      </ModalStyle>
    );
  }
}

ModalFixed.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default ModalFixed;