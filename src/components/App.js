import React from 'react'
import Paint from './Paint'
import '../App.css'

export default function App(props) {
  return (
    <Paint
      colors={[
        'maroon',
        'red',
        'orange',
        'yellow',
        'blue',
        'lightblue',
        'green',
        'lightgreen',
        'purple',
        'pink',
        'black',
        'white'
      ]}
    />
  )
}
