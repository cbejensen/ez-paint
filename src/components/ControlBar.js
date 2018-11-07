import React from 'react'

export default class ControlBar extends React.Component {
  constructor(props) {
    super(props)
    this.controlBarRef = React.createRef()
    this.state = {
      name: 'Untitled',
      color: this.props.colors[0],
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
      <header ref={this.controlBarRef} style={this.props.style}>
        <label className="cb-block cb-block__name">
          <span className="cb-block__title">Name</span>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </label>
        <div
          className="cb-block cb-block__colors"
          style={{ background: this.state.color }}
        >
          <span className="cb-block__title">Color</span>
          <div className="cb-color-row">
            {this.props.colors.map(color => (
              <label key={color}>
                <input
                  type="radio"
                  value={color}
                  checked={this.state.color === color}
                  onChange={this.handleColorChange}
                  className="color-radio"
                />
                <span
                  className="cb-color-square"
                  style={{ background: color }}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="cb-block cb-block__coords">
          <div className="cb-block__coord">
            <span className="cb-block__title">X</span>
            {this.state.mouseX}
          </div>
          <div className="cb-block__coord">
            <span className="cb-block__title">Y</span>
            {this.state.mouseY}
          </div>
        </div>
      </header>
    )
  }
}
ControlBar.defaultProps = {
  colors: ['coral', 'aqua', 'lightgreen', 'black']
}
