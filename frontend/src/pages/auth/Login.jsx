import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      // For prototype, we'll just set a token in localStorage
      localStorage.setItem('pokemon_game_token', 'dummy-token');
      localStorage.setItem('pokemon_game_username', username);
      
      toast.success('Welcome back, Trainer!');
      setIsAuthenticated(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pixel-bg-center flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating pixel elements */}
      <div className="absolute top-20 left-10 animate-float opacity-30">
        <div className="w-8 h-8 bg-red-400 pixelated"></div>
      </div>
      <div className="absolute bottom-40 right-20 animate-float-slow opacity-30">
        <div className="w-12 h-12 bg-blue-500 pixelated"></div>
      </div>
      <div className="absolute top-1/4 right-1/4 animate-float-slow opacity-20">
        <div className="w-10 h-10 bg-yellow-300 pixelated"></div>
      </div>
      
      <div className="max-w-md w-full pixel-border bg-white p-1 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
              alt="Pikachu" 
              className="w-24 h-24 mx-auto"
            />
            <h2 className="pixel-font text-2xl text-gray-800 mb-2">Trainer Login</h2>
            <p className="text-gray-600">Sign in to continue your Pokémon journey!</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 pixel-font">
                Trainer Name
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="Enter your trainer name"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 pixel-font">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full pixel-border ${loading ? 'bg-gray-400' : 'bg-pokemon-red'} p-2 text-white pixel-font hover:brightness-110 transition-all`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New to Pokémon RPG?{' '}
              <Link to="/signup" className="text-pokemon-blue hover:text-blue-700 font-medium">
                Create a trainer account
              </Link>
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-8 py-4">
          <div className="flex items-center justify-center gap-4">
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" 
              alt="Bulbasaur" 
              className="w-10 h-10"
            />
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" 
              alt="Charmander" 
              className="w-10 h-10"
            />
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" 
              alt="Squirtle" 
              className="w-10 h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
