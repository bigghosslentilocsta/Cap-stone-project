import React, { useState } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import AddArticle from './components/AddArticle'

function App() {
  const [activeTab, setActiveTab] = useState('register')

  const renderComponent = () => {
    switch(activeTab) {
      case 'register':
        return <Register />
      case 'login':
        return <Login />
      case 'addArticle':
        return <AddArticle />
      default:
        return <Register />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab Navigation */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('register')}
              className={`py-4 px-6 font-semibold transition-colors border-b-4 ${
                activeTab === 'register'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`py-4 px-6 font-semibold transition-colors border-b-4 ${
                activeTab === 'login'
                  ? 'text-purple-600 border-purple-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('addArticle')}
              className={`py-4 px-6 font-semibold transition-colors border-b-4 ${
                activeTab === 'addArticle'
                  ? 'text-green-600 border-green-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Add Article
            </button>
          </div>
        </div>
      </div>

      {/* Component Display */}
      <div>
        {renderComponent()}
      </div>
    </div>
  )
}

export default App