import React from 'react'
// import Slides from '../../components/slides/Slides'
// import ColorPalette from '../../components/Palette/ColorPalette'
import Navbar from '../../components/navbar/Navbar'
import Toolkit from '../../components/Toolkit/Toolkit'
import Whiteboard from '../../components/whiteboard/Whiteboard'

export default function MainPage() {
  return (
    <>
      <Navbar/>
      <Whiteboard/>
      <Toolkit/>
    </>
  )
}
