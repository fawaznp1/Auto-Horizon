/* import React, { useState, useEffect } from 'react';
import { ChevronUp, Zap, Leaf, Clock, TrendingUp, CheckCircle } from 'lucide-react';

const e1 = "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&h=500&fit=crop";
const e2 = "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=500&fit=crop";
const e3 = "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&h=500&fit=crop";
const e4 = "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=500&fit=crop";
const e5 = "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop";

function Electric() {
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
          
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    { id: 'evolution', title: 'Evolution', icon: TrendingUp },
    { id: 'how-it-works', title: 'How It Works', icon: Zap },
    { id: 'advantages', title: 'Advantages', icon: CheckCircle },
    { id: 'challenges', title: 'Challenges', icon: Clock },
    { id: 'future', title: 'Future', icon: Leaf }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
     

      <div className="pt-20 max-w-6xl mx-auto px-6 py-8">
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          id="hero"
          data-section
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-6">
            The Future of Electric Vehicles
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing transportation with sustainable, innovative, and powerful electric technology
          </p>
        </div>

        <div 
          className={`mb-16 transition-all duration-1000 delay-300 ${
            isVisible.hero ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={e2}
              alt="Electric Car"
              className="w-full h-96 object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-lg font-semibold">Leading the charge towards sustainable mobility</p>
            </div>
          </div>
        </div>

        <div 
          className={`prose prose-lg max-w-none mb-16 transition-all duration-1000 ${
            isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          id="intro"
          data-section
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-3">
              <Leaf className="w-8 h-8" />
              The Electrification of the Automotive Industry
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              Electric vehicles (EVs) are revolutionizing the automotive industry, offering a cleaner, more sustainable alternative to traditional gasoline and diesel-powered cars. As concerns about climate change and air pollution continue to grow, electric vehicles have emerged as a key solution to reduce emissions and decrease reliance on fossil fuels. This essay delves into the development, advantages, and challenges of electric vehicles, highlighting their pivotal role in shaping the future of transportation.
            </p>
          </div>
        </div>

        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible.evolution ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          id="evolution"
          data-section
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                The Evolution of Electric Vehicles
              </h2>
              <div className="space-y-4 text-slate-700">
                <p className="leading-relaxed">
                  Electric vehicles have a long history, with the first electric car being developed in the late 19th century. However, due to limitations in battery technology and the rise of gasoline-powered engines, electric vehicles fell out of favor for much of the 20th century. It wasn't until the early 21st century, with advancements in battery technology and growing environmental awareness, that EVs made a resurgence.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={e2}
                  alt="Electric Car Evolution"
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <p className="text-slate-700 leading-relaxed">
              The introduction of the Tesla Roadster in 2008 marked a turning point in the electric vehicle industry. With its impressive range and sleek design, the Roadster proved that electric cars could be both practical and desirable. Since then, major automakers have embraced electric vehicle technology, launching a variety of models that cater to different segments of the market, from compact city cars to luxury sedans and SUVs.
            </p>
          </div>
        </div>

        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible['how-it-works'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          id="how-it-works"
          data-section
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src={e4}
                alt="Electric Car Technology"
                className="w-full h-80 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8" />
                How Electric Vehicles Work
              </h2>
              <div className="space-y-4 text-slate-700">
                <p className="leading-relaxed">
                  Electric vehicles operate using an electric motor powered by a large battery pack. Unlike traditional vehicles that rely on internal combustion engines, EVs produce zero tailpipe emissions, making them an environmentally friendly alternative. The battery pack is charged through an external power source, typically a charging station or a home outlet.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                  <p className="leading-relaxed text-orange-800">
                    <strong>Regenerative Braking:</strong> One of the key features of electric vehicles is regenerative braking. Similar to hybrid vehicles, EVs capture the energy generated during braking and convert it into electricity, which is stored in the battery for later use. This process improves the overall efficiency of the vehicle and helps to extend its range.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible.advantages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          id="advantages"
          data-section
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center flex items-center justify-center gap-3">
            <CheckCircle className="w-8 h-8" />
            Advantages of Electric Vehicles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-green-800">Environmental Impact</h3>
              </div>
              <p className="text-green-700 leading-relaxed">
                The most significant advantage of electric vehicles is their environmental impact. Since EVs produce no exhaust emissions, they contribute to improved air quality, especially in urban areas where traffic congestion leads to high levels of pollution. As the global energy grid becomes increasingly powered by renewable sources like solar and wind, the overall carbon footprint of electric vehicles continues to decrease.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-800">Cost Savings</h3>
              </div>
              <p className="text-blue-700 leading-relaxed">
                In addition to their environmental benefits, electric vehicles offer significant cost savings for owners. Electricity is generally cheaper than gasoline, and many EV owners benefit from lower maintenance costs due to the simplicity of electric motors. Without the need for oil changes, exhaust system repairs, and other engine-related maintenance, electric vehicles offer a more economical long-term solution.
              </p>
            </div>
          </div>
        </div>

        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible.challenges ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          id="challenges"
          data-section
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center flex items-center justify-center gap-3">
              <Clock className="w-8 h-8" />
              Challenges Facing Electric Vehicles
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Range Anxiety</h3>
                <p className="text-slate-700 leading-relaxed">
                  Despite their many benefits, electric vehicles face several challenges that have hindered widespread adoption. One of the primary concerns is range anxiety—the fear that the vehicle's battery will run out of charge before reaching a charging station. While modern electric vehicles offer ranges of over 300 miles on a single charge, the limited availability of charging infrastructure in some regions remains a barrier to adoption.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Charging Time</h3>
                <p className="text-slate-700 leading-relaxed">
                  Charging time is another challenge. While rapid chargers can provide a significant amount of charge in a short period, standard home chargers can take several hours to fully recharge an EV. However, advancements in battery technology and the expansion of fast-charging networks are addressing these issues, making electric vehicles more convenient for everyday use.
                </p>
              </div>
            </div>
          </div>
        </div>

      
        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible.future ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          id="future"
          data-section
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-3">
                <Leaf className="w-8 h-8" />
                The Future of Electric Vehicles
              </h2>
              <div className="space-y-4 text-slate-700">
                <p className="leading-relaxed">
                  The future of the automotive industry is undoubtedly electric. With governments around the world introducing stricter emission regulations and banning the sale of new gasoline and diesel vehicles in the coming decades, automakers are investing heavily in electric vehicle technology. The development of next-generation batteries, such as solid-state batteries, promises to further improve the range, charging times, and affordability of electric vehicles.
                </p>
                <p className="leading-relaxed">
                  In addition to passenger cars, the electrification of commercial vehicles is gaining momentum. Electric trucks and buses are being developed to reduce emissions in the transportation and logistics sectors, which are major contributors to global greenhouse gas emissions.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src={e5}
                alt="Future Electric Vehicles"
                className="w-full h-80 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
            </div>
          </div>
        </div>

        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible.conclusion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          id="conclusion"
          data-section
        >
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Conclusion</h2>
            <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto">
              Electric vehicles represent a fundamental shift in the automotive industry, offering a cleaner, more sustainable mode of transportation. While challenges such as range anxiety and charging infrastructure remain, advancements in technology and growing environmental awareness are driving the adoption of electric vehicles worldwide. As we move towards a future where electric vehicles dominate the roads, the transition will not only reduce our reliance on fossil fuels but also improve air quality and help mitigate the impacts of climate change. Electric vehicles are not just a trend; they are the future of transportation.
            </p>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-30"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default Electric; */




