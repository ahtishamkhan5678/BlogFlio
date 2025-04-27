import React, { useState } from 'react';
import { Newspaper, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from '../navigation/Link';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-blue-600">
            <Newspaper className="h-6 w-6" />
            <span className="font-semibold text-xl">BlogFolio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/categories" className="text-slate-700 hover:text-blue-600 font-medium">
              Categories
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link to="/create-post">
              <Button variant="primary" size="sm">
                New Post
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 hover:text-blue-600 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-200 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-slate-700 hover:text-blue-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="text-slate-700 hover:text-blue-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-slate-700 hover:text-blue-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/create-post"
                className="px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="primary" size="sm" className="w-full">
                  New Post
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;