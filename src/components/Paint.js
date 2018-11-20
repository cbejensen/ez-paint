import React from 'react'
import Name from './Name'
import Coords from './Coords'
import ColorPicker from './ColorPicker'
import Canvas from './Canvas'

// export default function Paint(props) {
//   return (
//     <div className="app">
//       <header>
//         <div className="top-bar">
//           {/* name */}
//           {/* coords */}
//         </div>
//         {/* colors */}
//       </header>
//       {/* canvas */}
//     </div>
//   )
// }

export default class Paint extends React.Component {
  constructor(props) {
    super(props)
    this.headerRef = React.createRef()
    this.state = {
      name: '',
      activeColorIndex: 0,
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
  handleMouseMove = e => {
    this.setState({
      mouseX: e.pageX,
      mouseY: e.pageY - this.headerRef.current.offsetHeight
    })
  }
  setDocumentTitle = name => {
    document.title = `EZ Paint - ${name || 'Untitled'}`
  }
  render() {
    const activeColor = this.props.colors[this.state.activeColorIndex]
    return (
      <div className="app">
        <header
          ref={this.headerRef}
          style={{ borderTop: `10px solid ${activeColor}` }}
        >
          <div className="top-bar">
            <Name
              name={this.state.name}
              handleChange={val => this.setState({ name: val })}
            />
            {this.state.mouseY >= 0 && (
              <Coords x={this.state.mouseX} y={this.state.mouseY} />
            )}
          </div>
          <ColorPicker
            colors={this.props.colors}
            activeColor={activeColor}
            handleChange={i => this.setState({ activeColorIndex: i })}
          />
        </header>
        {this.headerRef.current && (
          <Canvas
            color={activeColor}
            mouseX={this.state.mouseX}
            mouseY={this.state.mouseY}
            width={window.innerWidth}
            height={window.innerHeight - this.headerRef.current.offsetHeight}
          />
        )}
      </div>
    )
  }
}
