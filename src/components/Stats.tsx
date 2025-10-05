import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Zap, Globe } from 'lucide-react';

const stats = [
  { icon: Users, value: 10000000, suffix: '+', label: 'Active Users', duration: 2000 },
  { icon: TrendingUp, value: 98, suffix: '%', label: 'Customer Satisfaction', duration: 1500 },
  { icon: Zap, value: 50, suffix: 'ms', label: 'Avg Response Time', duration: 1000 },
  { icon: Globe, value: 150, suffix: '+', label: 'Countries Served', duration: 2000 },
];

export default function Stats() {
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<number[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
          animateChart();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const increment = stat.value / (stat.duration / 50);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, 50);
    });
  };

  const animateChart = () => {
    const points = 12;
    const data: number[] = [];

    for (let i = 0; i < points; i++) {
      setTimeout(() => {
        const baseValue = 20 + (i * 6);
        const variance = Math.random() * 15;
        data.push(baseValue + variance);
        setChartData([...data]);
      }, i * 100);
    }
  };

  const formatValue = (value: number, index: number) => {
    if (index === 0) return (value / 1000000).toFixed(1) + 'M';
    return value.toString();
  };

  return (
    <section id="stats" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted Worldwide
            <span className="block mt-2 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              By Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join millions of users who trust ZephyrTech every day
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-cyan-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-cyan-500" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {formatValue(counters[index], index)}
                    <span className="text-cyan-500">{stat.suffix}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 border border-cyan-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Growth Metrics</h3>
                <p className="text-gray-400">Real-time performance data</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span className="text-sm text-gray-300">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-300">Users</span>
                </div>
              </div>
            </div>

            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {chartData.length > 1 && (
                  <>
                    <path
                      d={`M 0 ${200 - chartData[0]} ${chartData.map((val, i) => `L ${(i * 800) / (chartData.length - 1)} ${200 - val}`).join(' ')} L 800 200 L 0 200 Z`}
                      fill="url(#gradient1)"
                      className="animate-fade-in"
                    />
                    <path
                      d={`M 0 ${200 - chartData[0]} ${chartData.map((val, i) => `L ${(i * 800) / (chartData.length - 1)} ${200 - val}`).join(' ')}`}
                      fill="none"
                      stroke="rgb(6, 182, 212)"
                      strokeWidth="3"
                      className="animate-draw-line"
                    />

                    <path
                      d={`M 0 ${200 - chartData[0] + 20} ${chartData.map((val, i) => `L ${(i * 800) / (chartData.length - 1)} ${200 - val + 20}`).join(' ')} L 800 200 L 0 200 Z`}
                      fill="url(#gradient2)"
                      className="animate-fade-in delay-300"
                    />
                    <path
                      d={`M 0 ${200 - chartData[0] + 20} ${chartData.map((val, i) => `L ${(i * 800) / (chartData.length - 1)} ${200 - val + 20}`).join(' ')}`}
                      fill="none"
                      stroke="rgb(59, 130, 246)"
                      strokeWidth="3"
                      className="animate-draw-line delay-300"
                    />

                    {chartData.map((val, i) => (
                      <g key={i}>
                        <circle
                          cx={(i * 800) / (chartData.length - 1)}
                          cy={200 - val}
                          r="4"
                          fill="rgb(6, 182, 212)"
                          className="animate-pop-in cursor-pointer transition-all"
                          style={{ animationDelay: `${i * 100}ms` }}
                          onMouseEnter={(e) => {
                            setHoveredPoint(i);
                            const svg = e.currentTarget.closest('svg');
                            if (svg) {
                              const rect = svg.getBoundingClientRect();
                              setTooltipPosition({
                                x: ((i * 800) / (chartData.length - 1)) * (rect.width / 800),
                                y: (200 - val) * (rect.height / 200)
                              });
                            }
                          }}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                        {hoveredPoint === i && (
                          <circle
                            cx={(i * 800) / (chartData.length - 1)}
                            cy={200 - val}
                            r="8"
                            fill="none"
                            stroke="rgb(6, 182, 212)"
                            strokeWidth="2"
                            className="animate-ping"
                          />
                        )}
                      </g>
                    ))}
                  </>
                )}

                <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="0" y1="150" x2="800" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="50" x2="800" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5,5" />
              </svg>

              {hoveredPoint !== null && chartData[hoveredPoint] && (
                <div
                  className="absolute pointer-events-none bg-gray-900/95 backdrop-blur-sm rounded-lg px-4 py-3 border border-cyan-500/50 shadow-2xl shadow-cyan-500/20 z-20 animate-pop-in"
                  style={{
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y - 60}px`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="text-xs text-gray-400 mb-1">Month {hoveredPoint + 1}</div>
                  <div className="text-lg font-bold text-white">${(chartData[hoveredPoint] * 2).toFixed(1)}M</div>
                  <div className="text-xs text-cyan-400">Revenue</div>
                </div>
              )}

              <div className="absolute top-0 right-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
                <div className="text-sm text-gray-300 mb-1">Growth Rate</div>
                <div className="text-2xl font-bold text-white">+247%</div>
                <div className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>Year over year</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {['Q1 2024', 'Q2 2024', 'Q3 2024'].map((quarter, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">{quarter}</div>
                  <div className="text-lg font-bold text-white">
                    ${(45 + index * 15).toFixed(1)}M
                  </div>
                  <div className="text-xs text-cyan-400">+{20 + index * 5}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
