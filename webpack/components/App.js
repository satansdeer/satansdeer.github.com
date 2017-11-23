import React, { Component } from 'react';
import Modal from './Modal';
import Subscribe from './Subscribe';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.toggleModal}>
          Open the modal
        </button>

        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
          <Subscribe></Subscribe>
        </Modal>
      </div>
    );
  }
}

export default App;
