import React, { useContext, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { AppContext } from "../App";

function AuthModal({ show, onClose, mode, setMode }) {
    const { url, setToken, setUser } = useContext(AppContext);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const endpoint = mode === 'login' ? '/api/user/login' : '/api/user/register';
      try {
        const response = await axios.post(url + endpoint, formData);
        if (response.data.success) {
          setToken(response.data.token);
          setUser({ name: response.data.name, email: formData.email }); // Store user info
          localStorage.setItem("token", response.data.token);
          onClose();
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
        console.error(error);
      }
    };
  
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text" required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email" required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password" required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-green-600 hover:text-green-700 text-sm">
              {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default AuthModal