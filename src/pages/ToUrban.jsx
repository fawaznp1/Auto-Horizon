import React, { useState } from 'react'; 
import { ArrowRight, Car, Star, MapPin } from 'lucide-react';

export default function UrbanDriveAd() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open('https://urbandrive.vercel.app/', '_blank');
  };

  return (
    <div 
     
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-5 sm:p-5 md:p-5 overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 mb-5 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group border border-slate-700/50 rounded-2xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
      <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-emerald-500/30 to-cyan-500/30 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500 delay-150"></div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
        {/* Left Content */}
        <div className="flex-1">
          {/* Brand Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Urban Drive</h3>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-slate-400 text-xs ml-1">4.9</span>
              </div>
            </div>
          </div>

          {/* Main Message */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
            Premium Car Rentals
          </h2>
          <p className="text-slate-300 mb-3 text-xs sm:text-sm md:text-base">
            From luxury sedans to exotic supercars. Experience the road in style.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Nationwide Coverage</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-slate-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Instant Booking</span>
            </div>
          </div>
        </div>

        {/* Right Content - CTA */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          {/* CTA Button */}
          <button  onClick={handleClick} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl group-hover:scale-105 text-sm">
            <span>Book Now</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </button>
          <p className="text-slate-400 text-xs text-center sm:text-right">Starting from $80/day</p>
        </div>
      </div>

      {/* Bottom Highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

      {/* Sponsored Label */}
      <div className="absolute top-2 right-2 bg-slate-700/80 backdrop-blur text-slate-300 text-xs px-2 py-1 rounded-full">
        Sponsored
      </div>
    </div>
  );
}
