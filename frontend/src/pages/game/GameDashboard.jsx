import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const GameDashboard = () => {
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const username = localStorage.getItem('pokemon_game_username') || 'Trainer';
  const [currentLocation, setCurrentLocation] = useState('Pallet Town');
  const [showMenu, setShowMenu] = useState(false);
  
  // Mock player stats
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    experience: 0,
    nextLevel: 100,
    money: 500,
    badges: 0,
    pokemonSeen: 1,
    pokemonCaught: 1,
    steps: 0
  });

  useEffect(() => {
    // Load character data
    const characterData = localStorage.getItem('pokemon_game_character');
    if (characterData) {
      setCharacter(JSON.parse(characterData));
    }
  }, []);

  const handleLogout = () => {
    // Confirm before logout
    if (window.confirm('Are you sure you want to log out?')) {
      // Clear only the auth token, keep character data for next login
      localStorage.removeItem('pokemon_game_token');
      toast.success('Successfully logged out');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen pixel-bg-grass flex flex-col">
      {/* Main Header */}
      <header className="bg-pokemon-red shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                alt="Pikachu"
                className="w-12 h-12 mr-3"
              />
              <h1 className="text-2xl font-bold text-white">Pokémon RPG</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <p className="text-sm">{currentLocation}</p>
              </div>
              
              <div 
                className="relative flex items-center cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-pokemon-red font-bold">
                  {username.charAt(0).toUpperCase()}
                </div>
                
                {showMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                      <li 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                        onClick={handleLogout}
                      >
                        Log out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Trainer Info */}
            <div className="col-span-1">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Trainer Profile</h2>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Level {playerStats.level}
                  </span>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl mr-4">
                    {character?.gender === 'female' ? '♀️' : '♂️'}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{username}</h3>
                    <p className="text-sm text-gray-600">{character?.region} Region</p>
                    <div className="flex items-center mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{width: `${(playerStats.experience / playerStats.nextLevel) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        {playerStats.experience}/{playerStats.nextLevel} XP
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Badges</h4>
                    <div className="flex space-x-2">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-8 h-8 rounded-full ${i < playerStats.badges ? 'bg-pokemon-blue' : 'bg-gray-200'}`}
                          title={`Badge ${i+1}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Stats</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-xs text-blue-600">Pokémon Seen</p>
                        <p className="text-lg font-semibold">{playerStats.pokemonSeen}</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-xs text-green-600">Pokémon Caught</p>
                        <p className="text-lg font-semibold">{playerStats.pokemonCaught}</p>
                      </div>
                      <div className="bg-yellow-50 p-2 rounded">
                        <p className="text-xs text-yellow-600">Money</p>
                        <p className="text-lg font-semibold">₽{playerStats.money}</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <p className="text-xs text-purple-600">Steps</p>
                        <p className="text-lg font-semibold">{playerStats.steps}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-lg transition-colors text-sm">
                      Explore
                    </button>
                    <button className="bg-green-100 hover:bg-green-200 text-green-800 py-2 px-4 rounded-lg transition-colors text-sm">
                      Catch Pokémon
                    </button>
                    <button className="bg-red-100 hover:bg-red-200 text-red-800 py-2 px-4 rounded-lg transition-colors text-sm">
                      Battle
                    </button>
                    <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-4 rounded-lg transition-colors text-sm">
                      Shop
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Middle Column - Active Pokémon Team */}
            <div className="col-span-1">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Your Pokémon</h2>
                
                {character && character.starter && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${character.starter.id}.png`}
                        alt={character.starter.name}
                        className="w-24 h-24 mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {character.starter.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span className="mr-3">Lv. 5</span>
                          <span>HP: 20/20</span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                            <div className="bg-green-600 h-1.5 rounded-full w-full"></div>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>XP:</span>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 ml-1">
                              <div className="bg-blue-600 h-1.5 rounded-full w-[20%]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="bg-white p-2 rounded border border-gray-100">
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="text-sm font-medium">
                          {character.starter.id === 1 || character.starter.id === 152 || character.starter.id === 252 || character.starter.id === 387 || character.starter.id === 495 ? 'Grass' : 
                           character.starter.id === 4 || character.starter.id === 155 || character.starter.id === 255 || character.starter.id === 390 || character.starter.id === 498 ? 'Fire' : 
                           'Water'}
                        </p>
                      </div>
                      <div className="bg-white p-2 rounded border border-gray-100">
                        <p className="text-xs text-gray-500">Ability</p>
                        <p className="text-sm font-medium">
                          {character.starter.id === 1 || character.starter.id === 152 || character.starter.id === 252 || character.starter.id === 387 || character.starter.id === 495 ? 'Overgrow' : 
                           character.starter.id === 4 || character.starter.id === 155 || character.starter.id === 255 || character.starter.id === 390 || character.starter.id === 498 ? 'Blaze' : 
                           'Torrent'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Moves</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white p-2 rounded border border-gray-100">
                          <p className="text-sm font-medium">Tackle</p>
                          <p className="text-xs text-gray-500">Normal • 40 Power</p>
                        </div>
                        <div className="bg-white p-2 rounded border border-gray-100">
                          <p className="text-sm font-medium">Growl</p>
                          <p className="text-xs text-gray-500">Normal • Status</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors">
                    + Add Pokemon Slot
                  </button>
                </div>
                
                <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <h3 className="font-medium text-yellow-800 mb-2">Hint</h3>
                  <p className="text-sm text-yellow-700">
                    Explore the world to encounter wild Pokémon! Click on "Explore" or "Catch Pokémon" to begin your adventure.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - World Map & Notifications */}
            <div className="col-span-1">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">World Map</h2>
                <div className="relative bg-green-100 h-56 rounded-lg overflow-hidden mb-2">
                  {/* This would be a map in a real game - using placeholder for prototype */}
                  <div className="absolute inset-0 bg-[url('https://archives.bulbagarden.net/media/upload/3/3c/Kanto_FRLG_with_sevii.png')] bg-cover bg-center opacity-70"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full p-2 animate-pulse">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/80 py-1 px-2 rounded text-xs">
                    {character?.region || 'Kanto'} Region
                  </div>
                </div>
                <p className="text-sm text-center text-gray-500">You are in {currentLocation}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6 mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Latest News</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-3 py-1">
                    <p className="text-sm font-medium">Welcome to the world of Pokémon!</p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <p className="text-sm font-medium">Professor Oak wants to see you</p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-3 py-1">
                    <p className="text-sm font-medium">A wild Rattata was spotted nearby!</p>
                    <p className="text-xs text-gray-500">10 minutes ago</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6 mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Game Controls</h2>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div></div>
                  <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded text-center">
                    ▲
                  </button>
                  <div></div>
                  <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded text-center">
                    ◄
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded text-center">
                    ▼
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded text-center">
                    ►
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full text-center text-sm">
                    A
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full text-center text-sm">
                    B
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center">Pokémon RPG Prototype © 2025 | <span className="text-gray-400">Not affiliated with Nintendo or The Pokémon Company</span></p>
        </div>
      </footer>
    </div>
  );
};

export default GameDashboard;
