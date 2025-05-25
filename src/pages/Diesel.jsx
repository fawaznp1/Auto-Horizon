import React, { useState, useEffect } from 'react';
import { ChevronUp, Fuel, Zap, Leaf, TrendingUp, Clock, Award } from 'lucide-react';

// Mock images - replace with your actual imports
const images = {
  d1: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=400&fit=crop',
  d2: 'https://images.unsplash.com/photo-1562088209-8fabb0f3c39a?w=800&h=400&fit=crop',
  d3: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop',
  d4: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=400&fit=crop',
  d5: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
  d6: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=400&fit=crop'
};

function Diesel() {
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
    { id: 'mechanics', title: 'Mechanics', icon: Zap },
    { id: 'efficiency', title: 'Fuel Efficiency', icon: Fuel },
    { id: 'performance', title: 'Performance', icon: Award },
    { id: 'environment', title: 'Environment', icon: Leaf },
    { id: 'future', title: 'Future', icon: TrendingUp }
  ];

  const stats = [
    { label: 'Better Fuel Economy', value: '20-30%', icon: Fuel },
    { label: 'Higher Torque Output', value: '40%', icon: Zap },
    { label: 'Lower CO2 Emissions', value: '15%', icon: Leaf }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
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
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
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
            The Enduring Power of
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Diesel Vehicles
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up animation-delay-300">
            Exploring durability, efficiency, and the future of diesel technology
          </p>
          <button 
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-600"
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
                className={`text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 transform transition-all duration-700 ${
                  isVisible.intro ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
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
            <Clock className="w-8 h-8 text-blue-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Introduction</h2>
          </div>
          <div className="prose prose-lg text-gray-600 leading-relaxed">
            <p className="text-xl mb-6">
              Diesel cars have long been a staple in the automotive industry, known for their exceptional durability, superior fuel efficiency, and impressive power delivery. While diesel engines were initially developed for commercial purposes such as trucks and buses, they eventually evolved into passenger cars, offering a compelling alternative to gasoline-powered vehicles.
            </p>
            <p>
              The journey of diesel technology represents one of the most significant developments in automotive engineering, transforming from industrial workhorses to sophisticated passenger vehicle powertrains that continue to shape our transportation landscape today.
            </p>
          </div>
        </section>

        {/* Mechanics */}
        <section 
          id="mechanics" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.mechanics ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Zap className="w-8 h-8 text-blue-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">The Mechanics of Diesel Engines</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  Diesel engines operate on the principle of compression ignition, a fundamentally different approach from gasoline engines. The process begins when air inside the engine cylinder is compressed to extremely high temperatures and pressures.
                </p>
                <p>
                  At the precise moment of maximum compression, diesel fuel is injected directly into the superheated air, causing immediate and controlled combustion. This higher compression ratio allows diesel engines to extract significantly more energy from each unit of fuel, resulting in the superior fuel efficiency that diesel vehicles are renowned for.
                </p>
              </div>
            </div>
            <div className="relative group">
              <img
                src={images.d2}
                alt="Diesel Engine Mechanics"
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
            <Fuel className="w-8 h-8 text-blue-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Fuel Efficiency and Economy</h2>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                One of the most compelling advantages of diesel cars lies in their exceptional fuel efficiency. Diesel engines consistently demonstrate the ability to travel significantly further on a gallon of fuel compared to their gasoline counterparts, making them the ideal choice for long-distance driving and highway cruising.
              </p>
              <p>
                Modern diesel cars typically deliver between 20% and 30% better fuel economy than comparable gasoline-powered vehicles. This efficiency advantage becomes even more pronounced during highway driving, where diesel engines operate in their optimal efficiency range, often achieving fuel economy figures that seem almost impossible with gasoline engines.
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
            <Award className="w-8 h-8 text-blue-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Performance and Power</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative group order-2 lg:order-1">
              <img
                src={images.d3}
                alt="Diesel Performance"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  Diesel cars have earned their reputation for delivering robust, reliable performance, particularly when it comes to torque production. The high torque output characteristic of diesel engines makes them exceptionally powerful at low RPMs, providing immediate response and pulling power.
                </p>
                <p>
                  This low-end torque advantage proves especially valuable in real-world driving situations that require rapid acceleration, such as overtaking slower vehicles, merging onto busy highways, or navigating steep inclines with heavy loads.
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
            <Leaf className="w-8 h-8 text-blue-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Environmental Considerations</h2>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                The environmental impact of diesel engines presents a complex picture with both advantages and challenges. On the positive side, diesel engines produce notably lower carbon dioxide (CO2) emissions compared to gasoline engines, contributing less to greenhouse gas accumulation and climate change.
              </p>
              <p>
                However, diesel engines do emit higher levels of nitrogen oxides (NOx) and particulate matter, pollutants that can impact local air quality and human health. The automotive industry has responded to these challenges with remarkable innovation, developing advanced exhaust treatment systems including diesel particulate filters (DPF) and selective catalytic reduction (SCR) technology to dramatically reduce harmful emissions.
              </p>
            </div>
          </div>
          <div className="relative group">
            <img
              src={images.d1}
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
            <TrendingUp className="w-8 h-8 text-blue-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">The Future of Diesel Cars</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  The future of diesel cars exists in a state of dynamic evolution and uncertainty. While diesel engines continue to dominate in commercial and heavy-duty vehicle applications where their efficiency and durability advantages are most pronounced, the landscape for diesel-powered passenger cars has become increasingly complex.
                </p>
                <p>
                  The decline in demand for diesel passenger cars can be attributed to increasingly stringent emissions regulations and the rapid rise of electric vehicle technology. However, the story doesn't end there – exciting advancements in synthetic and renewable diesel fuels, including biodiesel and e-diesel, could potentially extend the operational life and environmental friendliness of diesel engines well into the future.
                </p>
              </div>
            </div>
            <div className="relative group">
              <img
                src={images.d5}
                alt="Future of Diesel"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Conclusion</h2>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Diesel cars have established and maintained a distinguished reputation built on three fundamental pillars: exceptional durability, superior fuel efficiency, and impressive power delivery. Despite facing significant environmental challenges and regulatory pressures, diesel vehicles continue to offer a unique and valuable combination of performance characteristics and economic benefits that remain difficult to replicate with other technologies.
              </p>
              <p>
                Looking ahead, continued advancements in emissions control technology, coupled with the promising potential of cleaner synthetic and renewable fuels, suggest that diesel cars may continue to occupy an important niche in our evolving automotive landscape. While their role may transform, their core strengths ensure they will remain relevant for years to come.
              </p>
            </div>
          </div>
          <div className="relative group">
            <img
              src={images.d6}
              alt="Diesel Legacy"
              className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </section>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-40 ${
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

export default Diesel;