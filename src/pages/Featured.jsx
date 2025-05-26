import React, { useState, useEffect } from 'react';
import { ChevronRight, Zap, Fuel, Heart, Share2, Play } from 'lucide-react';

export default function FeaturedCarSection() {
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

  const carImages = [
    'https://images.unsplash.com/photo-1654034177579-9bab10f4843f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1547744152-14d985cb937f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1621776888035-f86459336d16?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];

  const specs = [
    { icon: '🏎️', label: '5.0L V8 Engine', highlight: 'Naturally Aspirated' },
    { icon: '⚡', label: '480 HP, 420 lb-ft', highlight: 'Pure Power' },
    { icon: '🌿', label: '22 MPG Combined', highlight: 'Efficient Performance' },
    { icon: '🎯', label: '0-60 in 4.2s', highlight: 'Lightning Fast' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'Check out this awesome page!',
          url: window.location.href,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported on this browser');
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 px-4 md:px-12  shadow-2xl mt-12 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500  blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500  blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500  blur-2xl animate-bounce"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className={`relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Enhanced Car Image Section */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-1">
            <div className="relative overflow-hidden rounded-3xl bg-black">
              <img 
                src={carImages[currentImageIndex]}
                alt="2025 Mustang GT"
                className="w-full h-80 md:h-96 object-cover transition-all duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm  p-4 transition-all duration-300 hover:scale-110">
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>

              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {carImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3  transition-all duration-300 ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Floating badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1  text-sm font-semibold animate-pulse">
                Featured
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 left-4 flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2  backdrop-blur-sm transition-all duration-300 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
              <button
      onClick={handleShare}
      className="p-2 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
    >
      <Share2 className="w-5 h-5" />
    </button>
          </div>
        </div>

        {/* Enhanced Car Details */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Featured Car Of The Year
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500 to-transparent"></div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              2025 Mustang GT
            </h3>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              The 2025 Mustang GT redefines American muscle with its perfect blend of raw power and sophisticated technology. 
              Experience the thrill of 480 horsepower wrapped in iconic design that turns heads and quickens pulses.
            </p>
          </div>

          {/* Enhanced Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {spec.icon}
                  </span>
                  <div>
                    <div className="font-semibold text-white">{spec.label}</div>
                    <div className="text-sm text-purple-300">{spec.highlight}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
           <a href='/blog'>
             <button className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 overflow-hidden">
               <span className="relative z-10 flex items-center gap-2">
                 Read Full Review
                 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </button>
             
           </a>
           <a href='https://www.prestonford.com/new-Hurlock+MD-2025-Ford-Mustang-EcoBoost-1FA6P8TH9S5116993' target='_blank'>
             <button className="group border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
               <span className="flex items-center gap-2">
                 <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                 Schedule Test Drive
               </span>
             </button>
           </a>
          </div>

          {/* Price and availability */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <div className="text-sm text-gray-400">Starting at</div>
              <div className="text-2xl font-bold text-green-400">$38,990</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Availability</div>
              <div className="text-lg font-semibold text-purple-400">In Stock</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}