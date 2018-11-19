import React, { useState, useEffect, useRef } from 'react'
import Name from './Name'
import Coords from './Coords'
import ColorPicker from './ColorPicker'
import Canvas from './Canvas'

export default function Paint(props) {
  const [name, setName] = useState('')
  const [activeColorIndex, setColorIndex] = useState(0)
  const [mouseCoords, setMouseCoords] = useState(null)
  useEffect(
    () => {
      document.title = `EZ Paint - ${name || 'Untitled'}`
    },
    [name]
  )
  useEffect(() => {
    function handleMouseMove(e) {
      setMouseCoords([e.pageX, e.pageY - headerRef.current.offsetHeight])
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])
  const headerRef = useRef({})
  // canvas height = window height - top bar
  let canvasHeight = window.innerHeight
  if (headerRef.current) {
    // if we have the ref to the header element
    canvasHeight -= headerRef.current.offsetHeight
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
          {mouseCoords !== null && mouseCoords[1] >= 0 && (
            <Coords x={mouseCoords[0]} y={mouseCoords[1]} />
          )}
        </div>
        <ColorPicker
          colors={props.colors}
          activeColor={activeColor}
          handleChange={i => setColorIndex(i)}
        />
      </header>
      {headerRef.current && (
        <Canvas
          color={activeColor}
          mouseCoords={mouseCoords}
          width={window.innerWidth}
          height={canvasHeight}
        />
      )}
    </div>
  )
}
