import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Car, Zap, Star } from 'lucide-react';
import Data from "../components/Data";

const CarShowcase = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');

  // Get unique brands for filter
  const brands = ['all', ...new Set(Data.map(car => car.brand))];

  // Filter cars based on search and brand
  const filteredCars = Data.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || car.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const toggleExpanded = (carId) => {
    setExpandedCard(expandedCard === carId ? null : carId);
  };

  const truncateText = (text, wordLimit = 30) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mt-5 mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Latest Cars in 2025
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover exceptional automobiles with detailed insights and specifications
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search cars or brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'All Brands' : brand}
              </option>
            ))}
          </select>
        </div>

        {/* Car List */}
        <div className="space-y-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-1/3 h-64 lg:h-auto bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative overflow-hidden">
                  {car.image ? (
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Car className="text-slate-500 mx-auto mb-2" size={48} />
                      <p className="text-slate-400 text-sm">{car.name}</p>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {car.brand}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3 flex flex-col">
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-700/50 flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{car.name}</h3>
                      <Star className="text-yellow-400" size={24} />
                    </div>
                    
                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {(Array.isArray(car.features) ? car.features.slice(0, 4) : []).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                          <Zap className="text-green-400 flex-shrink-0" size={16} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {Array.isArray(car.features) && car.features.length > 4 && (
                      <div className="text-sm text-slate-400 mb-4">
                        +{car.features.length - 4} more features
                      </div>
                    )}

                    {/* Blog Content */}
                    <div className="text-slate-300 text-sm leading-relaxed mb-4">
                      {expandedCard === car.id ? car.blog : truncateText(car.blog, 40)}
                    </div>
                    
                    <button
                      onClick={() => toggleExpanded(car.id)}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm group"
                    >
                      {expandedCard === car.id ? (
                        <>
                          <span>Show Less</span>
                          <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      ) : (
                        <>
                          <span>Read More</span>
                          <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded Features */}
                  {expandedCard === car.id && Array.isArray(car.features) && car.features.length > 4 && (
                    <div className="px-6 pb-6 border-t border-slate-700/50 pt-4">
                      <h4 className="text-white font-semibold mb-3 text-sm">Additional Features:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {car.features.slice(4).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                            <Zap className="text-green-400 flex-shrink-0" size={16} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <Car className="text-slate-600 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No cars found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarShowcase;
