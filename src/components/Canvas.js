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
    const ctx = this.canvasRef.current.getContext('2d')
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = 10
    this.ctx = ctx
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.draw) {
      this.ctx.strokeStyle = this.props.color
      this.ctx.beginPath()
      this.ctx.moveTo(prevProps.mouseCoords[0], prevProps.mouseCoords[1])
      this.ctx.lineTo(this.props.mouseCoords[0], this.props.mouseCoords[1])
      this.ctx.stroke()
    }
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
