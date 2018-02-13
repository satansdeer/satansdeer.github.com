import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

@observer class Dice extends Component {
  @observable value = 1;
  @computed get computedValue() {
    return this.value > 3 ? 'WIN' : 'LOOSE'
  }

  render() {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.result}>Result: {this.value}</div>
        <div style={this.styles.result}>Computed Result: {this.computedValue}</div>
        <button onClick={this.handleRoll}>ROLL</button>
      </div>
    )
  }

  handleRoll = () => {
    this.value = Math.floor(Math.random()*6) + 1;
  }

  styles = {
    container: {
      padding: '16px 0px'
    },
    result: {
      fontSize: 22,
      marginBottom: 10
    }
  }
}
ReactDOM.render(<Dice />, document.getElementById('computed_dice'));
