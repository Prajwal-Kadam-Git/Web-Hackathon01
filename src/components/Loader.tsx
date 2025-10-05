import { Zap } from 'lucide-react';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900">
      <div className="relative">
        <div className="absolute inset-0 animate-ping">
          <div className="h-32 w-32 rounded-full bg-cyan-400 opacity-20"></div>
        </div>
        <div className="relative flex flex-col items-center gap-6">
          <div className="animate-bounce">
            <Zap className="h-20 w-20 text-cyan-400" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-bold text-white tracking-wider">
              Zephyr<span className="text-cyan-400">Tech</span>
            </h1>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse delay-75"></div>
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
