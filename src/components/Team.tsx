import { useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';

const team = [
  {
    name: 'Alex Thompson',
    role: 'Chief Executive Officer',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Visionary leader with 15+ years in SaaS',
  },
  {
    name: 'Jessica Martinez',
    role: 'Chief Technology Officer',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Former Google engineer, AI specialist',
  },
  {
    name: 'Ryan Cooper',
    role: 'Head of Product',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Product design expert from Silicon Valley',
  },
  {
    name: 'Sophia Lee',
    role: 'VP of Engineering',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Cloud infrastructure architect',
  },
];

export default function Team() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
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

    const cards = sectionRef.current?.querySelectorAll('.team-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our
            <span className="block mt-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Expert Team
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Passionate innovators building the future of work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => {
            const isVisible = visibleCards.has(index);

            return (
              <div
                key={index}
                data-index={index}
                className={`team-card group relative ${
                  isVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-cyan-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex gap-3 justify-center">
                        <a
                          href="#"
                          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-cyan-500 transition-colors"
                        >
                          <Linkedin className="h-5 w-5 text-white" />
                        </a>
                        <a
                          href="#"
                          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-cyan-500 transition-colors"
                        >
                          <Twitter className="h-5 w-5 text-white" />
                        </a>
                        <a
                          href="#"
                          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-cyan-500 transition-colors"
                        >
                          <Github className="h-5 w-5 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-cyan-500 font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.bio}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
              Join our team of innovators and help shape the future of productivity technology.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30">
              View Open Positions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
