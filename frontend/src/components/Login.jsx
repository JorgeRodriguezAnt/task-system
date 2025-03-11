import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Limpiar error antes de cada intento

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/tasks/api/token/',  // Asegúrate de que esta es la URL correcta
        { email, password },  // Enviamos email en lugar de username
        { withCredentials: true }  // Permitir envío de cookies (si usas sesiones)
      );

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

      navigate('/dashboard');  // Redirige al dashboard después del login
    } catch (err) {
      const errorMessage = err.response?.data?.detail === 'No active account found with the given credentials'
        ? 'Invalid email or password'
        : 'Error al iniciar sesión';
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign in</h1>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form noValidate onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
