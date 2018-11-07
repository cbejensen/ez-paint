import React from 'react'

export default class ControlBar extends React.Component {
  constructor(props) {
    super(props)
    this.colors = props.colors || ['coral', 'aqua', 'lightgreen']
    this.controlBarRef = React.createRef()
    this.state = {
      name: 'Untitled',
      color: this.colors[0],
      mouseX: null,
      mouseY: null
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
    this.setState({ color: e.target.value })
  }
  handleMouseMove = e => {
    this.setState({
      mouseX: e.pageX,
      mouseY: e.pageY - this.controlBarRef.current.clientHeight
    })
  }
  setDocumentTitle = name => {
    document.title = `EZ Paint - ${name}`
  }
  render() {
    return (
      <header ref={this.controlBarRef} style={{ background: this.state.color }}>
        <label className="cb__name">
          Name:
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </label>
        <div className="cb__colors">
          Color:
          {this.colors.map(color => (
            <label key={color}>
              <input
                type="radio"
                value={color}
                checked={this.state.color === color}
                onChange={this.handleColorChange}
                className="color-radio"
              />
              <span style={{ background: color }} />
            </label>
          ))}
        </div>
        <div className="cb__position">
          {this.state.mouseX} {this.state.mouseY}
        </div>
      </header>
    )
  }
}
