import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Protected from './components/Protected'; // Asegúrate de que el nombre coincida exactamente

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Protected element={Dashboard} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
