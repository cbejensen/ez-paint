import React from 'react'

export default class Text extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  handleChange = e => {
    this.setState({ name: e.target.value })
  }
  render() {
    return React.Children.only(
      this.props.children(this.state.name, this.handleChange, this.handleClick)
    )
  }
}
