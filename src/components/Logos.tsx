import { Building2 } from 'lucide-react';

const companies = [
  'TechCorp', 'InnovateCo', 'DataStream', 'CloudNine',
  'DigitalWave', 'FutureNet', 'SmartSys', 'NexGen',
  'CyberEdge', 'Quantum Labs', 'Velocity', 'Horizon'
];

export default function Logos() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted By
            <span className="block mt-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Global Leaders
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join thousands of companies transforming their workflow
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-800/50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-800/50 to-transparent z-10"></div>

          <div className="flex animate-scroll-left">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 group cursor-pointer"
              >
                <div className="w-48 h-24 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-8 w-8 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                    <span className="text-lg font-bold text-gray-700 dark:text-gray-300 group-hover:text-cyan-500 transition-colors">
                      {company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex animate-scroll-right mt-8">
            {[...companies.slice(6), ...companies.slice(6)].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 group cursor-pointer"
              >
                <div className="w-48 h-24 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-8 w-8 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                    <span className="text-lg font-bold text-gray-700 dark:text-gray-300 group-hover:text-cyan-500 transition-colors">
                      {company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            And 10,000+ more companies worldwide
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-cyan-500/50">
            See All Success Stories
          </button>
        </div>
      </div>
    </section>
  );
}
