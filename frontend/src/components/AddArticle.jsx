import React from 'react';
import { useForm } from 'react-hook-form';

function AddArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log('Article data:', data);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 underline">AddArticle.jsx</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-300 p-8 space-y-6">
          <div>
            <input
              type="text"
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 5, message: 'Title must be at least 5 characters' },
                maxLength: { value: 200, message: 'Title must not exceed 200 characters' },
              })}
              className="w-full px-4 py-6 bg-gray-400 text-center text-lg placeholder-black focus:outline-none"
              placeholder="Title"
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full px-4 py-6 bg-gray-400 text-center text-lg focus:outline-none"
            >
              <option value="">Category</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="business">Business</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <textarea
              rows="10"
              {...register('content', {
                required: 'Content is required',
                minLength: { value: 50, message: 'Content must be at least 50 characters' },
                maxLength: { value: 10000, message: 'Content must not exceed 10000 characters' },
              })}
              className="w-full px-4 py-6 bg-gray-400 text-center text-lg placeholder-black focus:outline-none resize-none"
              placeholder="Content"
            />
            {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold text-xl py-3 px-12 focus:outline-none"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;