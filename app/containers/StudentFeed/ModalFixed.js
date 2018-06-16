import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/Button';

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
  padding: 1em;
`;

class ModalFixed extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <ModalStyle>
        <div>
          {this.props.children}
            <Button onClick={this.props.onClose}>
              Close
            </Button>
        </div>
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