import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Recomendations from './Pages/Recomendations.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recomendations" element={<Recomendations />} />
    </Routes>
  )
}
