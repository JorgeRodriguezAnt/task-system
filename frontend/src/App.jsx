
import './App.css'
import { Routes, Route, Navigate } from 'react-router'
import Login from './components/Login'

function App() {
  return (
    <div>
      
      <main>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
