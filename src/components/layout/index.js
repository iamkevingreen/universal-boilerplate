import React, { Component } from 'react'

if(process.env.WEBPACK) require('../../styles/app.scss');

class App extends Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    )
  }
}

export default App
