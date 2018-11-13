import React, { useState, useEffect, useRef } from 'react'
import Name from './Name'
import Coords from './Coords'
import ColorPicker from './ColorPicker'
import Canvas from './Canvas'

export default function Paint(props) {
  const [name, setName] = useState('')
  const [activeColorIndex, setColorIndex] = useState(0)
  const [mouseCoords, setMouseCoords] = useState([0, 0])
  useEffect(
    () => {
      document.title = `EZ Paint - ${name || 'Untitled'}`
    },
    [name]
  )
  useEffect(
    () => {
      function handleMouseMove(e) {
        setMouseCoords([e.pageX, e.pageY])
      }
      document.addEventListener('mousemove', handleMouseMove)
      return () => document.removeEventListener('mousemove', handleMouseMove)
    },
    [mouseCoords]
  )
  const headerRef = useRef(null)
  // canvas Y coordinate needs to be adjusted to
  // account for header height
  let offsetYCoord = mouseCoords[1]
  if (headerRef && headerRef.current) {
    // if we have the ref to the header element
    offsetYCoord -= headerRef.current.offsetHeight
  }
  const activeColor = props.colors[activeColorIndex]
  return (
    <div className="app">
      <header
        ref={headerRef}
        style={{ borderTop: `10px solid ${activeColor}` }}
      >
        <div className="top-bar">
          <Name name={name} handleChange={val => setName(val)} />
          {offsetYCoord >= 0 && <Coords x={mouseCoords[0]} y={offsetYCoord} />}
        </div>
        <ColorPicker
          colors={props.colors}
          activeColor={activeColor}
          handleChange={i => setColorIndex(i)}
        />
      </header>
      <Canvas color={activeColor} mouseCoords={mouseCoords} />
    </div>
  )
}
