

import React from 'react';
import { ArrowRight, CheckCircle, Users, Award, PlayCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative  bg-slate-50 flex items-center justify-center overflow-hidden font-sans">
      {/* Background Decorative Shapes - These will show in the empty spaces on sides */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 -right-20 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      <div className="absolute -bottom-20 left-40 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      {/* Main Container constrained to max-w-7xl */}
      <div className="max-w-7xl w-full mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold tracking-wide text-blue-700 uppercase bg-blue-100 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Skilled Youth, Prosperous Nation 🇧🇩
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Launch Your Technical Career <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">With Us</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Empowering young people across Bangladesh with modern technical education, practical skills, and industry-relevant training to build sustainable careers and contribute to national development.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 group">
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all active:scale-95 hover:border-slate-300">
                <PlayCircle className="w-5 h-5 text-blue-600" />
                Free Seminar
              </button>
            </div>

            {/* Stats/Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 border-t border-slate-200 pt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-slate-900">12,000+</p>
                  <p className="text-sm text-slate-500">Graduates</p>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-10 bg-slate-200"></div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <Award className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-slate-900">25+</p>
                  <p className="text-sm text-slate-500">Expert Mentors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="lg:w-1/2 relative w-full">
            <div className="relative z-10 w-full max-w-lg mx-auto lg:ml-auto">
              {/* Main Image Container */}
              <div className="bg-white p-3 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                    alt="Technical Training Session" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
              
              {/* Floating Badge 1 - Top Left */}
              <div className="absolute -top-6 -left-4 md:-left-8 bg-white p-3 pr-5 rounded-xl shadow-xl flex items-center gap-3 animate-bounce shadow-blue-100/50">
                <div className="bg-green-100 p-2 rounded-full">
                   <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Govt. Approved</p>
                  <p className="text-xs text-slate-500">Registered Institute</p>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Right */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-pulse shadow-teal-100/50 border border-slate-50">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="Student" />
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=5" alt="Student" />
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=8" alt="Student" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Top Rated</p>
                  <div className="flex text-yellow-400 text-xs">
                    ★★★★★
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background pattern dots */}
            <div className="absolute -z-10 top-10 right-10 opacity-20">
               <svg width="100" height="100" fill="none" viewBox="0 0 100 100">
                 <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                   <circle cx="2" cy="2" r="2" className="text-blue-500" fill="currentColor" />
                 </pattern>
                 <rect width="100" height="100" fill="url(#dots)" />
               </svg>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;