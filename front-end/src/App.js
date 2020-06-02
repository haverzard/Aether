import React from 'react'
import Home from './container/Home/Home.js'
import web3 from './web3/web3.js'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
  return (
    <div className="App">
      <Home />
    </div>
  )}
}

export default App;
