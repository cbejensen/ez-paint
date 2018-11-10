import React from 'react'
import MouseTracker from './MouseTracker'
import Name from './Name'
import Coords from './Coords'
import ColorPicker from './ColorPicker'
import Canvas from './Canvas'

export default class Paint extends React.Component {
  constructor(props) {
    super(props)
    this.headerRef = React.createRef()
    this.state = {
      name: '',
      activeColorIndex: 0,
      mouseCoords: [0, 0]
    }
  }
  componentDidMount() {
    this.setDocumentTitle(this.state.name)
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name) {
      this.setDocumentTitle(this.state.name)
    }
  }
  setDocumentTitle = name => {
    document.title = `EZ Paint - ${name || 'Untitled'}`
  }
  render() {
    const activeColor = this.props.colors[this.state.activeColorIndex]
    // canvas Y coordinate needs to be adjusted to
    // account for header height
    let canvasYCoord = this.state.mouseCoords[1]
    if (this.headerRef && this.headerRef.current) {
      // if we have the ref to the header element
      canvasYCoord -= this.headerRef.current.offsetHeight
    }
    return (
      <div className="app">
        <MouseTracker>
          {(mouseX, mouseY) => (
            <>
              <header ref={this.headerRef}>
                <div className="top-bar">
                  <Name
                    name={this.state.name}
                    handleChange={val => this.setState({ name: val })}
                  />
                  {canvasYCoord >= 0 && (
                    <Coords x={this.state.mouseCoords[0]} y={canvasYCoord} />
                  )}
                </div>
                <ColorPicker
                  colors={this.props.colors}
                  activeColor={activeColor}
                  handleChange={i => this.setState({ activeColorIndex: i })}
                />
              </header>
              <Canvas color={activeColor} mouseCoords={[mouseX, mouseY]} />
            </>
          )}
        </MouseTracker>
      </div>
    )
  }
}
