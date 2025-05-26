import React, { useState, useEffect } from 'react';
import { ChevronUp, Battery, Zap, Leaf, TrendingUp, Clock, Award } from 'lucide-react';
import LikesCommentsComponent from '../components/Commentbox';

// Mock images - replace with your actual imports
const images = {
  h1: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
  h2: 'https://images.unsplash.com/photo-1606213099787-e572942b2456?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  h3: 'https://images.unsplash.com/photo-1627230570488-60e18880b1ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  h4: 'https://images.unsplash.com/photo-1684734124721-a08272b3aca7?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  h5: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  h6: 'https://images.unsplash.com/photo-1654157925394-4b7809721149?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
};

function HybridCars() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setScrollProgress(progress);
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '200px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        setIsVisible(prev => ({
          ...prev,
          [id]: entry.isIntersecting
        }));
        
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      });
    }, observerOptions);

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    { id: 'intro', title: 'Introduction', icon: Clock },
    { id: 'technology', title: 'Technology', icon: Battery },
    { id: 'efficiency', title: 'Fuel Efficiency', icon: Zap },
    { id: 'performance', title: 'Performance', icon: Award },
    { id: 'environment', title: 'Environment', icon: Leaf },
    { id: 'future', title: 'Future', icon: TrendingUp }
  ];

  const stats = [
    { label: 'Better Fuel Economy', value: '40-50%', icon: Zap },
    { label: 'Lower Emissions', value: '80%', icon: Leaf },
    { label: 'Regenerative Efficiency', value: '90%', icon: Battery }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Progress Bar */}
         <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-blue-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      {/* Navigation */}
      <nav className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-white/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-200">
          {sections.map(({ id, title, icon: Icon }) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              className={`block w-10 h-10 rounded-full mb-2 last:mb-0 transition-all duration-300 flex items-center justify-center group relative ${
                activeSection === id 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
              }`}
              title={title}
            >
              <Icon size={16} />
              <span className="absolute right-12 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {title}
              </span>
            </button>
          ))}
        </div>
      </nav>
      

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${images.h4})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            The Revolutionary Era of
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Hybrid Vehicles
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up animation-delay-300">
            Bridging efficiency, sustainability, and the future of transportation
          </p>
          <button 
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-green-500 hover:bg-green-600 px-4 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-600"
          >
            Explore Innovation
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronUp className="w-6 h-6 text-white rotate-180" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map(({ label, value, icon: Icon }, index) => (
              <div 
                key={label}
                className={`text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 transform transition-all duration-700 ${
                  isVisible.intro ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{value}</div>
                <div className="text-gray-600 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Introduction */}
        <section 
          id="intro" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.intro ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Clock className="w-8 h-8 text-green-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Introduction</h2>
          </div>
          <div className="prose prose-lg text-gray-600 leading-relaxed">
            <p className="text-xl mb-6">
              Hybrid cars represent one of the most significant technological breakthroughs in modern automotive history, seamlessly combining traditional internal combustion engines with advanced electric motor technology. This innovative dual-powertrain approach has revolutionized how we think about vehicle efficiency, environmental impact, and sustainable transportation solutions.
            </p>
            <p>
              Since the introduction of the Toyota Prius in the late 1990s, hybrid technology has evolved from an experimental concept to a mainstream automotive solution, offering drivers the perfect balance between conventional driving range and electric efficiency, all while significantly reducing their environmental footprint.
            </p>
          </div>
        </section>

        {/* Technology */}
        <section 
          id="technology" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.technology ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Battery className="w-8 h-8 text-green-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Hybrid Technology Explained</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  Hybrid vehicles utilize a sophisticated powertrain system that intelligently combines a gasoline engine with one or more electric motors and a high-voltage battery pack. The system continuously monitors driving conditions and automatically switches between power sources to optimize efficiency and performance.
                </p>
                <p>
                  At low speeds and during city driving, the electric motor provides silent, emission-free propulsion. During highway cruising, the gasoline engine takes over for optimal efficiency. Most remarkably, regenerative braking captures energy that would otherwise be lost during deceleration, converting it back into electricity to recharge the battery system.
                </p>
              </div>
            </div>
            <div className="relative group">
              <img
                src={images.h2}
                alt="Hybrid Technology"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Fuel Efficiency */}
        <section 
          id="efficiency" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.efficiency ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Zap className="w-8 h-8 text-green-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Exceptional Fuel Efficiency</h2>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                The fuel efficiency of hybrid cars is truly remarkable, often achieving 40-60% better fuel economy compared to conventional gasoline vehicles. This extraordinary efficiency stems from the intelligent power management system that ensures the engine operates only when most efficient, while electric motors handle low-speed and stop-and-go driving scenarios.
              </p>
              <p>
                Modern hybrid vehicles routinely achieve fuel economy ratings exceeding 50-60 miles per gallon, with some models reaching even higher figures. This efficiency advantage translates to substantial cost savings at the fuel pump and dramatically reduced dependence on fossil fuels, making hybrid cars an economically attractive choice for environmentally conscious drivers.
              </p>
            </div>
          </div>
        </section>

        {/* Performance */}
        <section 
          id="performance" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.performance ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Award className="w-8 h-8 text-green-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Performance and Driving Experience</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative group order-2 lg:order-1">
              <img
                src={images.h3}
                alt="Hybrid Performance"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  Contrary to early misconceptions, modern hybrid cars deliver impressive performance that often surpasses their conventional counterparts. The instant torque delivery of electric motors provides immediate acceleration response, while the combined power output of both electric and gasoline powertrains can generate substantial total horsepower.
                </p>
                <p>
                  The seamless transition between electric and gasoline power creates a refined, smooth driving experience. Advanced hybrid systems like those found in luxury vehicles provide nearly silent operation during electric-only mode, exceptional acceleration when needed, and the long-range capability that eliminates any anxiety about finding charging stations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Environmental */}
        <section 
          id="environment" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.environment ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Leaf className="w-8 h-8 text-green-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Environmental Impact and Sustainability</h2>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Hybrid cars represent a significant step forward in reducing the automotive industry's environmental impact. By dramatically improving fuel efficiency and incorporating electric propulsion, hybrid vehicles can reduce carbon dioxide emissions by 35-50% compared to conventional gasoline vehicles, making a meaningful contribution to combating climate change.
              </p>
              <p>
                Beyond CO2 reduction, hybrid cars produce significantly lower levels of harmful pollutants including nitrogen oxides, carbon monoxide, and particulate matter. The electric-only operation capability means zero local emissions during city driving, improving air quality in urban areas where pollution concentrations are typically highest and most problematic for public health.
              </p>
            </div>
          </div>
          <div className="relative group">
            <img
              src={images.h1}
              alt="Environmental Benefits"
              className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </section>

        {/* Future */}
        <section 
          id="future" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.future ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <TrendingUp className="w-8 h-8 text-green-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">The Future of Hybrid Technology</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  The future of hybrid cars looks increasingly bright as technology continues to advance at a rapid pace. Next-generation hybrid systems are becoming more sophisticated, with improved battery technology offering greater electric-only range, faster charging capabilities, and enhanced longevity that makes hybrid ownership even more attractive.
                </p>
                <p>
                  As the automotive industry transitions toward electrification, hybrid technology serves as the perfect bridge between conventional vehicles and fully electric cars. Plug-in hybrid variants are expanding electric-only range to 30-50 miles, while advanced hybrid systems are becoming more affordable and accessible across all vehicle segments, from compact cars to large SUVs and trucks.
                </p>
              </div>
            </div>
            <div className="relative group">
              <img
                src={images.h5}
                alt="Future of Hybrids"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Conclusion</h2>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Hybrid cars have successfully proven themselves as a practical, efficient, and environmentally responsible transportation solution that addresses many of the challenges facing modern mobility. By combining the best aspects of both electric and gasoline powertrains, hybrid vehicles offer exceptional fuel economy, reduced emissions, and reliable performance without the range limitations of pure electric vehicles.
              </p>
              <p>
                As hybrid technology continues to evolve and improve, these vehicles will play an increasingly important role in the global transition toward sustainable transportation. For drivers seeking to reduce their environmental impact while maintaining the convenience and flexibility of conventional vehicles, hybrid cars represent the ideal solution for today's transportation needs and tomorrow's environmental goals.
              </p>
            </div>
          </div>
          <div className="relative group">
            <img
              src={images.h6}
              alt="Hybrid Legacy"
              className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </section>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-40 ${
          scrollProgress > 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
      <LikesCommentsComponent />
    </div>
  );
}

export default HybridCars;