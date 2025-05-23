import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CharacterCustomization = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('pokemon_game_username') || 'Trainer';
  
  // Character customization options
  const [gender, setGender] = useState('male');
  const [skinTone, setSkinTone] = useState(0);
  const [hairStyle, setHairStyle] = useState(0);
  const [hairColor, setHairColor] = useState(0);
  const [outfit, setOutfit] = useState(0);
  const [starterRegion, setStarterRegion] = useState('kanto');
  const [selectedStarter, setSelectedStarter] = useState(1); // Bulbasaur default
  
  // Option arrays
  const skinTones = ['#FFDBAC', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'];
  const hairStyles = ['Short', 'Medium', 'Long', 'Curly', 'Spiky'];
  const hairColors = ['#090806', '#E8E1E1', '#B55239', '#8C4B2A', '#F2DA91'];
  const outfits = ['Classic Trainer', 'Adventure', 'Gym Challenger', 'Contest', 'Casual'];
  
  // Character sprites - organized by gender, outfit, and hair style for proper combinations
  const characterSprites = {
    male: {
      classic: { // Classic Trainer outfit
        short: 'https://archives.bulbagarden.net/media/upload/3/3e/Spr_BW_Hilbert.png',
        medium: 'https://archives.bulbagarden.net/media/upload/f/f1/Spr_RG_Red.png',
        long: 'https://archives.bulbagarden.net/media/upload/b/ba/Spr_B2W2_N.png',
        curly: 'https://archives.bulbagarden.net/media/upload/1/10/Spr_B2W2_Brock.png',
        spiky: 'https://archives.bulbagarden.net/media/upload/d/d6/Spr_B2W2_Volkner.png'
      },
      adventure: { // Adventure outfit
        short: 'https://archives.bulbagarden.net/media/upload/3/3e/Spr_BW_Hilbert.png',
        medium: 'https://archives.bulbagarden.net/media/upload/c/c4/Spr_FRLG_Red.png',
        long: 'https://archives.bulbagarden.net/media/upload/b/b9/Spr_BW_Ranger_M.png',
        curly: 'https://archives.bulbagarden.net/media/upload/4/40/Spr_B2W2_Veteran_M.png',
        spiky: 'https://archives.bulbagarden.net/media/upload/b/be/Spr_B2W2_Barry.png'
      },
      gym: { // Gym Challenger outfit
        short: 'https://archives.bulbagarden.net/media/upload/0/03/Spr_B2W2_Hilbert.png',
        medium: 'https://archives.bulbagarden.net/media/upload/d/d5/Spr_B2W2_Marlon.png',
        long: 'https://archives.bulbagarden.net/media/upload/4/46/Spr_B2W2_Hugh.png',
        curly: 'https://archives.bulbagarden.net/media/upload/1/1f/Spr_B2W2_Cheren.png',
        spiky: 'https://archives.bulbagarden.net/media/upload/6/63/Spr_B2W2_Drayden.png'
      },
      contest: { // Contest outfit
        short: 'https://archives.bulbagarden.net/media/upload/0/0c/Spr_B2W2_Nate.png',
        medium: 'https://archives.bulbagarden.net/media/upload/a/a9/Spr_B2W2_Gentleman.png',
        long: 'https://archives.bulbagarden.net/media/upload/9/97/Spr_B2W2_Waiter.png',
        curly: 'https://archives.bulbagarden.net/media/upload/7/72/Spr_B2W2_Clyde.png',
        spiky: 'https://archives.bulbagarden.net/media/upload/1/18/Spr_B2W2_Collector.png'
      },
      casual: { // Casual outfit
        short: 'https://archives.bulbagarden.net/media/upload/2/25/Spr_B2W2_Cyclist_M.png',
        medium: 'https://archives.bulbagarden.net/media/upload/0/09/Spr_B2W2_Backpacker_M.png',
        long: 'https://archives.bulbagarden.net/media/upload/d/d3/Spr_B2W2_Musician.png',
        curly: 'https://archives.bulbagarden.net/media/upload/f/fc/Spr_B2W2_Fisherman.png',
        spiky: 'https://archives.bulbagarden.net/media/upload/2/23/Spr_B2W2_Worker.png'
      }
    },
    female: {
      classic: { // Classic Trainer outfit
        short: 'https://archives.bulbagarden.net/media/upload/a/a3/Spr_BW_Hilda.png',
        medium: 'https://archives.bulbagarden.net/media/upload/2/26/Spr_FRLG_Leaf.png',
        long: 'https://archives.bulbagarden.net/media/upload/e/e1/Spr_B2W2_Cynthia.png',
        curly: 'https://archives.bulbagarden.net/media/upload/e/e6/Spr_B2W2_Candice.png',
        spiky: 'https://archives.bulbagarden.net/media/upload/f/f4/Spr_BW_Iris.png'
      },
      adventure: { // Adventure outfit
        short: 'https://archives.bulbagarden.net/media/upload/6/6f/Spr_B2W2_Hilda.png',
        medium: 'https://archives.bulbagarden.net/media/upload/d/df/Spr_B2W2_Roxie.png',
        long: 'https://archives.bulbagarden.net/media/upload/1/14/Spr_B2W2_Ranger_F.png',
        curly: 'https://archives.bulbagarden.net/media/upload/0/0f/Spr_BW_Fennel.png',
        spiky: 'https://archives.bulbagarden.net/media/upload/e/e5/Spr_B2W2_Janitor_F.png'
      },
      gym: { // Gym Challenger outfit
        short: 'https://archives.bulbagarden.net/media/upload/c/c9/Spr_B2W2_Rosa.png',
        medium: 'https://archives.bulbagarden.net/media/upload/9/90/Spr_B2W2_Skyla.png',
        long: 'https://archives.bulbagarden.net/media/upload/d/d7/Spr_B2W2_Bianca.png',
        curly: 'https://archives.bulbagarden.net/media/upload/3/34/Spr_B2W2_Melody.png',
        spiky: 'https://archives.bulbagarden.net/media/upload/2/21/Spr_B2W2_Shauntal.png'
      },
      contest: { // Contest outfit
        short: 'https://archives.bulbagarden.net/media/upload/d/d5/Spr_B2W2_Elesa.png',
        medium: 'https://archives.bulbagarden.net/media/upload/7/79/Spr_B2W2_Lady.png',
        long: 'https://archives.bulbagarden.net/media/upload/d/dd/Spr_B2W2_Waitress.png',
        curly: 'https://archives.bulbagarden.net/media/upload/6/6d/Spr_B2W2_Artist_F.png',
        spiky: 'https://archives.bulbagarden.net/media/upload/5/5e/Spr_B2W2_Parasol_Lady.png'
      },
      casual: { // Casual outfit
        short: 'https://archives.bulbagarden.net/media/upload/f/f2/Spr_B2W2_Cyclist_F.png',
        medium: 'https://archives.bulbagarden.net/media/upload/f/f5/Spr_B2W2_Backpacker_F.png',
        long: 'https://archives.bulbagarden.net/media/upload/9/90/Spr_B2W2_Nursery_Aide.png',
        curly: 'https://archives.bulbagarden.net/media/upload/4/4a/Spr_B2W2_PI_F.png',
        spiky: 'https://archives.bulbagarden.net/media/upload/a/a4/Spr_B2W2_Golfer_F.png'
      }
    }
  };
  
  // Fallback sprites if specific combinations fail
  const fallbackSprites = {
    male: 'https://play.pokemonshowdown.com/sprites/trainers/red.png',
    female: 'https://play.pokemonshowdown.com/sprites/trainers/leaf.png'
  };
  const regions = [
    { id: 'kanto', name: 'Kanto', starters: [1, 4, 7] }, // Bulbasaur, Charmander, Squirtle
    { id: 'johto', name: 'Johto', starters: [152, 155, 158] }, // Chikorita, Cyndaquil, Totodile
    { id: 'hoenn', name: 'Hoenn', starters: [252, 255, 258] }, // Treecko, Torchic, Mudkip
    { id: 'sinnoh', name: 'Sinnoh', starters: [387, 390, 393] }, // Turtwig, Chimchar, Piplup
    { id: 'unova', name: 'Unova', starters: [495, 498, 501] }, // Snivy, Tepig, Oshawott
  ];

  const handleRegionChange = (regionId) => {
    setStarterRegion(regionId);
    const region = regions.find(r => r.id === regionId);
    if (region) {
      setSelectedStarter(region.starters[0]);
    }
  };
  
  const getStarterName = (id) => {
    const starters = {
      1: 'Bulbasaur', 4: 'Charmander', 7: 'Squirtle',
      152: 'Chikorita', 155: 'Cyndaquil', 158: 'Totodile',
      252: 'Treecko', 255: 'Torchic', 258: 'Mudkip',
      387: 'Turtwig', 390: 'Chimchar', 393: 'Piplup',
      495: 'Snivy', 498: 'Tepig', 501: 'Oshawott'
    };
    return starters[id] || 'Unknown';
  };

  const handleComplete = () => {
    // Save character data
    const characterData = {
      gender,
      skinTone: skinTones[skinTone],
      hairStyle: hairStyles[hairStyle],
      hairColor: hairColors[hairColor],
      outfit: outfits[outfit],
      region: regions.find(r => r.id === starterRegion).name,
      starter: {
        id: selectedStarter,
        name: getStarterName(selectedStarter)
      }
    };
    
    localStorage.setItem('pokemon_game_character', JSON.stringify(characterData));
    toast.success('Character created! Your adventure begins!');
    navigate('/game');
  };

  // Add animation effect
  useEffect(() => {
    const preloadImages = () => {
      // Preload Pokemon sprites for smoother experience
      regions.forEach(region => {
        region.starters.forEach(id => {
          const img = new Image();
          img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        });
      });
    };
    
    preloadImages();
  }, []);
  
  return (
    <div className="min-h-screen pixel-bg-center py-8 px-4 relative overflow-hidden">
      {/* Floating pixel art elements */}
      <div className="absolute top-20 left-10 animate-float opacity-30">
        <div className="w-8 h-8 bg-yellow-400 pixelated"></div>
      </div>
      <div className="absolute bottom-40 right-20 animate-float-slow opacity-30">
        <div className="w-12 h-12 bg-red-500 pixelated"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="pixel-border bg-white p-1 shadow-2xl overflow-hidden">
          <div className="bg-pokemon-blue py-6 px-8 pixel-pattern">
            <h1 className="text-3xl pixel-font text-white mb-2">Customize Your Trainer</h1>
            <p className="text-blue-100">Design your appearance and choose your starter Pokémon, {username}!</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 pixel-bg-pattern">
            {/* Character Preview */}
            <div className="col-span-1 pixel-border-inset bg-gray-50 p-6 flex flex-col items-center">
              <h2 className="text-xl pixel-font text-gray-800 mb-6">Your Trainer</h2>
              
              <div className="w-64 h-64 pixel-border flex flex-col items-center justify-center mb-8 relative overflow-hidden bg-gradient-to-b from-blue-100 to-indigo-100">
                {/* Character sprite preview with customizations */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Character background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-blue-100 z-0"></div>
                  
                  {/* Base character sprite with skin tone adjustment */}
                  <div className="relative z-10">
                    {gender === 'male' ? (
                      <div className="relative">
                        {/* Character sprite that changes based on all customization options */}
                        <img 
                          src={(() => {
                            // Get the appropriate outfit category
                            let outfitCategory = 'classic';
                            if (outfit === 1) outfitCategory = 'adventure';
                            else if (outfit === 2) outfitCategory = 'gym';
                            else if (outfit === 3) outfitCategory = 'contest';
                            else if (outfit === 4) outfitCategory = 'casual';
                            
                            // Get the appropriate hair style
                            let hairType = 'medium'; // Default medium
                            if (hairStyle === 0) hairType = 'short';
                            else if (hairStyle === 1) hairType = 'medium';
                            else if (hairStyle === 2) hairType = 'long';
                            else if (hairStyle === 3) hairType = 'curly';
                            else if (hairStyle === 4) hairType = 'spiky';
                            
                            // Return the appropriate sprite
                            return characterSprites.male[outfitCategory][hairType];
                          })()}
                          alt="Male Trainer" 
                          className="w-32 h-48 pixelated"
                          style={{
                            filter: `brightness(${skinTone === 0 ? 1 : skinTone === 1 ? 0.92 : skinTone === 2 ? 0.85 : skinTone === 3 ? 0.78 : 0.7})`
                          }}
                          onError={(e) => {
                            // Fallback to default sprite if specific combination fails
                            e.target.onerror = null;
                            e.target.src = fallbackSprites.male;
                          }}
                        />
                        
                        {/* Male hair style */}
                        {hairStyle > 0 && (
                          <div 
                            className="absolute top-6 left-1/2 transform -translate-x-1/2 pixelated z-20"
                            style={{
                              width: '18px',
                              height: hairStyle === 1 ? '8px' : hairStyle === 2 ? '14px' : hairStyle === 3 ? '10px' : '12px',
                              backgroundColor: hairColors[hairColor],
                              borderRadius: hairStyle === 3 ? '50%' : '2px',
                              clipPath: hairStyle === 1 ? 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' : 
                                      hairStyle === 2 ? 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' :
                                      hairStyle === 3 ? 'ellipse(50% 50% at 50% 50%)' :
                                      'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                            }}
                          />
                        )}
                        
                        {/* Male outfit */}
                        {outfit > 0 && (
                          <div 
                            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 pixelated z-15"
                            style={{
                              width: '28px',
                              height: '18px',
                              background: outfit === 1 ? 'linear-gradient(to bottom, #4a5568, #2d3748)' :
                                        outfit === 2 ? 'linear-gradient(to bottom, #742a2a, #9b2c2c)' :
                                        outfit === 3 ? 'linear-gradient(to bottom, #7b3294, #c2410c)' :
                                        'linear-gradient(to bottom, #234e52, #285e61)',
                              clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="relative">
                        {/* Character sprite that changes based on all customization options */}
                        <img 
                          src={(() => {
                            // Get the appropriate outfit category
                            let outfitCategory = 'classic';
                            if (outfit === 1) outfitCategory = 'adventure';
                            else if (outfit === 2) outfitCategory = 'gym';
                            else if (outfit === 3) outfitCategory = 'contest';
                            else if (outfit === 4) outfitCategory = 'casual';
                            
                            // Get the appropriate hair style
                            let hairType = 'medium'; // Default medium
                            if (hairStyle === 0) hairType = 'short';
                            else if (hairStyle === 1) hairType = 'medium';
                            else if (hairStyle === 2) hairType = 'long';
                            else if (hairStyle === 3) hairType = 'curly';
                            else if (hairStyle === 4) hairType = 'spiky';
                            
                            // Return the appropriate sprite
                            return characterSprites.female[outfitCategory][hairType];
                          })()}
                          alt="Female Trainer" 
                          className="w-32 h-48 pixelated"
                          style={{
                            filter: `brightness(${skinTone === 0 ? 1 : skinTone === 1 ? 0.92 : skinTone === 2 ? 0.85 : skinTone === 3 ? 0.78 : 0.7})`
                          }}
                          onError={(e) => {
                            // Fallback to default sprite if specific combination fails
                            e.target.onerror = null;
                            e.target.src = fallbackSprites.female;
                          }}
                        />
                        
                        {/* Female hair style */}
                        {hairStyle > 0 && (
                          <div 
                            className="absolute top-7 left-1/2 transform -translate-x-1/2 pixelated z-20"
                            style={{
                              width: '20px',
                              height: hairStyle === 1 ? '9px' : hairStyle === 2 ? '16px' : hairStyle === 3 ? '12px' : '14px',
                              backgroundColor: hairColors[hairColor],
                              borderRadius: hairStyle === 3 ? '50%' : '2px',
                              clipPath: hairStyle === 1 ? 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' : 
                                      hairStyle === 2 ? 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' :
                                      hairStyle === 3 ? 'ellipse(50% 50% at 50% 50%)' :
                                      'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                            }}
                          />
                        )}
                        
                        {/* Female outfit */}
                        {outfit > 0 && (
                          <div 
                            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 pixelated z-15"
                            style={{
                              width: '28px',
                              height: '18px',
                              background: outfit === 1 ? 'linear-gradient(to bottom, #4a5568, #2d3748)' :
                                        outfit === 2 ? 'linear-gradient(to bottom, #742a2a, #9b2c2c)' :
                                        outfit === 3 ? 'linear-gradient(to bottom, #7b3294, #c2410c)' :
                                        'linear-gradient(to bottom, #234e52, #285e61)',
                              clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 pixel-border-sm bg-gray-100 px-3 py-1">
                  <p className="text-xs text-gray-600 text-center">Character Preview</p>
                </div>
              </div>
              
              <div className="text-center space-y-2 w-full">
                <p className="text-gray-800 font-medium text-lg">{username}</p>
                <p className="text-gray-600">
                  {gender === 'male' ? 'Male' : 'Female'} Trainer
                </p>
                <p className="text-gray-600">
                  Region: {regions.find(r => r.id === starterRegion)?.name}
                </p>
                <p className="text-gray-600">
                  Starter: {getStarterName(selectedStarter)}
                </p>
              </div>
              
              <div className="mt-8 w-full">
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedStarter}.png`}
                  alt={getStarterName(selectedStarter)}
                  className="w-32 h-32 mx-auto animate-float"
                />
              </div>
            </div>
            
            {/* Customization Options */}
            <div className="col-span-1 lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="pixel-border-sm p-4 bg-white">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Appearance</h2>
                
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <div className="flex space-x-4">
                        <button
                          className={`px-4 py-2 rounded-lg ${gender === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                          onClick={() => setGender('male')}
                        >
                          Male
                        </button>
                        <button
                          className={`px-4 py-2 rounded-lg ${gender === 'female' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                          onClick={() => setGender('female')}
                        >
                          Female
                        </button>
                      </div>
                    </div>
                  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Skin Tone</label>
                      <div className="flex space-x-2">
                        {skinTones.map((tone, index) => (
                          <button
                            key={index}
                            className={`w-8 h-8 rounded-full ${skinTone === index ? 'ring-2 ring-offset-2 ring-pokemon-blue' : ''}`}
                            style={{ backgroundColor: tone }}
                            onClick={() => setSkinTone(index)}
                          />
                        ))}
                      </div>
                    </div>
                  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hair Style</label>
                      <select
                        className="input-field"
                        value={hairStyle}
                        onChange={(e) => setHairStyle(parseInt(e.target.value))}
                      >
                        {hairStyles.map((style, index) => (
                          <option key={index} value={index}>{style}</option>
                        ))}
                      </select>
                    </div>
                  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hair Color</label>
                      <div className="flex space-x-2">
                        {hairColors.map((color, index) => (
                          <button
                            key={index}
                            className={`w-8 h-8 rounded-full ${hairColor === index ? 'ring-2 ring-offset-2 ring-pokemon-blue' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setHairColor(index)}
                          />
                        ))}
                      </div>
                    </div>
                  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Outfit</label>
                      <select
                        className="input-field"
                        value={outfit}
                        onChange={(e) => setOutfit(parseInt(e.target.value))}
                      >
                        {outfits.map((outfit, index) => (
                          <option key={index} value={index}>{outfit}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Starter Region & Pokemon */}
            <div className="col-span-1 space-y-6">
              <div className="pixel-border-sm p-4 bg-white">
                <h2 className="text-xl pixel-font text-gray-800 mb-4">Starter Region</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Region</label>
                    <select
                      className="input-field"
                      value={starterRegion}
                      onChange={(e) => handleRegionChange(e.target.value)}
                    >
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>{region.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Choose Your First Pokémon</label>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {regions.find(r => r.id === starterRegion)?.starters.map((starterId) => (
                        <div
                          key={starterId}
                          className={`cursor-pointer p-3 ${selectedStarter === starterId ? 'pixel-border-selected bg-blue-50' : 'pixel-border-sm bg-gray-50 hover:bg-gray-100'}`}
                          onClick={() => setSelectedStarter(starterId)}
                        >
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${starterId}.png`}
                            alt={getStarterName(starterId)}
                            className="w-full h-auto pixelated"
                          />
                          <p className="text-center text-sm mt-1 pixel-font">{getStarterName(starterId)}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pixel-border-inset p-3 text-center bg-gray-50">
                      <p className="text-sm text-gray-600 mb-1">Selected Starter</p>
                      <p className="pixel-font text-gray-800">{getStarterName(selectedStarter)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pixel-bg-pattern px-8 py-6 flex justify-end border-t-4 border-gray-200">
            <button
              onClick={handleComplete}
              className="pixel-btn-yellow py-3 px-8 transition-transform active:translate-y-1"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterCustomization;
