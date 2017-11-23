import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      bottom: 0,
      left: 0,
      padding: 50,
      position: 'fixed',
      right: 0,
      top: 0
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      margin: '0 auto',
      maxWidth: 500,
      padding: 30,
      position: 'relative'
    };

    const closeButtonStyle = {
      position: 'absolute',
      right: 10,
      top: 10
    }

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          <div className="header">
            <button style={closeButtonStyle} onClick={this.props.onClose}></button>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
