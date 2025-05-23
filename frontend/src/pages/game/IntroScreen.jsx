import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const IntroScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showText, setShowText] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();
  
  // Get username from localStorage
  const username = localStorage.getItem('pokemon_game_username') || 'Trainer';
  
  // Introduction story slides
  const slides = [
    {
      title: `Welcome, ${username}!`,
      content: "A world of adventure awaits you in the realm of Pokémon.",
      bgClass: "pixel-bg-grass",
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      imageName: "Pikachu"
    },
    {
      title: "Your Journey Begins",
      content: "Explore vast regions, catch and train Pokémon, and challenge Gym Leaders.",
      bgClass: "pixel-bg-water",
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      imageName: "Bulbasaur"
    },
    {
      title: "Become a Champion",
      content: "Battle your way to the top and prove you're the very best trainer!",
      bgClass: "pixel-bg-battle",
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      imageName: "Charizard"
    },
    {
      title: "Ready?",
      content: "It's time to customize your character and begin your adventure!",
      bgClass: "pixel-bg-route",
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
      imageName: "Mewtwo"
    }
  ];

  // Text typing effect
  useEffect(() => {
    if (isTyping && textIndex < slides[currentSlide].content.length) {
      const typingTimer = setTimeout(() => {
        setTextIndex(textIndex + 1);
      }, 30);
      return () => clearTimeout(typingTimer);
    } else if (textIndex >= slides[currentSlide].content.length) {
      setIsTyping(false);
    }
  }, [textIndex, isTyping, currentSlide, slides]);

  // Track if the user has interacted with the page
  const [userInteracted, setUserInteracted] = useState(false);
  
  // Audio instance to be used throughout the component
  const [audio] = useState(new Audio());
  
  // Handle user interaction
  useEffect(() => {
    const handleInteraction = () => setUserInteracted(true);
    
    // Add event listeners for user interaction
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);
  
  useEffect(() => {
    // Reset animation when slide changes
    setTextIndex(0);
    setIsTyping(true);
    
    // Prepare audio sources to try
    const audioSources = [
      '/assets/sounds/pokemon-click.mp3', // Local file (preferred)
      'https://www.myinstants.com/media/sounds/pokemon-sfx-click.mp3', // External backup
      'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3' // Another backup
    ];
    
    // Try to play audio if user has interacted
    if (userInteracted) {
      // Try each source until one works
      const trySource = (index) => {
        if (index >= audioSources.length) return; // No more sources to try
        
        audio.src = audioSources[index];
        audio.volume = 0.3;
        
        audio.oncanplaythrough = () => {
          audio.play()
            .catch(e => {
              console.log(`Audio source ${index} failed:`, e);
              trySource(index + 1); // Try next source
            });
        };
        
        audio.onerror = () => {
          console.log(`Audio source ${index} error loading`);
          trySource(index + 1); // Try next source
        };
      };
      
      trySource(0); // Start with first source
    }
  }, [currentSlide, userInteracted, audio]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      toast.success('Let\'s customize your character!');
      navigate('/customize');
    }
  };

  const handleSkip = () => {
    toast.success('Let\'s customize your character!');
    navigate('/customize');
  };
  
  // Handle clicking on the text to complete it instantly
  const handleTextClick = () => {
    if (isTyping) {
      setTextIndex(slides[currentSlide].content.length);
      setIsTyping(false);
    }
  };

  return (
    <div className={`min-h-screen ${slides[currentSlide].bgClass} text-white flex flex-col items-center justify-center relative overflow-hidden`}>
      {/* Floating pixel elements */}
      <div className="absolute top-20 left-20 animate-float opacity-30">
        <div className="w-12 h-12 bg-white pixelated"></div>
      </div>
      <div className="absolute bottom-40 right-20 animate-float-slow opacity-20">
        <div className="w-16 h-16 bg-yellow-400 pixelated"></div>
      </div>
      {/* Pixel art decorations */}
      <div className="absolute top-10 left-10 w-16 h-16 animate-float opacity-50">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokeball" />
      </div>
      <div className="absolute bottom-20 right-10 w-16 h-16 animate-float opacity-50" style={{ animationDelay: '1s' }}>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png" alt="Great Ball" />
      </div>
      <div className="absolute top-40 right-20 w-16 h-16 animate-float opacity-50" style={{ animationDelay: '1.5s' }}>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png" alt="Ultra Ball" />
      </div>
      
      {/* Main content box */}
      <div className="max-w-4xl w-full dialog-box bg-white overflow-hidden z-10">
        <div className="grid md:grid-cols-5">
          <div className="p-6 md:col-span-3 flex flex-col justify-center">
            <h1 className="pixel-font text-2xl text-gray-900 mb-6">{slides[currentSlide].title}</h1>
            
            <div className="min-h-[100px] mb-6 border-2 border-gray-200 p-4 rounded bg-gray-50 cursor-pointer" onClick={handleTextClick}>
              <p className="text-gray-700">
                {slides[currentSlide].content.substring(0, textIndex)}
                {isTyping && <span className="inline-block w-2 h-4 bg-black animate-pulse ml-1">|</span>}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleNext}
                className="pixel-btn flex-1 py-3"
              >
                {textIndex < slides[currentSlide].content.length ? 'Continue' : 
                 currentSlide < slides.length - 1 ? 'Next' : 'Create Character'}
              </button>
              
              {currentSlide < slides.length - 1 && (
                <button
                  onClick={handleSkip}
                  className="px-4 py-2 bg-gray-200 border-4 border-black text-gray-800 font-bold"
                >
                  Skip
                </button>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2 pokeball-pattern flex flex-col items-center justify-center p-6 border-l-4 border-gray-300">
            <div className="mb-8 animate-float">
              <div className="pixel-border bg-white p-1 mb-2 rounded-lg inline-block">
                <img 
                  src={slides[currentSlide].imageUrl} 
                  alt={slides[currentSlide].imageName}
                  className="w-40 h-40 pixelated"
                />
              </div>
              <p className="pixel-font text-sm text-center mt-2 text-yellow-300">{slides[currentSlide].imageName}</p>
            </div>
            <div className="w-full mt-6 px-4">
              <div className="w-full h-2 bg-gray-300 rounded-full">
                <div 
                  className="h-2 bg-pokemon-blue rounded-full transition-all duration-300" 
                  style={{ width: `${(currentSlide + 1) / slides.length * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span>Start</span>
                <span>Progress</span>
                <span>Finish</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-200 border-t-4 border-gray-400 flex justify-between items-center">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${currentSlide === index ? 'bg-pokemon-red text-white' : 'bg-gray-300 text-gray-700'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleSkip}
            className="text-gray-700 hover:text-pokemon-red transition-colors text-sm font-medium"
          >
            Skip Intro
          </button>
        </div>
      </div>
      
      {/* Pixelated grass decoration at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-green-800 flex justify-center items-center overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-8 h-12 relative">
            <div className="absolute bottom-0 w-8 h-8 bg-green-600"></div>
            <div className="absolute bottom-4 w-8 h-4 bg-green-700"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroScreen;
