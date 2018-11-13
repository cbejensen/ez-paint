import React from 'react'
import MouseTracker from './MouseTracker'
import TextInput from './TextInput'
import Coords from './Coords'
import Select from './Select'
import Canvas from './Canvas'

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
          <Select items={props.colors}>
            {(activeIndex, setColor) => {
              // canvas Y coordinate needs to be adjusted to
              // account for header height
              const mouseYOffset =
                // make sure we have access to the element
                headerRef.current ? mouseY - headerRef.current.offsetHeight : 0
              const activeColor = props.colors[activeIndex]
              return (
                <>
                  <header
                    ref={headerRef}
                    style={{ borderTop: `10px solid ${activeColor}` }}
                  >
                    <div className="top-bar">
                      <TextInput>
                        {(val, handleChange, handleFocus) => (
                          <label className="header-name">
                            <input
                              value={val}
                              onChange={e => {
                                setDocTitle(e.target.value)
                                handleChange(e)
                              }}
                              onClick={handleFocus}
                              placeholder="Untitled"
                            />
                          </label>
                        )}
                      </TextInput>
                      {mouseYOffset >= 0 && (
                        <Coords x={mouseX} y={mouseYOffset} />
                      )}
                    </div>

                    {/* Color picker */}
                    <fieldset className="color-picker">
                      {props.colors.map((color, i) => (
                        <label key={i}>
                          <input
                            name="color"
                            type="radio"
                            value={color}
                            checked={activeColor === color}
                            onChange={() => setColor(i)}
                          />
                          <span style={{ background: color }} />
                        </label>
                      ))}
                    </fieldset>
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
