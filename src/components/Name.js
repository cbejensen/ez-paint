import React from 'react'

export default function Name(props) {
  return (
    <label className="header-name">
      <input value={props.value} placeholder="Untitled" {...props} />
    </label>
  )
}
