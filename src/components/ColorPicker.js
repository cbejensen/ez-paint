import React from 'react'

export default function ColorPicker(props) {
  return (
    <fieldset className="color-picker">
      {props.colors.map((color, i) => (
        <label key={i}>
          <input
            name="color"
            type="radio"
            value={color}
            checked={props.activeColor === color}
            onChange={e => props.handleChange(i)}
          />
          <span style={{ background: color }} />
        </label>
      ))}
    </fieldset>
  )
}
