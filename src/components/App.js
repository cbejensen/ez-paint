import React from 'react'
import Canvas from './Canvas'
import '../App.css'

export default class ezDraw extends React.Component {
  constructor(props) {
    super(props)
    this.headerRef = React.createRef()
    this.colors = ['coral', 'aqua', 'lightgreen', 'black']
    this.state = {
      name: 'Untitled',
      activeColor: this.colors[0],
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
  handleChange = (attr, e) => {
    this.setState({ [attr]: e.target.value })
  }
  handleMouseMove = e => {
    this.setState({
      mouseCoords: [e.pageX, e.pageY]
    })
  }
  setDocumentTitle = name => {
    document.title = `EZ Paint - ${name}`
  }
  render() {
    // canvas Y coordinate needs to be adjusted to
    // account for header height
    let canvasY = this.state.mouseCoords[1]
    if (this.headerRef && this.headerRef.current) {
      canvasY -= this.headerRef.current.offsetHeight
    }
    return (
      <div className="app">
        <header ref={this.headerRef}>
          <label className="header-name">
            <input
              value={this.state.name}
              onChange={e => this.handleChange('name', e)}
            />
          </label>
          <div className="color-picker">
            {this.colors.map((color, i) => (
              <label key={i}>
                <input
                  name="color"
                  type="radio"
                  value={color}
                  checked={this.state.activeColor === color}
                  onChange={e => this.handleChange('activeColor', e)}
                />
                <span style={{ background: color }} />
              </label>
            ))}
          </div>
          <div className="header-coords">
            <span className="coord-label">X</span>
            {this.state.mouseCoords[0]}
            <span className="coord-label">Y</span>
            {canvasY}
          </div>
        </header>
        <Canvas
          color={this.state.activeColor}
          mouseCoords={this.state.mouseCoords}
        />
      </div>
    )
  }
}
