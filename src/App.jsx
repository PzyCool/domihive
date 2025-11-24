import React from 'react';
import bbwLogo from './assets/BBW PNG LOGO2.png';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      {/* Header */}
      <header className="pt-16 pb-12">
        <div className="container mx-auto px-6">
          {/* Logos */}
          <div className="flex justify-center items-center gap-12 mb-16">
            <a 
              href="https://vite.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <img 
                  src="/domihive-logo 2.png" 
                  alt="Domihive logo" 
                  className="relative w-20 h-20 drop-shadow-lg"
                />
              </div>
            </a>
            
            <div className="flex flex-col items-center">
              <div className="text-sm font-semibold text-slate-400 dark:text-slate-500 mb-2">
                PARTNERSHIP
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
            </div>

            <a 
              href="https://react.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <img 
                  src={bbwLogo} 
                  alt="BBW logo" 
                  className="relative w-20 h-20 drop-shadow-lg"
                />
              </div>
            </a>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              Domihive Frontend
            </h1>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Building Mode Active
              </span>
              <span className="text-lg">🚀</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-2xl">👋</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Welcome Team!
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  The frontend skeleton is ready and <span className="font-semibold text-purple-600 dark:text-purple-400">Tailwind CSS v4.1 is installed</span>. 
                  We are officially in <span className="italic text-slate-700 dark:text-slate-200">"building mode"</span>! 💪
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Frontend Team */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                  Frontend Engineers & Leadership
                </h3>
                <div className="space-y-4">
                  {[
                    { 
                      name: "Melvin (CTO)", 
                      role: "Lead Frontend Developer", 
                      skills: "React, Tailwind, Next.js, React Native, CSS, HTML, JavaScript" 
                    },
                    { 
                      name: "Brian (VP of Frontend)", 
                      role: "Frontend Strategy Lead", 
                      skills: "HTML, CSS, JavaScript, React" 
                    },
                    { 
                      name: "Prosper (CEO)", 
                      role: "Component Development", 
                      skills: "HTML, CSS, JavaScript, Tailwind, React" 
                    }
                  ].map((member, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-xl border border-slate-100 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-500 transition-colors duration-200 group hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                        {member.role}
                      </p>
                      <p className="text-slate-500 dark:text-slate-500 text-xs">
                        {member.skills}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Status */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  Current Status
                </h3>
                <ul className="space-y-3">
                  {[
                    "Product designs for mobile and web are complete and approved",
                    "Minor tweaks remain; the React frontend skeleton is ready",
                    "Tailwind 4.1 is installed; start converting designs into responsive React components"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Other Team & Next Steps */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                  Other Team Members
                </h3>
                <div className="space-y-4">
                  {[
                    { 
                      name: "Olamide (CPO)", 
                      role: "Product Designer",
                      note: "Completed mobile & web designs in Figma" 
                    },
                    { 
                      name: "Emmanuel (COO)", 
                      role: "Full-Stack Developer & Backend Lead" 
                    },
                    { 
                      name: "Civvics (CFO)", 
                      role: "Cybersecurity & Digital Marketing" 
                    }
                  ].map((member, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-xl border border-slate-100 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200 group hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                        {member.role}
                      </p>
                      {member.note && (
                        <p className="text-slate-500 dark:text-slate-500 text-xs">
                          {member.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                  Next Steps
                </h3>
                <ul className="space-y-3">
                  {[
                    { text: "Melvin – Lead Tailwind + React implementation", highlight: true },
                    { text: "Brian & Prosper – Assist with React components using Tailwind", highlight: true },
                    { text: "Regular updates – Share progress in weekly meetings" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className={item.highlight ? "font-medium text-slate-700 dark:text-slate-200" : ""}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">
              Let's build Domihive together and make the frontend shine! ✨
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;