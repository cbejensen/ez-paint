import React from 'react'
import ControlBar from './ControlBar'
import Canvas from './Canvas'
import '../App.css'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <ControlBar />
        <Canvas />
      </div>
    )
  }
}

export default App
