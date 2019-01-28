import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      error: ''
    }
  }

  handleIncrementCounter = () => {
    if (this.state.counter === 0) {
      this.setState({
        error: ''
      })
    }
    this.setState({
      counter: this.state.counter + 1
    })
  }

  handleDecrementCounter = () => {
    if (this.state.counter === 0) {
      this.setState({
        error: 'The counter cannot go below 0'
      })
    }
    if (this.state.counter > 0) {
      this.setState({
        counter: this.state.counter - 1
      })
    }
  }

  render() {  
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
        <h2 style={{color: 'red'}} data-test="error-display">{this.state.error}</h2>
        <button 
          data-test="increment-button"
          onClick={this.handleIncrementCounter}
        >
            Increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={this.handleDecrementCounter}
        >
          Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
