import React from 'react';
import { useForm } from 'react-hook-form';

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: 'user',
    },
  });

  const password = watch('password');

  const onSubmit = (data) => {
    console.log('Registration data:', data);
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 underline">Register.jsx</h1>
        
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: { value: 2, message: 'First name must be at least 2 characters' },
                  maxLength: { value: 50, message: 'First name must not exceed 50 characters' },
                  pattern: { value: /^[A-Za-z\s]+$/, message: 'First name can only contain letters' },
                })}
                className="w-full px-4 py-6 bg-gray-400 text-center text-lg placeholder-black focus:outline-none"
                placeholder="First name"
              />
              {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <input
                type="text"
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                  maxLength: { value: 50, message: 'Last name must not exceed 50 characters' },
                  pattern: { value: /^[A-Za-z\s]+$/, message: 'Last name can only contain letters' },
                })}
                className="w-full px-4 py-6 bg-gray-400 text-center text-lg placeholder-black focus:outline-none"
                placeholder="Last name"
              />
              {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
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
                maxLength: { value: 100, message: 'Password must not exceed 100 characters' },
                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: 'Password must contain uppercase, lowercase, and number' },
              })}
              className="w-full px-4 py-6 bg-gray-400 text-center text-lg placeholder-black focus:outline-none"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <div className="w-full px-4 py-6 bg-gray-400 text-center text-lg cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                {...register('profileImage')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span>Upload profile image</span>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold text-xl py-3 px-16 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
                    