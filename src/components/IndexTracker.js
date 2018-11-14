import React from 'react'

export default class IndexTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }
  setIndex = i => {
    this.setState({ activeIndex: i })
  }
  render() {
    return React.Children.only(
      this.props.children(this.state.activeIndex, this.setIndex)
    )
  }
}
