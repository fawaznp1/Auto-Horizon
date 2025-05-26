import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"
import FeaturedCarSection from './Featured';
import AutoHorizonHero from './Hero';
import UrbanDriveAd from './ToUrban';



function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // Mock data for automotive categories
  const categories = [
    {
      id: 'vintage',
      title: 'Vintage',
      description: 'Explore the charm of vintage automobiles with detailed reviews, restoration insights, and historical journeys. Let\'s dive into the past and relive the glory of classic cars together.',
      image: 'https://images.unsplash.com/photo-1549359030-a86ed42ff8e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhciUyMHNpZGV8ZW58MHx8MHx8fDA%3D',
      color: 'from-amber-500 to-orange-600',
      route: '/vintage'
    },
    {
      id: 'latest',
      title: 'Latest',
      description: 'Keep pace with the newest in automotive technology, from electric vehicles to groundbreaking self-driving features. Embrace the future and learn about the latest innovations.',
      image: 'https://images.unsplash.com/photo-1708063786743-723430dae8f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhciUyMHNpZGV8ZW58MHx8MHx8fDA%3D',
      color: 'from-blue-500 to-cyan-600',
      route: '/latest'
    }
  ];

  const blogs = [
    {
      id: 'electric',
      title: 'Electric',
      description: 'Discover the future of transportation with electric vehicles, and learn about the latest advancements in EV technology.',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      color: '',
      route: '/electric'
    },
    {
      id: 'hybrid',
      title: 'Hybrid',
      description: 'Learn how hybrid cars are blending traditional and electric technology to reduce emissions and improve efficiency.',
      image: 'https://images.unsplash.com/photo-1530675706010-bc677ce30ab6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGNhcnxlbnwwfHwwfHx8MA%3D%3D',
      color: 'from-purple-500 to-indigo-600',
      route: '/hybrid'
    },
    {
      id: 'diesel',
      title: 'Diesel',
      description: 'Dive deep into the world of diesel engines and understand their power, efficiency, and applications in the automotive industry.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      color: 'from-gray-600 to-slate-700',
      route: '/diesel'
    }
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  const CardComponent = ({ item, isLarge = false, index }) => (
    <div 
      className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${isLarge ? 'h-96' : 'h-80'}`}
      onMouseEnter={() => setHoveredCard(item.id)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={() => handleNavigation(item.route)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-110 "
          style={{ filter: 'blur(3px)' }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t  opacity-75 group-hover:opacity-85 transition-opacity duration-300`}></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
          <span className={`inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 ${hoveredCard === item.id ? 'animate-pulse' : ''}`}>
            {item.title}
          </span>
          <p className="text-white/90 leading-relaxed mb-4">
            {item.description}
          </p>
          <button 
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full font-semibold transition-all duration-300 group-hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation(item.route);
            }}
          >
            <span>{isLarge ? 'Explore' : 'Read More'}</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Animated Border */}
      <div className={`absolute inset-0 border-2 border-white/30 rounded-2xl transition-all duration-300 ${hoveredCard === item.id ? 'border-white/60' : ''}`}></div>
    </div>
  );

  const StatsCounter = ({ number, label, delay }) => {
    const [count, setCount] = useState(0);
    
    React.useEffect(() => {
      const timer = setTimeout(() => {
        const increment = number / 50;
        const counter = setInterval(() => {
          setCount(prev => {
            if (prev < number) {
              return Math.min(prev + increment, number);
            }
            clearInterval(counter);
            return number;
          });
        }, 20);
        
        return () => clearInterval(counter);
      }, delay);
      
      return () => clearTimeout(timer);
    }, [number, delay]);
    
    return (
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {Math.floor(count).toLocaleString()}+
        </div>
        <div className="text-gray-600">{label}</div>
      </div>
    );
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      alert(`Thank you for subscribing with email: ${email}`);
      e.target.reset();
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}

      <AutoHorizonHero />


      <section className="py-12 px-4" id='home'>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl mt-5 font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Automotive Excellence
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the world of automobiles through our comprehensive guides and expert insights
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {categories.map((category, index) => (
              <CardComponent key={category.id} item={category} isLarge={true} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter number={50000} label="Happy Customers" delay={0} />
            <StatsCounter number={1200} label="Cars Reviewed" delay={200} />
            <StatsCounter number={15} label="Years Experience" delay={400} />
            <StatsCounter number={98} label="Satisfaction Rate" delay={600} />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore Recent Blogs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay updated with expert advice, cutting-edge insights, and practical tips for your automotive knowledge
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <CardComponent key={blog.id} item={blog} index={index} />
            ))}
          </div>
        </div>
      </section>
 <FeaturedCarSection />
      {/* Location & Video Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Location */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Our Location
                </h2>
                <p className="text-gray-600 mb-6">Visit us in the heart of Mumbai for automotive consultations and services.</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.14616381048!2d72.71602662026807!3d19.082177204217967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1727808922925!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                  title="Google Map"
                ></iframe>
              </div>
            </div>

            {/* Video */}
            <div className="space-y-6" id='video'>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Our Video
                </h2>
                <p className="text-gray-600 mb-6">Get an inside look at our automotive expertise and latest innovations.</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/3FVwrVp1D7A?si=tcRGTkflEtaa7HIN"
                  title="YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest automotive news and insights delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-3 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button 
                type="submit"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section> */}
           <div className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
  <UrbanDriveAd />
</div>

    </div>
  );
}


export default Home;