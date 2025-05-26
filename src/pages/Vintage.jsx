import React, { useState, useEffect } from 'react';
import { ChevronUp, Crown, Star, Heart, TrendingUp, Clock, Award } from 'lucide-react';
import LikesCommentsComponent from '../components/Commentbox';

// Mock images - replace with your actual imports
const images = {
  d1: 'https://images.unsplash.com/photo-1617184236360-66bd2e7217c1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  d2: 'https://images.unsplash.com/photo-1698871538326-6b0acf31d1c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  d3: 'https://images.unsplash.com/photo-1631533859406-8c271de29366?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  d4: 'https://images.unsplash.com/photo-1610479415732-10db2f23cc62?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  d5: 'https://images.unsplash.com/photo-1563137391-0030ae24bc35?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  d6: 'https://images.unsplash.com/photo-1670795031457-3c8c0cf62cb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
};

function VintageCars() {
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
    { id: 'craftsmanship', title: 'Craftsmanship', icon: Star },
    { id: 'design', title: 'Timeless Design', icon: Crown },
    { id: 'performance', title: 'Performance', icon: Award },
    { id: 'culture', title: 'Culture', icon: Heart },
    { id: 'future', title: 'Legacy', icon: TrendingUp }
  ];

  const stats = [
    { label: 'Classic Models Still Running', value: '75%', icon: Crown },
    { label: 'Value Appreciation', value: '150%', icon: Star },
    { label: 'Collector Interest Growth', value: '200%', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
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
                  ? 'bg-amber-500 text-white shadow-md' 
                  : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
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
            The Timeless Allure of
            <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Vintage Cars
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up animation-delay-300">
            Exploring craftsmanship, elegance, and the enduring legacy of classic automobiles
          </p>
          <button 
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-amber-500 hover:bg-amber-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-600"
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
                className={`text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 transform transition-all duration-700 ${
                  isVisible.intro ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-amber-600 mb-2">{value}</div>
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
            <Clock className="w-8 h-8 text-amber-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Introduction</h2>
          </div>
          <div className="prose prose-lg text-gray-600 leading-relaxed">
            <p className="text-xl mb-6">
              Vintage cars represent more than mere transportation; they embody an era of automotive artistry where craftsmanship, elegance, and mechanical precision converged to create rolling sculptures. These magnificent machines from bygone decades continue to captivate enthusiasts and collectors worldwide with their timeless appeal and unmatched character.
            </p>
            <p>
              The golden age of automotive design produced vehicles that were not just functional machines, but expressions of cultural identity, technological innovation, and artistic vision. Each vintage car tells a story of its time, reflecting the social values, engineering capabilities, and aesthetic sensibilities of the era in which it was born.
            </p>
          </div>
        </section>

        {/* Craftsmanship */}
        <section 
          id="craftsmanship" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.craftsmanship ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Star className="w-8 h-8 text-amber-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">The Art of Craftsmanship</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  Vintage cars were built during an era when automotive manufacturing was as much an art form as it was an industrial process. Skilled craftsmen hand-shaped metal panels, carefully assembled intricate mechanical components, and meticulously finished every detail with a level of attention that has become increasingly rare in today's mass-production world.
                </p>
                <p>
                  The construction of these classic automobiles involved techniques that have been passed down through generations of artisans. From hand-stitched leather interiors to chrome detailing that was polished to mirror perfection, every element was crafted with pride and precision that is immediately apparent to anyone who experiences these mechanical masterpieces.
                </p>
              </div>
            </div>
            <div className="relative group">
              <img
                src={images.d2}
                alt="Vintage Car Craftsmanship"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Design */}
        <section 
          id="design" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.design ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Crown className="w-8 h-8 text-amber-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Timeless Design Philosophy</h2>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                The design philosophy of vintage cars was rooted in the belief that automobiles should be beautiful objects that inspire emotion and admiration. Unlike modern vehicles that prioritize aerodynamics and fuel efficiency, vintage cars were designed to make bold visual statements with sweeping curves, distinctive grilles, and elegant proportions.
              </p>
              <p>
                These classic designs have proven their timeless appeal by remaining stunning and relevant decades after their creation. The flowing lines of a 1960s sports car or the imposing presence of a 1950s luxury sedan continue to turn heads and evoke feelings of nostalgia and admiration that transcend generational boundaries.
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
            <Award className="w-8 h-8 text-amber-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Performance and Character</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative group order-2 lg:order-1">
              <img
                src={images.d3}
                alt="Vintage Car Performance"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  Vintage cars offer a driving experience that is fundamentally different from modern vehicles. The mechanical connection between driver and machine is immediate and visceral, with every input requiring deliberate action and providing tangible feedback that creates an intimate relationship between human and automobile.
                </p>
                <p>
                  The character of vintage cars extends beyond mere performance numbers to encompass the entire sensory experience: the distinctive sound of carbureted engines, the satisfying weight of mechanical controls, and the unique driving dynamics that make each journey an engaging adventure rather than a passive commute.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Culture */}
        <section 
          id="culture" 
          className={`mb-20 transform transition-all duration-700 ${
            isVisible.culture ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center mb-8">
            <Heart className="w-8 h-8 text-amber-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Cultural Impact and Community</h2>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl border border-rose-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Vintage cars have fostered vibrant communities of enthusiasts who share a passion for automotive history and craftsmanship. These communities span the globe, bringing together people from diverse backgrounds who are united by their appreciation for classic automobiles and the stories they tell.
              </p>
              <p>
                Car shows, rallies, and restoration projects have become cultural phenomena that celebrate not just the vehicles themselves, but the social connections and shared experiences they create. The vintage car community represents a living preservation of automotive heritage, ensuring that these mechanical treasures continue to inspire future generations.
              </p>
            </div>
          </div>
          <div className="relative group">
            <img
              src={images.d1}
              alt="Vintage Car Culture"
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
            <TrendingUp className="w-8 h-8 text-amber-500 mr-4" />
            <h2 className="text-4xl font-bold text-gray-800">Preserving the Legacy</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  The future of vintage cars lies in the dedicated efforts of collectors, restorers, and enthusiasts who recognize their historical and cultural significance. As these vehicles become increasingly rare, their preservation becomes both more challenging and more important for maintaining our automotive heritage.
                </p>
                <p>
                  Modern technology is playing an increasingly important role in vintage car preservation through 3D scanning, digital documentation, and advanced restoration techniques. This marriage of old and new ensures that future generations will continue to have access to these remarkable examples of automotive artistry and engineering excellence.
                </p>
              </div>
            </div>
            <div className="relative group">
              <img
                src={images.d5}
                alt="Vintage Car Legacy"
                className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Conclusion</h2>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-100 mb-8">
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Vintage cars represent a unique intersection of art, technology, and culture that continues to captivate and inspire automotive enthusiasts around the world. These mechanical masterpieces serve as tangible connections to our automotive past while demonstrating the timeless appeal of exceptional design and craftsmanship.
              </p>
              <p>
                As we move forward into an era of increasingly digital and automated transportation, vintage cars remind us of the pure joy of driving and the human connection to mechanical engineering. Their preservation and celebration ensure that future generations will understand and appreciate the rich heritage of automotive excellence that continues to influence design and engineering today.
              </p>
            </div>
          </div>
          <div className="relative group">
            <img
              src={images.d6}
              alt="Vintage Car Heritage"
              className="w-full h-80 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </section>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-40 ${
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

export default VintageCars;