import { ChevronDown, User, ShoppingCart, Search } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold">FRNTR</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Names, SKUs, categories"
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 rounded-[50px]"
              size={20}
            />
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Shop
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Stories
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            Promotions <ChevronDown size={16} className="ml-1" />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            Room <ChevronDown size={16} className="ml-1" />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            Specials <ChevronDown size={16} className="ml-1" />
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <User className="text-gray-600" size={24} />
          <div className="relative">
            <ShoppingCart className="text-gray-600" size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </div>
          {/* <button className="border border-gray-300 px-2 py-1 rounded-md flex items-center">
            EN <ChevronDown size={16} className="ml-1" />
          </button> */}
        </div>
      </header>
  )
}

export default Header
