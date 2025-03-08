import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import submission from '../../utils/submission';

const ManagerLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success] = useState(''); // State for success notification

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await submission('api/token/', 'post', formData);
            console.log('Backend response:', response);

            login({ access: response.access, refresh: response.refresh });  // Sử dụng login thay vì setTokens
            navigate('/admin-dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.detail || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
            {error && <p className="text-center text-red-500 mb-2">{error}</p>}
            {success && <p className="text-center text-green-500 mb-2">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                        >
                            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200">
                    Login
                </button>
            </form>
        </div>
    );
};

export default ManagerLogin;
