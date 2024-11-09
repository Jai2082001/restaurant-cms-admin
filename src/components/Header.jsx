import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Home, ClipboardList, User, Gift, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
    return (
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="text-gray-600 dark:text-gray-300">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gourmet Delights</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="w-16 h-18 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              Admin
            </div>
          </div>
        </div>
      </header>
    )
  }

  export default Header