import React from 'react'

export default class ControlledInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.initialValue || ''
    }
  }
  handleChange = e => {
    this.setState({ name: e.target.value })
    if (this.props.handleChange) {
      console.log('got it')
      this.props.handleChange(e)
    }
  }
  render() {
    const { initialValue, handleChange, ...rest } = this.props
    return (
      <input value={this.state.name} onChange={this.handleChange} {...rest} />
    )
  }
}
