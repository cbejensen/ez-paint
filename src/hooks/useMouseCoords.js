import { useState, useEffect } from 'react'

export default function useMouseCoords() {
  const [mouseCoords, setMouseCoords] = useState([null, null])
  useEffect(() => {
    function handleMouseMove(e) {
      setMouseCoords([e.pageX, e.pageY])
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])
  return [mouseCoords[0], mouseCoords[1]]
}
