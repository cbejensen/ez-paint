import React from 'react'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      draw: false
    }
  }
  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d')
    this.init()
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.draw && prevProps.mouseX && prevProps.mouseY) {
      this.init()
      this.ctx.strokeStyle = this.props.color
      this.ctx.beginPath()
      this.ctx.moveTo(prevProps.mouseX, prevProps.mouseY)
      this.ctx.lineTo(this.props.mouseX, this.props.mouseY)
      this.ctx.stroke()
    }
  }
  init = () => {
    // if these are only in componentDidMount
    // for some reason they stop applying if
    // the viewport is resized.
    // Moving them here allows them to be
    // re-triggered on componentDidUpdate
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = 10
  }
  handleMouseClickChange(draw) {
    this.setState({ draw })
  }
  handleMouseMove = e => {
    if (this.state.draw) {
    }
    this.setState({ posX: e.pageX, posY: e.pageY })
  }
  clearCanvas = () => {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }
  render() {
    return (
      <>
        <canvas
          width={window.innerWidth}
          height={window.innerHeight}
          ref={this.canvasRef}
          onMouseDown={() => this.handleMouseClickChange(true)}
          onMouseUp={() => this.handleMouseClickChange(false)}
          onMouseOut={() => this.handleMouseClickChange(false)}
        />
        {!this.state.draw && (
          <button className="clear-btn" onClick={this.clearCanvas}>
            Clear
          </button>
        )}
      </>
    )
  }
}
