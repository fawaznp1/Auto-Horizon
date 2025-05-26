import React, { useEffect, useState, useRef } from 'react';

const ModernAutoHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    setIsVisible(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const createRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.8s ease-out;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
    
    const HomeSection = document.getElementById('home');
    if (HomeSection) {
      HomeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <style>{`
        @keyframes ripple {
          to { transform: scale(1); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(6, 182, 212, 0.3); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInFromLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromTop {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInFromBottom {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-slide-in-left { animation: slideInLeft 1s ease-out; }
        .animate-slide-in-right { animation: slideInRight 1s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
        .animate-slide-from-left { animation: slideInFromLeft 0.8s ease-out; }
        .animate-slide-from-right { animation: slideInFromRight 0.8s ease-out; }
        .animate-slide-from-top { animation: slideInFromTop 0.8s ease-out; }
        .animate-slide-from-bottom { animation: slideInFromBottom 0.8s ease-out; }
        .glass { 
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-dark { 
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 768px) {
          .animate-slide-in-left {
            animation: fadeInUp 1s ease-out;
          }
          .animate-slide-in-right {
            animation: fadeInUp 1s ease-out 0.3s both;
          }
        }
      `}</style>

      <section 
        ref={heroRef}
        className="relative min-h-screen overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #0f172a 100%)
          `
        }}
      >
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Grid */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`
            }}
          />
          
          {/* Floating Orbs - Responsive positioning */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float hidden md:block"
              style={{
                width: `${20 + i * 10}px`,
                height: `${20 + i * 10}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
                background: `radial-gradient(circle, ${
                  ['rgba(59, 130, 246, 0.3)', 'rgba(6, 182, 212, 0.3)', 'rgba(16, 185, 129, 0.3)'][i % 3]
                } 0%, transparent 70%)`,
                animationDelay: `${i * 0.5}s`,
                transform: `translateY(${scrollY * (0.02 + i * 0.01)}px)`
              }}
            />
          ))}

          {/* Speed Lines */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px opacity-30"
                style={{
                  top: `${25 + i * 25}%`,
                  background: `linear-gradient(90deg, transparent 0%, ${
                    ['#3b82f6', '#06b6d4', '#10b981'][i]
                  } 50%, transparent 100%)`,
                  animation: `pulse 2s ease-in-out infinite ${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
            {/* Left Content */}
            <div className={`space-y-6 sm:space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              {/* Status Badge */}
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full glass hover:scale-105 transition-all duration-300">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-emerald-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                <span className="text-gray-200 font-medium text-sm sm:text-base">Next-Gen Automotive Hub</span>
                <div className="ml-2 sm:ml-3 text-emerald-400">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 12l-4-4h8l-4 4z"/>
                  </svg>
                </div>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-4 sm:space-y-6">
               <h1 className=" sm:text-6xl l font-black leading-none tracking-tight">
  <span 
    className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent animate-fade-in-up"
    style={{ animationDelay: '0.2s',fontSize:"2.5rem" }}
  >
    AUTO
  </span>
  <span 
    className="text-white animate-fade-in-up ml-2"
    style={{ animationDelay: '0.4s' }}
  >
    Horizon
  </span>
</h1>

                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
Fuel your passion for cars — explore the latest models, reviews, and innovations driving the                   <span className="text-cyan-400 font-semibold">future of automotive excellence.</span>
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <button 
                  onClick={createRipple}
                  className="group relative overflow-hidden px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-glow"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="flex items-center justify-center relative z-10 text-sm sm:text-base">
                    Explore Innovation
                    <svg className="ml-2 sm:ml-3 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </span>
                </button>
              </div>
              
              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                {[
                  { number: '2.5K+', label: 'Premium Reviews', color: 'from-yellow-400 to-orange-500' },
                  { number: '5M+', label: 'Global Readers', color: 'from-cyan-400 to-blue-500' },
                  { number: '150+', label: 'Brand Partners', color: 'from-emerald-400 to-green-500' }
                ].map((stat, i) => (
                  <div key={i} className="group text-center cursor-pointer">
                    <div className={`text-2xl sm:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm font-medium mt-1 group-hover:text-gray-300 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Content - 3D Car Scene */}
            <div className={`relative flex items-center justify-center mt-8 lg:mt-0 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              {/* Car Container */}
              <div 
                className="relative transform transition-all duration-1000"
                style={{ 
                  transform: `translateY(${scrollY * 0.1}px) rotateY(${mousePos.x * 0.05}deg) rotateX(${mousePos.y * 0.02}deg)`
                }}
              >
                {/* Main Car SVG with enhanced styling */}
                <svg width="100%" height="auto" viewBox="0 0 700 350" className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl animate-float">
                  <defs>
                    <linearGradient id="modernCarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e40af" />
                      <stop offset="30%" stopColor="#3b82f6" />
                      <stop offset="60%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#374151" />
                      <stop offset="50%" stopColor="#1f2937" />
                      <stop offset="100%" stopColor="#111827" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="10" stdDeviation="5" floodColor="rgba(0,0,0,0.3)"/>
                    </filter>
                  </defs>
                  
                  {/* Enhanced Car Shadow */}
                  <ellipse cx="350" cy="320" rx="250" ry="20" fill="rgba(0,0,0,0.4)" filter="url(#shadow)"/>
                  
                  {/* Sleek Car Body */}
                  <path d="M120 220 L180 160 L280 140 L420 140 L520 160 L580 220 L580 270 L550 270 L550 285 L480 285 L480 270 L220 270 L220 285 L150 285 L150 270 L120 270 Z" 
                        fill="url(#modernCarGradient)" 
                        stroke="rgba(255,255,255,0.3)" 
                        strokeWidth="2"
                        filter="url(#glow)"/>
                  
                  {/* Windshield with reflection */}
                  <path d="M200 200 L240 160 L460 160 L500 200 L500 230 L200 230 Z" 
                        fill="rgba(59, 130, 246, 0.2)" 
                        stroke="rgba(255,255,255,0.4)" 
                        strokeWidth="1"/>
                  
                  {/* Side windows */}
                  <path d="M210 200 L210 230 L340 230 L340 200 Z" fill="rgba(6, 182, 212, 0.15)"/>
                  <path d="M360 200 L360 230 L490 230 L490 200 Z" fill="rgba(6, 182, 212, 0.15)"/>
                  
                  {/* Enhanced Wheels */}
                  <circle cx="220" cy="270" r="35" fill="url(#wheelGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                  <circle cx="480" cy="270" r="35" fill="url(#wheelGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                  
                  {/* Wheel rims */}
                  <circle cx="220" cy="270" r="20" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.8"/>
                  <circle cx="480" cy="270" r="20" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.8"/>
                  <circle cx="220" cy="270" r="12" fill="#06b6d4"/>
                  <circle cx="480" cy="270" r="12" fill="#06b6d4"/>
                  
                  {/* Enhanced Headlights */}
                  <circle cx="560" cy="190" r="12" fill="#fbbf24" filter="url(#glow)"/>
                  <circle cx="560" cy="220" r="10" fill="#f59e0b" filter="url(#glow)"/>
                  <circle cx="560" cy="190" r="20" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.5"/>
                  
                  {/* LED Strip */}
                  <rect x="540" y="175" width="40" height="4" fill="#06b6d4" rx="2" filter="url(#glow)"/>
                  
                  {/* Door handles */}
                  <circle cx="320" cy="210" r="3" fill="rgba(255,255,255,0.6)"/>
                  <circle cx="420" cy="210" r="3" fill="rgba(255,255,255,0.6)"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Mobile-friendly Feature Cards - Moved below main content on mobile */}
          <div className="mt-12 lg:mt-0">
            {/* Desktop positioning (absolute) - hidden on mobile */}
            <div className="hidden lg:block">
              <div 
                className={`absolute top-32 left-1/2 transform translate-x-96 glass-dark rounded-2xl p-4 xl:p-6 hover:scale-110 transition-all duration-500 cursor-pointer group ${isVisible ? 'animate-slide-from-top' : 'opacity-0'}`}
                style={{ animationDelay: '1.2s', animationFillMode: 'both' }}
              >
                <div className="text-2xl xl:text-4xl mb-2 group-hover:scale-110 transition-transform">⚡</div>
                <div className="text-white font-bold text-xs xl:text-sm">Electric Era</div>
                <div className="text-gray-400 text-xs">Zero Emissions</div>
              </div>
              
              <div 
                className={`absolute bottom-32 left-1/2 transform translate-x-80 glass-dark rounded-2xl p-4 xl:p-6 hover:scale-110 transition-all duration-500 cursor-pointer group ${isVisible ? 'animate-slide-from-bottom' : 'opacity-0'}`}
                style={{ animationDelay: '1.6s', animationFillMode: 'both' }}
              >
                <div className="text-2xl xl:text-4xl mb-2 group-hover:scale-110 transition-transform">🔬</div>
                <div className="text-white font-bold text-xs xl:text-sm">Deep Analysis</div>
                <div className="text-gray-400 text-xs">Expert Insights</div>
              </div>
              
              <div 
                className={`absolute top-1/2 right-20 glass-dark rounded-2xl p-4 xl:p-6 hover:scale-110 transition-all duration-500 cursor-pointer group ${isVisible ? 'animate-slide-from-right' : 'opacity-0'}`}
                style={{ animationDelay: '1.4s', animationFillMode: 'both' }}
              >
                <div className="text-2xl xl:text-4xl mb-2 group-hover:scale-110 transition-transform">🚀</div>
                <div className="text-white font-bold text-xs xl:text-sm">Performance</div>
                <div className="text-gray-400 text-xs">Track Tested</div>
              </div>

              <div 
                className={`absolute top-1/4 left-1/2 transform translate-x-48 glass-dark rounded-2xl p-4 xl:p-6 hover:scale-110 transition-all duration-500 cursor-pointer group ${isVisible ? 'animate-slide-from-left' : 'opacity-0'}`}
                style={{ animationDelay: '1.0s', animationFillMode: 'both' }}
              >
                <div className="text-2xl xl:text-4xl mb-2 group-hover:scale-110 transition-transform">🌐</div>
                <div className="text-white font-bold text-xs xl:text-sm">Connected</div>
                <div className="text-gray-400 text-xs">Smart Features</div>
              </div>
            </div>
            
            {/* Mobile feature cards - Grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:hidden">
              {[
                { icon: '⚡', title: 'Electric Era', subtitle: 'Zero Emissions' },
                { icon: '🔬', title: 'Deep Analysis', subtitle: 'Expert Insights' },
                { icon: '🚀', title: 'Performance', subtitle: 'Track Tested' },
                { icon: '🌐', title: 'Connected', subtitle: 'Smart Features' }
              ].map((feature, index) => (
                <div key={index} className="glass-dark rounded-2xl p-4 hover:scale-105 transition-all duration-500 cursor-pointer group text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <div className="text-white font-bold text-sm">{feature.title}</div>
                  <div className="text-gray-400 text-xs">{feature.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 sm:w-8 h-10 sm:h-12 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModernAutoHero;