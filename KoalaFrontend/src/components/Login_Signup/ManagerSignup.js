import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import submission from '../../utils/submission';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const ManagerSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        confirmPassword: '',
        managerFullName: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const namePattern = /^[A-Za-z\s]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]+$/;
        const passwordPattern = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

        if (!namePattern.test(formData.firstName)) {
            setError('First name should contain only letters.');
            return false;
        }
        if (!namePattern.test(formData.lastName)) {
            setError('Last name should contain only letters.');
            return false;
        }
        if (!namePattern.test(formData.managerFullName)) {
            setError('Full name should contain only letters.');
            return false;
        }
        if (!emailPattern.test(formData.email)) {
            setError('Email format is invalid.');
            return false;
        }
        if (!phonePattern.test(formData.phoneNumber)) {
            setError('Phone number should contain only numbers.');
            return false;
        }
        if (!passwordPattern.test(formData.password)) {
            setError('Password must contain at least 1 special character, 1 lowercase letter, 1 uppercase letter, and 1 number.');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Confirm password does not match the password.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await submission('manager_register', 'post', {
                password: formData.password,
                email: formData.email,
                retype_password: formData.confirmPassword,
                first_name: formData.firstName,
                last_name: formData.lastName,
                address: formData.address,
                phone_number: formData.phoneNumber,
                manager_fullname: formData.managerFullName
            });
            console.log('Signup successful:', response.data);

            setSuccess('Signup Successfully');
            setError('');

            setTimeout(() => {
                navigate('/manager-login');
            }, 2000);
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.response?.data?.error || 'An error occurred');
            setSuccess('');
        }
    };

    const inputFields = [
        { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'First name' },
        { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Last name' },
        { label: 'Full Name', name: 'managerFullName', type: 'text', placeholder: 'Your full name' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'name@example.com' },
        { label: 'Phone Number', name: 'phoneNumber', type: 'tel', placeholder: 'Your phone number' },
        { label: 'Address', name: 'address', type: 'text', placeholder: 'Your address' },
    ];

    return (
        <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-2">Signup</h2>
            {error && <p className="text-center text-red-500 mb-2">{error}</p>}
            {success && <p className="text-center text-green-500 mb-2">{success}</p>}
            <form onSubmit={handleSubmit}>
                {inputFields.map((field) => (
                    <div key={field.name} className="mb-4">
                        <label htmlFor={field.name} className="block text-sm font-medium mb-1">
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            required
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}
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
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200">
                    Signup
                </button>
            </form>
        </div>
    );
};

export default ManagerSignup;
