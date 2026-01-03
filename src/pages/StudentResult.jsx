



import React, { useState } from 'react';
import { Search, GraduationCap, User, FileText, Award, AlertCircle, BookOpen, CheckCircle2, XCircle } from 'lucide-react';

// Demo data
const sampleResults = [
  { roll: 'BT1001', name: 'Ayesha Rahman', class: 'HSC', marks: 85, grade: 'A+', status: 'Pass' },
  { roll: 'BT1002', name: 'Rafi Ahmed', class: 'SSC', marks: 72, grade: 'A', status: 'Pass' },
  { roll: 'BT1003', name: 'Mina Khan', class: 'Diploma', marks: 58, grade: 'C', status: 'Pass' },
  // Added a fail case for visual testing
  { roll: 'BT1004', name: 'Suhail Karim', class: 'HSC', marks: 32, grade: 'F', status: 'Fail' },
];

const StudentResult = () => {
  const [roll, setRoll] = useState('');
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = roll.trim().toUpperCase();
    if (!key) return;

    setLoading(true);
    setResult(null);
    setNotFound(false);

    // Simulate a small network delay for a better UX feel
    setTimeout(() => {
      const found = sampleResults.find((s) => s.roll.toUpperCase() === key);
      if (found) {
        setResult(found);
        setNotFound(false);
      } else {
        setResult(null);
        setNotFound(true);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      
      {/* Main Card Container */}
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Header Section */}
        <div className="bg-linear-to-r from-violet-600 to-indigo-600 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
             </svg>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white/20 p-3 rounded-full mb-3 backdrop-blur-sm shadow-inner">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">Student Portal</h1>
            <p className="text-violet-100 text-sm mt-1">Check your exam results instantly</p>
          </div>
        </div>

        {/* Search Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="relative">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">
              Roll / Registration No
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                  placeholder="e.g. BT1001"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-violet-600 hover:bg-violet-700 active:scale-95 text-white px-6 rounded-xl font-medium shadow-lg shadow-violet-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>

          {/* Result Section */}
          <div className="mt-8 min-h-[180px]">
            {loading ? (
               <div className="flex flex-col items-center justify-center h-full py-8 space-y-3 opacity-50">
                 <div className="w-full max-w-xl h-2 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-violet-400 animate-progress w-1/2"></div>
                 </div>
                 <p className="text-sm text-slate-400">Fetching data...</p>
               </div>
            ) : result ? (
              <div className="animate-fade-in-up">
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-lg shadow-slate-200/50 relative overflow-hidden">
                  
                  {/* Decorative status bar */}
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${result.status === 'Pass' ? 'bg-green-500' : 'bg-red-500'}`}></div>

                  <div className="flex justify-between items-start mb-6 pl-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        {result.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                          <User className="w-3 h-3" /> {result.roll}
                        </span>
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                          <BookOpen className="w-3 h-3" /> {result.class}
                        </span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                      result.status === 'Pass' 
                        ? 'bg-green-50 text-green-600 border-green-200' 
                        : 'bg-red-50 text-red-600 border-red-200'
                    }`}>
                      {result.status === 'Pass' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {result.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pl-2">
                    <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center border border-slate-100">
                      <span className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Total Marks</span>
                      <span className="text-3xl font-black text-slate-700">{result.marks}</span>
                    </div>
                    <div className={`rounded-xl p-4 flex flex-col items-center justify-center border ${
                      result.status === 'Pass' ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'
                    }`}>
                      <span className={`${result.status === 'Pass' ? 'text-green-600' : 'text-red-600'} text-xs uppercase font-bold tracking-wider mb-1`}>GPA / Grade</span>
                      <span className={`text-3xl font-black ${result.status === 'Pass' ? 'text-green-600' : 'text-red-600'}`}>
                        {result.grade}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : notFound ? (
              <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in">
                <div className="bg-red-50 p-3 rounded-full mb-3">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-slate-800 font-medium">Result Not Found</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-[200px]">
                  We couldn't find a result for <span className="font-mono font-bold text-slate-700">"{roll}"</span>. Please check the number.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 opacity-40">
                <FileText className="w-12 h-12 text-slate-300 mb-2" />
                <p className="text-sm font-medium text-slate-400">Enter your Roll No to see results</p>
              </div>
            )}
          </div>

        </div>
        
        {/* Footer */}
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400">© 2024 Exam Controller Office. All rights reserved.</p>
        </div>
      </div>
      
      {/* Custom Keyframe animation styles injection for this component */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
        .animate-progress {
          animation: progress 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default StudentResult;