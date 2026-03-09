import React from 'react';
import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: 'user',
    },
  });

  const onSubmit = (data) => {
    console.log('Login data:', data);
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 underline">Login.jsx</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-300 p-8 space-y-6">
          <div className="text-center">
            <label className="text-xl font-semibold text-black mr-4">
              Select Role
            </label>
            <label className="inline-flex items-center space-x-2 cursor-pointer mr-6">
              <input
                type="radio"
                value="user"
                {...register('role', { required: 'Role is required' })}
                className="w-5 h-5 accent-cyan-500"
              />
              <span className="text-lg text-black">User</span>
            </label>
            <label className="inline-flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="author"
                {...register('role', { required: 'Role is required' })}
                className="w-5 h-5 accent-cyan-500"
              />
              <span className="text-lg text-black">Author</span>
            </label>
            {errors.role && (
              <p className="text-red-600 text-sm mt-2">{errors.role.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
              })}
              className="w-full px-4 py-6 bg-gray-400 text-center text-lg placeholder-black focus:outline-none"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              className="w-full px-4 py-6 bg-gray-400 text-center text-lg placeholder-black focus:outline-none"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold text-xl py-3 px-16 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;