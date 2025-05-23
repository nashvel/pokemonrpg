import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Signup = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    // Simulate signup API call
    setTimeout(() => {
      // For prototype, we'll just set a token in localStorage
      localStorage.setItem('pokemon_game_token', 'dummy-token');
      localStorage.setItem('pokemon_game_username', username);
      
      toast.success('Welcome to the world of Pokémon!');
      setIsAuthenticated(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pixel-bg-battle flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating pixel elements */}
      <div className="absolute top-20 left-10 animate-float opacity-30">
        <div className="w-8 h-8 bg-green-400 pixelated"></div>
      </div>
      <div className="absolute bottom-40 right-20 animate-float-slow opacity-30">
        <div className="w-12 h-12 bg-orange-500 pixelated"></div>
      </div>
      <div className="absolute top-1/4 right-1/4 animate-float-slow opacity-20">
        <div className="w-10 h-10 bg-blue-300 pixelated"></div>
      </div>
      <div className="max-w-md w-full pixel-border bg-white p-1 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-4">
              <div className="pixel-border-sm bg-gray-50 p-1">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" 
                  alt="Bulbasaur" 
                  className="w-16 h-16 pixelated"
                />
              </div>
              <div className="pixel-border-sm bg-gray-50 p-1">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" 
                  alt="Charmander" 
                  className="w-16 h-16 pixelated"
                />
              </div>
              <div className="pixel-border-sm bg-gray-50 p-1">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" 
                  alt="Squirtle" 
                  className="w-16 h-16 pixelated"
                />
              </div>
            </div>
            <h2 className="pixel-font text-2xl text-gray-800 mb-2 mt-4">Join the Adventure</h2>
            <p className="text-gray-600">Create your Pokémon trainer account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Choose your trainer name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 pixel-font">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="your.email@example.com"
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
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 pixel-font">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            
            <div className="pt-2">
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
                    Creating account...
                  </div>
                ) : (
                  'Start Your Journey'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-pokemon-blue hover:text-blue-700 font-medium">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-8 py-4">
          <p className="text-xs text-center text-gray-500">
            By signing up, you agree to become the very best, like no one ever was.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
