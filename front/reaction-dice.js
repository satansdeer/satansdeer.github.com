import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { observable, autorun } from 'mobx';
import { observer } from 'mobx-react';

@observer class Dice extends Component {
  @observable value = 1;

  constructor() {
    super();
    autorun(
      ()=> (this.value > 3) && alert('WIN')
    )
  }

  render() {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.result}>Result: {this.value}</div>
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
ReactDOM.render(<Dice />, document.getElementById('reaction_dice'));