import React, { useState, useEffect } from 'react';
import { ChevronUp, Battery, Zap, Leaf, TrendingUp, Clock, Award } from 'lucide-react';

// Mock images - replace with your actual imports
const images = {
  ev1: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=400&fit=crop',
  ev2: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=400&fit=crop',
  ev3: 'https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=800&h=400&fit=crop',
  ev4: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
  ev5: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=400&fit=crop',
  ev6: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=400&fit=crop'
};

function ElectricVehicle() {
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
      threshold: 0.3,
      rootMargin: '-50px 0px'
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
    { id: 'technology', title: 'Technology', icon: Zap },
    { id: 'efficiency', title: 'Energy Efficiency', icon: Battery },
    { id: 'performance', title: 'Performance', icon: Award },
    { id: 'environment', title: 'Environment', icon: Leaf },
    { id: 'future', title: 'Future', icon: TrendingUp }
  ];

  const stats = [
    { label: 'Lower Operating Costs', value: '60%', icon: Battery },
    { label: 'Instant Torque', value: '100%', icon: Zap },
    { label: 'Zero Emissions', value: '0g CO2', icon: Leaf }
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
          style={{ backgroundImage: `url(${images.ev4})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            The Revolutionary Future of
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Electric Vehicles
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up animation-delay-300">
            Exploring innovation, sustainability, and the electrified automotive revolution
          </p>
          <button 
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-600"
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
              Electric vehicles represent one of the most transformative innovations in modern transportation, revolutionizing how we think about personal mobility, environmental responsibility, and automotive technology. From their humble beginnings as experimental concepts to becoming mainstream alternatives that challenge traditional automotive paradigms, EVs have emerged as the cornerstone of sustainable transportation.
            </p>
            <p>
              The electric vehicle revolution encompasses far more than just replacing internal combustion engines with electric motors. It represents a fundamental shift toward cleaner energy, advanced technology integration, and a reimagined relationship between vehicles, drivers, and the environment we all share.
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
            <Zap className="w-8 h-8 text-green-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Electric Vehicle Technology</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  Electric vehicles operate on elegantly simple yet sophisticated principles. At their heart lies an electric motor that converts electrical energy from rechargeable battery packs into mechanical motion with remarkable efficiency and precision.
                </p>
                <p>
                  Unlike traditional combustion engines with hundreds of moving parts, electric motors contain just a few components, resulting in virtually silent operation, minimal maintenance requirements, and instant torque delivery. Advanced battery management systems ensure optimal performance, longevity, and safety, while regenerative braking technology captures energy that would otherwise be lost, extending driving range and improving overall efficiency.
                </p>
              </div>
            </div>
            <div className="relative group">
              <img
                src={images.ev2}
                alt="Electric Vehicle Technology"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Energy Efficiency */}
        <section 
          id="efficiency" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.efficiency ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Battery className="w-8 h-8 text-green-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Energy Efficiency and Economy</h2>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Electric vehicles achieve unprecedented levels of energy efficiency that fundamentally redefine automotive economics. While traditional gasoline engines convert only about 20-30% of fuel energy into forward motion, electric motors achieve efficiency rates of 85-95%, meaning almost all electrical energy directly contributes to vehicle movement.
              </p>
              <p>
                This remarkable efficiency translates into dramatically lower operating costs. Electric vehicle owners typically spend 60-70% less on energy costs compared to gasoline vehicles, with electricity generally costing significantly less per mile than gasoline. Additionally, the simplified mechanical design results in substantially reduced maintenance requirements, eliminating oil changes, spark plug replacements, and many other routine service needs.
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
            <h2 className="text-4xl font-bold text-gray-800">Performance and Power</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative group order-2 lg:order-1">
              <img
                src={images.ev3}
                alt="Electric Vehicle Performance"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  Electric vehicles deliver performance characteristics that redefine automotive expectations. The instant torque delivery of electric motors provides immediate acceleration response that surpasses even high-performance gasoline engines, offering smooth, linear power that's both exhilarating and refined.
                </p>
                <p>
                  Many electric vehicles can accelerate from 0-60 mph in under 4 seconds, rivaling or exceeding traditional sports cars while maintaining whisper-quiet operation. The low center of gravity created by floor-mounted battery packs enhances handling and stability, creating a driving experience that's both dynamic and confidence-inspiring.
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
            <h2 className="text-4xl font-bold text-gray-800">Environmental Impact</h2>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Electric vehicles represent the most significant advancement in automotive environmental responsibility in decades. With zero direct emissions, EVs eliminate tailpipe pollutants that contribute to smog, air quality degradation, and respiratory health issues in urban environments.
              </p>
              <p>
                As electrical grids increasingly incorporate renewable energy sources like solar, wind, and hydroelectric power, the environmental benefits of electric vehicles continue to expand. Even when accounting for electricity generation and battery manufacturing, lifecycle emissions from electric vehicles are typically 60-70% lower than comparable gasoline vehicles, with this advantage growing as clean energy adoption accelerates.
              </p>
            </div>
          </div>
          <div className="relative group">
            <img
              src={images.ev1}
              alt="Environmental Impact"
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
            <h2 className="text-4xl font-bold text-gray-800">The Future of Electric Vehicles</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  The future of electric vehicles is bright with unprecedented innovation and rapid technological advancement. Battery technology continues to evolve at breakneck pace, with next-generation solid-state batteries promising even greater energy density, faster charging times, and extended lifespans.
                </p>
                <p>
                  Charging infrastructure is expanding exponentially, with ultra-fast charging networks making long-distance electric travel increasingly convenient. Emerging technologies like wireless charging, vehicle-to-grid integration, and autonomous driving capabilities will further transform the electric vehicle landscape, creating an interconnected, intelligent transportation ecosystem that benefits both individuals and society as a whole.
                </p>
              </div>
            </div>
            <div className="relative group">
              <img
                src={images.ev5}
                alt="Future of Electric Vehicles"
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
                Electric vehicles have transcended their early status as experimental curiosities to become the definitive future of personal transportation. Combining superior energy efficiency, exceptional performance, environmental responsibility, and cutting-edge technology, EVs offer a compelling vision of cleaner, smarter, and more sustainable mobility.
              </p>
              <p>
                As battery technology continues to advance, charging infrastructure expands, and renewable energy adoption accelerates, electric vehicles will only become more attractive, practical, and essential. The electric revolution is not just changing how we drive—it's reshaping our entire relationship with transportation, energy, and environmental stewardship for generations to come.
              </p>
            </div>
          </div>
          <div className="relative group">
            <img
              src={images.ev6}
              alt="Electric Vehicle Legacy"
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
    </div>
  );
}

export default ElectricVehicle;