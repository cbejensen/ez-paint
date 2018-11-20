import React, { useState, useEffect, useRef } from 'react'
import Name from './Name'
import Coords from './Coords'
import ColorPicker from './ColorPicker'
import Canvas from './Canvas'
import useMouseCoords from '../hooks/useMouseCoords'

export default function Paint(props) {
  const [name, setName] = useState('')
  useEffect(
    () => {
      document.title = `EZ Paint - ${name || 'Untitled'}`
    },
    [name]
  )

  const [activeColorIndex, setColorIndex] = useState(0)
  const activeColor = props.colors[activeColorIndex]

  const [mouseX, mouseY] = useMouseCoords()

  const headerRef = useRef(null)
  const canvasY =
    headerRef.current && mouseY ? mouseY - headerRef.current.offsetHeight : null

  return (
    <div className="app">
      <header
        ref={headerRef}
        style={{ borderTop: `10px solid ${activeColor}` }}
      >
        <div className="top-bar">
          <Name name={name} handleChange={val => setName(val)} />
          {canvasY >= 0 && <Coords x={mouseX} y={canvasY} />}
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
          mouseX={mouseX}
          mouseY={canvasY}
          width={window.innerWidth}
          height={window.innerHeight - headerRef.current.offsetHeight}
        />
      )}
    </div>
  )
}
