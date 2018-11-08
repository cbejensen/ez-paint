import React from 'react'
import TopBar from './TopBar'
import ColorBar from './ColorBar'

export default class ControlBar extends React.Component {
  constructor(props) {
    super(props)
    this.controlBarRef = React.createRef()
    this.state = {
      name: 'Untitled',
      activeColor: this.props.colors[0],
      mouseX: 0,
      mouseY: 0
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
  handleNameChange = e => {
    this.setState({ name: e.target.value })
  }
  handleColorChange = e => {
    console.log('got it')
    this.setState({ activeColor: e.target.value })
  }
  handleMouseMove = e => {
    this.setState({
      mouseX: e.pageX,
      mouseY: e.pageY - this.controlBarRef.current.offsetHeight
    })
  }
  setDocumentTitle = name => {
    document.title = `EZ Paint - ${name}`
  }
  render() {
    return (
      <header ref={this.controlBarRef} style={this.props.style}>
        <TopBar coords={[this.state.mouseX, this.state.mouseY]}>
          <input value={this.state.name} onChange={this.handleNameChange} />
        </TopBar>
        <div
          className="color-bar"
          style={{ background: this.state.activeColor }}
        >
          {this.props.colors.map((color, i) => (
            <label key={i}>
              <input
                name="color"
                type="radio"
                value={color}
                checked={this.state.activeColor === color}
                onChange={this.handleColorChange}
              />
              <span style={{ background: color }} />
            </label>
          ))}
        </div>
      </header>
    )
  }
}
ControlBar.defaultProps = {
  colors: ['coral', 'aqua', 'lightgreen', 'black']
}
