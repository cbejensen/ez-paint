import React from 'react'
import Canvas from './Canvas'
import ColorPicker from './ColorPicker'
import Coords from './Coords'
import MouseTracker from './MouseTracker'
import Name from './Name'
import Select from './Select'
import TextInput from './TextInput'

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
          <Select>
            {(activeColorIndex, setColorIndex) => {
              // canvas Y coordinate needs to be adjusted to
              // account for header height
              const mouseYOffset =
                // make sure we have access to the element
                headerRef.current ? mouseY - headerRef.current.offsetHeight : 0
              const activeColor = props.colors[activeColorIndex]
              return (
                <>
                  <header
                    ref={headerRef}
                    style={{ borderTop: `10px solid ${activeColor}` }}
                  >
                    <div className="top-bar">
                      <TextInput>
                        {(value, setValue) => {
                          function updateNameAndTitle(e) {
                            setValue(e)
                            setDocTitle(e.target.value)
                          }
                          function highlight(e) {
                            e.target.setSelectionRange(0, e.target.value.length)
                          }
                          return (
                            <Name
                              value={value}
                              onChange={updateNameAndTitle}
                              onClick={highlight}
                            />
                          )
                        }}
                      </TextInput>
                      {mouseYOffset >= 0 && (
                        <Coords x={mouseX} y={mouseYOffset} />
                      )}
                    </div>
                    <ColorPicker
                      colors={props.colors}
                      activeColorIndex={activeColorIndex}
                      setColorIndex={setColorIndex}
                    />
                  </header>
                  <Canvas color={activeColor} mouseCoords={[mouseX, mouseY]} />
                </>
              )
            }}
          </Select>
        )}
      </MouseTracker>
    </div>
  )
}
