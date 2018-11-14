import React from 'react'
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
    document.addEventListener('mousemove', this.handleMouseMove)
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name) {
      this.setDocumentTitle(this.state.name)
    }
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
  }
  handleMouseMove = e => {
    this.setState({
      mouseCoords: [e.pageX, e.pageY]
    })
  }
  setDocumentTitle = name => {
    document.title = `EZ Paint - ${name || 'Untitled'}`
  }
  render() {
    const activeColor = this.props.colors[this.state.activeColorIndex]
    // canvas Y coordinate needs to be adjusted to
    // account for header height
    let canvasYCoord = this.state.mouseCoords[1]
    let canvasHeight = window.innerHeight
    if (this.headerRef && this.headerRef.current) {
      let height = this.headerRef.current.offsetHeight
      // if we have the ref to the header element
      canvasYCoord -= height
      canvasHeight -= height
    }
    return (
      <div className="app">
        <header
          ref={this.headerRef}
          style={{ borderTop: `10px solid ${activeColor}` }}
        >
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
        <Canvas
          color={activeColor}
          mouseCoords={[this.state.mouseCoords[0], canvasYCoord]}
          width={window.innerWidth}
          height={canvasHeight}
        />
      </div>
    )
  }
}
