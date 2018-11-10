import React from 'react'

export default function Name(props) {
  return (
    <label className="header-name">
      <input
        value={props.name}
        onChange={e => props.handleChange(e.target.value)}
        onClick={e => e.target.setSelectionRange(0, e.target.value.length)}
        placeholder="Untitled"
      />
    </label>
  )
}
