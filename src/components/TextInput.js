import React from 'react'

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  handleChange = e => {
    this.setState({ name: e.target.value })
  }
  handleFocus = e => {
    e.target.setSelectionRange(0, e.target.value.length)
  }
  render() {
    return React.Children.only(
      this.props.children(this.state.name, this.handleChange, this.handleFocus)
    )
  }
}
