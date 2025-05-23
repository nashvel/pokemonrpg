import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top section with pixelated design */}
        <div className="h-6 bg-gray-700 w-full mb-4 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="inline-block w-6 h-6 relative">
              <div className={`absolute ${i % 2 === 0 ? 'bg-pokemon-red' : 'bg-pokemon-blue'} w-6 h-3`}></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Game Info */}
          <div>
            <h3 className="pixel-font text-sm mb-3 text-pokemon-yellow">Pokémon RPG</h3>
            <p className="text-gray-400 text-sm">
              A fan-made Pokémon web game prototype. Customize your character and start your adventure in the world of Pokémon!
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="pixel-font text-sm mb-3 text-pokemon-yellow">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="/game" className="text-gray-400 hover:text-white text-sm">Game Dashboard</a></li>
              <li><a href="/customize" className="text-gray-400 hover:text-white text-sm">Character Customization</a></li>
            </ul>
          </div>
          
          {/* Original Game Credits */}
          <div>
            <h3 className="pixel-font text-sm mb-3 text-pokemon-yellow">Original Game</h3>
            <p className="text-gray-400 text-sm">
              Pokémon and all related characters are property of Nintendo, Game Freak, and The Pokémon Company.
            </p>
          </div>
          
          {/* Sprites Credit */}
          <div>
            <h3 className="pixel-font text-sm mb-3 text-pokemon-yellow">Sprites</h3>
            <p className="text-gray-400 text-sm">
              Pokémon sprites courtesy of <a href="https://github.com/PokeAPI/sprites" className="text-pokemon-blue hover:text-blue-300">PokeAPI/sprites</a> repository.
            </p>
          </div>
        </div>
        
        {/* Bottom copyright */}
        <div className="pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Pokémon RPG Prototype
          </p>
          <p className="text-xs text-gray-500 mt-2 md:mt-0">
            This is a non-commercial fan project for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
