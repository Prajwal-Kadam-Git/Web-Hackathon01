import { useEffect, useRef, useState } from 'react';
import { Cpu, Shield, Zap, Globe, BarChart, Users, ExternalLink } from 'lucide-react';
import Modal from './Modal';

const features = [
  {
    icon: Cpu,
    title: 'AI-Powered Automation',
    description: 'Leverage machine learning to automate repetitive tasks and boost productivity by 10x.',
    color: 'cyan',
    details: 'Our AI-powered automation uses cutting-edge machine learning algorithms to identify patterns and automate workflows. Features include smart task delegation, predictive scheduling, and intelligent resource allocation that learns from your team behavior to optimize processes over time.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and compliance with SOC 2, GDPR, and HIPAA standards.',
    color: 'blue',
    details: 'Security is our top priority. We employ AES-256 encryption for data at rest and TLS 1.3 for data in transit. Our infrastructure undergoes regular third-party security audits and penetration testing to ensure compliance with international standards.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built on edge computing for millisecond response times across the globe.',
    color: 'purple',
    details: 'Our edge computing infrastructure ensures sub-50ms response times worldwide. We use intelligent request routing, distributed caching, and optimized data structures to deliver blazing-fast performance regardless of user location.'
  },
  {
    icon: Globe,
    title: 'Global CDN',
    description: 'Deployed across 200+ locations worldwide for optimal performance.',
    color: 'cyan',
    details: 'With over 200 points of presence across six continents, our global CDN ensures your content is delivered from the closest server to your users. Automatic failover and load balancing guarantee 99.99% uptime.'
  },
  {
    icon: BarChart,
    title: 'Advanced Analytics',
    description: 'Real-time insights and predictive analytics to drive data-driven decisions.',
    color: 'blue',
    details: 'Transform raw data into actionable insights with our advanced analytics suite. Features include real-time dashboards, customizable reports, predictive modeling, and AI-powered recommendations to help you make informed decisions.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Seamless real-time collaboration with built-in chat, video, and workflows.',
    color: 'purple',
    details: 'Bring your team together with integrated collaboration tools. Real-time document editing, HD video conferencing, threaded discussions, and automated workflows keep everyone aligned and productive.'
  },
];

export default function Features() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for
            <span className="block mt-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Modern Teams
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to scale your business, all in one platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.has(index);

            return (
              <div
                key={index}
                data-index={index}
                onClick={() => setSelectedFeature(index)}
                className={`feature-card group relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-${feature.color}-500 transition-all duration-500 cursor-pointer ${
                  isVisible ? 'animate-pop-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all duration-500"></div>

                <div className={`relative mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-${feature.color}-500/10 to-${feature.color}-600/10 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 text-${feature.color}-500`} />
                  <div className={`absolute inset-0 bg-${feature.color}-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity rounded-xl`}></div>
                </div>

                <h3 className="relative text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-500 transition-colors">
                  {feature.title}
                </h3>

                <p className="relative text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>

                <button className="relative flex items-center gap-2 text-cyan-500 hover:text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn More
                  <ExternalLink className="h-4 w-4" />
                </button>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedFeature !== null && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedFeature(null)}
          title={features[selectedFeature].title}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
              {(() => {
                const Icon = features[selectedFeature].icon;
                return <Icon className="h-12 w-12 text-cyan-500" />;
              })()}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {features[selectedFeature].title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {features[selectedFeature].description}
                </p>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {features[selectedFeature].details}
              </p>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform">
                Get Started
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-cyan-500 text-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-colors">
                Documentation
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
