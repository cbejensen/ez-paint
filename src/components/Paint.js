import React from 'react'
import Canvas from './Canvas'
import ColorPicker from './ColorPicker'
import ControlledInput from './ControlledInput'
import Coords from './Coords'
import IndexTracker from './IndexTracker'
import MouseTracker from './MouseTracker'

export default function Paint(props) {
  function setDocTitle(name) {
    document.title = `EZ Paint - ${name || 'Untitled'}`
  }
  setDocTitle()
  let headerRef = React.createRef()
  return (
    <div className="app">
      <MouseTracker>
        {(mouseX, mouseY) => (
          <IndexTracker>
            {(activeColorIndex, setColorIndex) => {
              // canvas Y coordinate needs to be adjusted to
              // account for header height
              const mouseYOffset =
                // make sure we have access to the element
                headerRef.current
                  ? mouseY - headerRef.current.offsetHeight
                  : null
              const activeColor = props.colors[activeColorIndex]
              return (
                <>
                  <header
                    ref={headerRef}
                    style={{ borderTop: `10px solid ${activeColor}` }}
                  >
                    <div className="top-bar">
                      <label className="header-name">
                        <ControlledInput
                          placeholder="Untitled"
                          handleChange={e => setDocTitle(e.target.value)}
                          onClick={e =>
                            e.target.setSelectionRange(0, e.target.value.length)
                          }
                        />
                      </label>
                      {mouseYOffset !== null && mouseY >= 0 && (
                        <Coords x={mouseX} y={mouseYOffset} />
                      )}
                    </div>
                    <ColorPicker
                      colors={props.colors}
                      activeColorIndex={activeColorIndex}
                      setColorIndex={setColorIndex}
                    />
                  </header>
                  {headerRef.current && (
                    <Canvas
                      width={window.innerWidth}
                      height={
                        window.innerHeight - headerRef.current.offsetHeight
                      }
                      color={activeColor}
                      mouseCoords={[mouseX, mouseYOffset]}
                    />
                  )}
                </>
              )
            }}
          </IndexTracker>
        )}
      </MouseTracker>
    </div>
  )
}
