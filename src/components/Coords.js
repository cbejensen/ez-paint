import React from 'react'

export default function Coords(props) {
  return (
    <div className="header-coords">
      <span className="coord-label">X</span>
      {props.coords[0]}
      <span className="coord-label">Y</span>
      {props.coords[1]}
    </div>
  )
}
