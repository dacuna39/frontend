import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/Button';

const ModalStyle = styled.div`
  background-color: #ccc;
  padding: 1em 2.3em;
`;

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <ModalStyle>
        <div>
          {this.props.children}
          <div className="footer">
            <Button onClick={this.props.onClose}>
              Close
            </Button>
          </div>
        </div>
      </ModalStyle>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;