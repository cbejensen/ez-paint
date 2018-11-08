import React from 'react'
import Canvas from './Canvas'
import '../App.css'

export default class ezDraw extends React.Component {
  constructor(props) {
    super(props)
    this.headerRef = React.createRef()
    this.state = {
      name: 'Untitled',
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
  handleChange = (attr, val) => {
    this.setState({ [attr]: val })
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
    const activeColor = this.props.colors[this.state.activeColorIndex]
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
              onChange={e => this.handleChange('name', e.target.value)}
            />
          </label>
          <fieldset className="color-picker">
            {this.props.colors.map((color, i) => (
              <label key={i}>
                <input
                  name="color"
                  type="radio"
                  value={color}
                  checked={activeColor === color}
                  onChange={e => this.handleChange('activeColorIndex', i)}
                />
                <span style={{ background: color }} />
              </label>
            ))}
          </fieldset>
          <div className="header-coords">
            <span className="coord-label">X</span>
            {this.state.mouseCoords[0]}
            <span className="coord-label">Y</span>
            {canvasY}
          </div>
        </header>
        <Canvas color={activeColor} mouseCoords={this.state.mouseCoords} />
      </div>
    )
  }
}
