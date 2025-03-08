import React, { useState } from 'react';

const AuthForm = ({ title, buttonLabel, onSubmit, linkText, linkAction, isSignIn }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute inset-y-0 right-2 text-sm"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded">
                    {buttonLabel}
                </button>
            </form>
            <p className="mt-4 text-sm">
                {linkText}{' '}
                <button onClick={linkAction} className="text-blue-500 underline">
                    {isSignIn ? 'Sign Up' : 'Sign In'}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
