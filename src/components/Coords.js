import React from 'react'

export default function Coords(props) {
  return (
    <div className="header-coords">
      <span className="coord-label">X</span>
      {props.x}
      <span className="coord-label">Y</span>
      {props.y}
    </div>
  )
}
