import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden selection:bg-white selection:text-black relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-10 z-10 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-white fill-current" />
          <span className="font-bold tracking-tight">Foco</span>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            <Zap className="text-black w-8 h-8 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Focus on Execution</h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Foco was built out of a simple necessity: to strip away the noise and focus entirely on execution. 
            No overly complex workflows, no unnecessary features—just a clean, lightning-fast dashboard that gets out of your way and lets you work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8"
        >
          {[
            { title: 'Speed', desc: 'Built for lightning-fast interactions without page reloads.' },
            { title: 'Clarity', desc: 'A minimalist aesthetic that reduces cognitive load.' },
            { title: 'Focus', desc: 'Features designed to help you prioritize what truly matters.' }
          ].map((feature, i) => (
            <div key={i} className="bg-[#0f0f0f] border border-white/5 p-6 rounded-2xl text-left hover:border-white/10 transition-colors">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-2">{feature.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/5 w-full flex flex-col items-center"
        >
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">Connect with us</span>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-[#0f0f0f] border border-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="#" className="p-3 bg-[#0f0f0f] border border-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="p-3 bg-[#0f0f0f] border border-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AboutPage;
