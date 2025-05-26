import React, { useState, useEffect } from 'react';
import { ChevronUp, Zap, Cpu, Shield, Wifi, TrendingUp, Clock, Award } from 'lucide-react';
import LikesCommentsComponent from '../components/Commentbox';

// Mock images - replace with your actual imports
const images = {
  d1: 'https://images.unsplash.com/photo-1615644190630-c6c6f230a6ed?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  d2: 'https://images.unsplash.com/photo-1642420436300-350c08afe2ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  d3: 'https://images.unsplash.com/photo-1641375577005-5b244a1d5c66?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  d4: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=400&fit=crop',
  d5: 'https://images.unsplash.com/photo-1654816022104-ed536258d9c0?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  d6: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=400&fit=crop'
};

function LatestCars() {
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
    { id: 'electric', title: 'Electric Power', icon: Zap },
    { id: 'technology', title: 'Smart Tech', icon: Cpu },
    { id: 'safety', title: 'Safety Features', icon: Shield },
    { id: 'connectivity', title: 'Connectivity', icon: Wifi },
    { id: 'future', title: 'Future Trends', icon: TrendingUp }
  ];

  const stats = [
    { label: 'Electric Range', value: '400+ miles', icon: Zap },
    { label: 'Charging Speed', value: '0-80% in 18min', icon: Award },
    { label: 'Autonomous Level', value: 'Level 3+', icon: Cpu }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-600 transition-all duration-300"
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
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-gray-400 hover:text-purple-500 hover:bg-purple-50'
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
          style={{ backgroundImage: `url(${images.d4})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            The Revolutionary Era of
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Latest Cars
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up animation-delay-300">
            Exploring electric innovation, smart technology, and the future of mobility
          </p>
          <button 
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-600"
          >
            Discover More
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
                className={`text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 transform transition-all duration-700 ${
                  isVisible.intro ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">{value}</div>
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
            <Clock className="w-8 h-8 text-purple-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Introduction</h2>
          </div>
          <div className="prose prose-lg text-gray-600 leading-relaxed">
            <p className="text-xl mb-6">
              The automotive industry is experiencing its most dramatic transformation in over a century. Today's latest cars represent a convergence of revolutionary technologies including electric powertrains, artificial intelligence, advanced connectivity, and autonomous driving capabilities that are reshaping how we think about transportation.
            </p>
            <p>
              From Tesla's groundbreaking Model S Plaid to BMW's innovative iX, from Mercedes' luxurious EQS to Lucid's Air Dream Edition, modern vehicles are becoming sophisticated computers on wheels, offering unprecedented levels of performance, efficiency, and technological integration that seemed like science fiction just a decade ago.
            </p>
          </div>
        </section>

        {/* Electric Power */}
        <section 
          id="electric" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.electric ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Zap className="w-8 h-8 text-purple-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Electric Revolution</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  Electric vehicles have evolved from experimental curiosities to mainstream marvels, with the latest models offering ranges exceeding 400 miles on a single charge. Advanced battery technologies, including solid-state and lithium-ion innovations, now provide rapid charging capabilities that can restore 80% capacity in under 20 minutes.
                </p>
                <p>
                  Modern electric cars deliver instant torque and whisper-quiet operation, while sophisticated thermal management systems ensure optimal performance in all weather conditions. The integration of regenerative braking and intelligent energy management systems maximizes efficiency and extends driving range beyond traditional expectations.
                </p>
              </div>
            </div>
            <div className="relative group">
              <img
                src={images.d2}
                alt="Electric Vehicle Technology"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Smart Technology */}
        <section 
          id="technology" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.technology ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Cpu className="w-8 h-8 text-purple-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Intelligent Technology</h2>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Today's vehicles are powered by sophisticated AI systems that learn from driver behavior and adapt to individual preferences. Advanced driver assistance systems (ADAS) now include features like adaptive cruise control, lane-keeping assistance, automatic emergency braking, and even semi-autonomous driving capabilities.
              </p>
              <p>
                Modern cars feature multiple high-definition cameras, radar sensors, and LiDAR systems that create a 360-degree awareness bubble around the vehicle. Machine learning algorithms process this data in real-time, enabling features like predictive maintenance, intelligent route optimization, and personalized driving experiences that evolve with each journey.
              </p>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section 
          id="safety" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.safety ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Shield className="w-8 h-8 text-purple-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Advanced Safety Systems</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative group order-2 lg:order-1">
              <img
                src={images.d3}
                alt="Safety Technology"
                className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  The latest cars incorporate revolutionary safety technologies that go far beyond traditional airbags and seatbelts. Advanced collision avoidance systems can detect and respond to potential accidents faster than human reflexes, while intelligent emergency braking can prevent or mitigate crashes entirely.
                </p>
                <p>
                  Features like blind-spot monitoring, cross-traffic alert, and 360-degree camera systems provide unprecedented situational awareness. Some vehicles now include driver monitoring systems that can detect fatigue or distraction, ensuring optimal safety for both occupants and other road users.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Connectivity */}
        <section 
          id="connectivity" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.connectivity ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Wifi className="w-8 h-8 text-purple-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Seamless Connectivity</h2>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Modern vehicles serve as mobile connectivity hubs, featuring built-in 5G capabilities, Wi-Fi hotspots, and seamless smartphone integration. Advanced infotainment systems support wireless Apple CarPlay and Android Auto, while over-the-air updates continuously improve vehicle performance and add new features.
              </p>
              <p>
                Cloud-based services enable real-time traffic optimization, remote vehicle monitoring, and predictive maintenance alerts. Smart home integration allows drivers to control household devices, schedule charging sessions, and pre-condition their vehicles before departure, creating a truly connected lifestyle experience.
              </p>
            </div>
          </div>
          <div className="relative group">
            <img
              src={images.d1}
              alt="Connected Car Technology"
              className="w-full h-95 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </section>

        {/* Future Trends */}
        <section 
          id="future" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.future ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <TrendingUp className="w-8 h-8 text-purple-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">The Future of Automotive</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  The automotive future promises even more revolutionary developments, with fully autonomous vehicles expected to become mainstream within the next decade. Advances in artificial intelligence, quantum computing, and battery technology will enable cars that can drive themselves, communicate with infrastructure, and operate as part of smart city ecosystems.
                </p>
                <p>
                  Emerging technologies like vehicle-to-everything (V2X) communication, augmented reality windshields, and biometric health monitoring systems will transform cars into personalized mobility assistants that adapt to individual needs and preferences in ways we're only beginning to imagine.
                </p>
              </div>
            </div>
            <div className="relative group">
              <img
                src={images.d5}
                alt="Future of Automotive"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Conclusion</h2>
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                The latest cars represent more than just transportation—they embody a technological revolution that's reshaping our relationship with mobility. From electric powertrains that deliver incredible performance with zero emissions to AI systems that learn and adapt to our preferences, today's vehicles offer capabilities that seemed impossible just a few years ago.
              </p>
              <p>
                As we look toward the future, the convergence of electrification, autonomous driving, and connectivity promises even more transformative changes. The cars of today are not just vehicles; they're intelligent companions that will continue to evolve and enhance our lives in ways we're only beginning to discover.
              </p>
            </div>
          </div>
          <div className="relative group">
            <img
              src={images.d6}
              alt="Modern Car Legacy"
              className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </section>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-40 ${
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

export default LatestCars;