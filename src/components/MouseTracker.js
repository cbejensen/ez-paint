import React from 'react'

export default class MouseTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: null,
      y: null
    }
  }
  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove)
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
  }
  handleMouseMove = e => {
    this.setState({
      x: e.pageX,
      y: e.pageY
    })
  }
  render() {
    return React.Children.only(this.props.children(this.state.x, this.state.y))
  }
}
