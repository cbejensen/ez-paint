import React from 'react'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      posX: 0,
      posY: 0,
      draw: false
    }
  }
  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d')
    ctx.strokeStyle = 'red'
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = 10
    this.ctx = ctx
  }
  handleMouseClickChange(draw) {
    this.setState({ draw })
  }
  handleMouseMove = e => {
    if (this.state.draw) {
      this.ctx.beginPath()
      this.ctx.moveTo(this.state.posX, this.state.posY)
      this.ctx.lineTo(e.pageX, e.pageY)
      this.ctx.stroke()
    }
    this.setState({ posX: e.pageX, posY: e.pageY })
  }
  clearCanvas = () => {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }
  render() {
    return (
      <div>
        <canvas
          width={window.innerWidth}
          height={window.innerHeight}
          ref={this.canvasRef}
          onMouseMove={this.handleMouseMove}
          onMouseDown={() => this.handleMouseClickChange(true)}
          onMouseUp={() => this.handleMouseClickChange(false)}
          onMouseOut={() => this.handleMouseClickChange(false)}
        >
          Canvas
        </canvas>
        <button
          onClick={this.clearCanvas}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0
          }}
        >
          clear
        </button>
      </div>
    )
  }
}
