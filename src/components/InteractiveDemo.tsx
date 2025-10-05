import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, TrendingUp, Activity, Zap } from 'lucide-react';

export default function InteractiveDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeMetric, setActiveMetric] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const generateParticle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();

    setParticles((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  };

  const metrics = [
    { icon: TrendingUp, label: 'Revenue Growth', value: '+247%', color: 'cyan' },
    { icon: Activity, label: 'Active Users', value: '1.2M', color: 'blue' },
    { icon: Zap, label: 'Performance', value: '99.9%', color: 'purple' },
  ];

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Experience
            <span className="block mt-2 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              See It In Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Play with our live demo and explore the possibilities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            ref={canvasRef}
            onClick={generateParticle}
            className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 cursor-pointer group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>

            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-100"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-200"></div>
            </div>

            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-8 h-8 pointer-events-none"
                style={{ left: particle.x - 16, top: particle.y - 16 }}
              >
                <div className="w-full h-full bg-cyan-400 rounded-full animate-ping"></div>
              </div>
            ))}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30">
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-gray-700 rounded animate-pulse" style={{ width: `${60 + i * 20}%` }}></div>
                          <div className="h-2 bg-gray-700 rounded animate-pulse" style={{ width: `${40 + i * 15}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
              <div className="flex items-center gap-4 mb-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-600 transition-colors"
                >
                  {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProgress(0);
                    setIsPlaying(false);
                  }}
                  className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="h-5 w-5 text-white" />
                </button>
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                const isActive = activeMetric === index;

                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border transition-all duration-500 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500 scale-105'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-cyan-500/50'
                    }`}
                    onClick={() => setActiveMetric(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br from-${metric.color}-500/20 to-${metric.color}-600/20`}>
                          <Icon className={`h-6 w-6 text-${metric.color}-500`} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Real-Time Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Click anywhere on the demo canvas to create interactive particles and see the system respond in real-time.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform">
                Explore More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
