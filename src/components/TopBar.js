import React from 'react'

export default function(props) {
  return (
    <div className="top-bar">
      <label className="top-bar__name top-bar__label">
        <span>Name</span>
        {props.children}
      </label>
      <div className="top-bar__coords">
        <span className="top-bar__label">X</span>
        {props.coords[0]}
        <span className="top-bar__label">Y</span>
        {props.coords[1]}
      </div>
    </div>
  )
}
