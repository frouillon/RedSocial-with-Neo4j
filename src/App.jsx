import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Recomendations from './Pages/Recomendations.jsx'
import AllUsers from './Pages/AllUsers.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recomendations" element={<Recomendations />} />
      <Route path="/todos" element={<AllUsers />} />
    </Routes>
  )
}
