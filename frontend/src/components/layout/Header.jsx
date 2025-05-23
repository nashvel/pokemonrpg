import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('pokemon_game_username') || 'Trainer';
  const isAuthenticated = localStorage.getItem('pokemon_game_token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('pokemon_game_token');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <header className="bg-pokemon-red pixel-bg-red">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
              alt="Pokeball" 
              className="w-8 h-8"
            />
            <span className="pixel-font text-white text-lg">Pokémon RPG</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated && (
            <>
              <Link to="/game" className="text-white hover:text-yellow-200 font-medium transition">
                Game
              </Link>
              <Link to="/customize" className="text-white hover:text-yellow-200 font-medium transition">
                Character
              </Link>
            </>
          )}
        </nav>

        {/* User Menu */}
        <div className="relative">
          {isAuthenticated ? (
            <div className="flex items-center">
              <span className="text-white mr-3 hidden md:inline">Hello, {username}</span>
              <button 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pokemon-red font-bold relative"
                onClick={() => setShowMenu(!showMenu)}
              >
                {username.charAt(0).toUpperCase()}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 top-full w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 pixel-border">
                  <div className="py-1">
                    <Link 
                      to="/game" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setShowMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/customize" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setShowMenu(false)}
                    >
                      Customize Character
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login" className="px-4 py-1 bg-white text-pokemon-red font-medium rounded">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-1 bg-pokemon-yellow text-gray-900 font-medium rounded">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
