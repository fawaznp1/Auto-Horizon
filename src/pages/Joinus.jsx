import React, { useState } from 'react';
import { ArrowRight, Zap, Users, Trophy, Coffee, Heart, Star } from 'lucide-react';

export default function JoinUsComponent() {
  const [hoveredPerk, setHoveredPerk] = useState(null);

  const perks = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Unlimited Growth",
      description: "Fast-track your career with cutting-edge projects and mentorship",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dream Team",
      description: "Work alongside brilliant minds who push boundaries daily",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Recognition",
      description: "Your wins are celebrated, your ideas are heard and valued",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Work-Life Balance",
      description: "Flexible hours, remote options, and unlimited coffee",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Wellness",
      description: "Comprehensive benefits, mental health support, gym membership",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Innovation Culture",
      description: "20% time for passion projects, hackathons, and experiments",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex mt-4 items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm font-medium">We're hiring</span>
          </div>
          
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Join the <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
               Revolution
            </span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Be part of something extraordinary. Shape the future with us and unlock your potential in an environment where innovation thrives.
          </p>

          <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center gap-3 mx-auto">
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Perks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {perks.map((perk, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer"
              onMouseEnter={() => setHoveredPerk(index)}
              onMouseLeave={() => setHoveredPerk(null)}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${perk.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${perk.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {perk.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                  {perk.title}
                </h3>
                
                <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-white/60">Team Members</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-white/60">Countries</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">4.9★</div>
              <div className="text-white/60">Glassdoor Rating</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
              <div className="text-white/60">Employee NPS</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Make Your Mark?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Your next chapter starts here. Join a company that invests in your growth and celebrates your success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-6 py-3  font-semibold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105">
              View Open Positions
            </button>
            <button className="border border-white/30 text-white px-6 py-3  font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
              Learn Our Culture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}