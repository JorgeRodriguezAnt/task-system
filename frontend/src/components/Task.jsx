import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Task = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tasks/api/tasks/list/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        });
        setTasks(response.data); // Ensure all tasks from the database are set
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tasks/api/tasks/statuses/');
        setStatuses(response.data);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tasks/api/companies/list/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        });
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const handleChange = async (id, field, value) => {
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, [field]: value } : task));
    setTasks(updatedTasks);

    try {
      const taskToUpdate = updatedTasks.find(task => task.id === id);
      await axios.put(`http://127.0.0.1:8000/tasks/api/tasks/${id}/`, taskToUpdate, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/api/tasks/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleArchive = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'Archived' ? 'Pending' : 'Archived';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const addTask = async () => {
    const newTask = {
      name: 'New Task',
      description: 'Task description',
      status: 'planning',
      company: companies[0]?.id || null, // Assign the first company by default
      user: localStorage.getItem('user_id'),
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/tasks/api/tasks/', newTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      setTasks([...tasks, response.data.task]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleAddCompany = async () => {
    if (!companyName.trim() || !companyEmail.trim()) return;
    try {
      const userId = localStorage.getItem('user_id');
      await axios.post(
        'http://127.0.0.1:8000/tasks/api/companies/',
        { name: companyName, email: companyEmail, user: userId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
      );
      setCompanyName('');
      setCompanyEmail('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      console.log('Updating task:', taskToUpdate); // Depuración: Verifica los datos enviados

      await axios.put(`http://127.0.0.1:8000/tasks/api/tasks/${id}/`, taskToUpdate, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });

      alert('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error.response || error); // Depuración: Muestra detalles del error
      alert('Failed to update task. Check the console for more details.');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gray-800 p-8">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-6 py-3 text-white bg-red-500 rounded-md hover:bg-red-600"
      >
        Logout
      </button>

      <h1 className="text-4xl font-bold text-white mb-6">Task Manager</h1>

      <div className="overflow-x-auto shadow rounded-2xl bg-white p-6 w-full max-w-6xl">
        <table className="min-w-full bg-white rounded-2xl">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Task</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-t">
                <td className="p-3">
                  <input
                    type="text"
                    value={task.name}
                    onChange={(e) => handleChange(task.id, 'name', e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    value={task.description}
                    onChange={(e) => handleChange(task.id, 'description', e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="p-3">
                  <select
                    value={task.company}
                    onChange={(e) => handleChange(task.id, 'company', e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  >
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <input
                    type="date"
                    value={task.date}
                    onChange={(e) => handleChange(task.id, 'date', e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="p-3">
                  <select
                    value={task.status}
                    onChange={(e) => handleChange(task.id, 'status', e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleAccept(task.id)}
                    className="px-3 py-1 text-white bg-green-500 hover:bg-green-600 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <button
            onClick={addTask}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            Add Task
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-8 px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
      >
        Add Company
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Company</h2>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <input
              type="email"
              placeholder="Company Email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCompany}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
