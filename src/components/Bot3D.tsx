import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export default function Bot3D() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Hi! I'm Zephyr, your AI assistant. How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const botResponses = [
    "That's a great question! Our platform uses advanced AI to streamline your workflow.",
    "I'd be happy to help! ZephyrTech offers 24/7 support and enterprise-grade security.",
    "Absolutely! You can start with our free trial - no credit card required.",
    "Our customers typically see a 3x productivity boost within the first month!",
    "Great choice! Let me connect you with our team for a personalized demo.",
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages([...messages, { text: inputValue, isBot: false }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [...prev, { text: randomResponse, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  const eyeX = (mousePosition.x - window.innerWidth / 2) / 100;
  const eyeY = (mousePosition.y - window.innerHeight / 2) / 100;

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></div>

            <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-white rounded-full">
                  <div className="absolute inset-2 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <div className="absolute top-4 left-3 w-2 h-2 bg-gray-800 rounded-full animate-pulse"
                        style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }}
                      ></div>
                      <div className="absolute top-4 right-3 w-2 h-2 bg-gray-800 rounded-full animate-pulse"
                        style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }}
                      ></div>

                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-full"></div>

                      <div className="absolute -top-1 left-1 w-3 h-3 bg-cyan-400 rounded-full"></div>
                      <div className="absolute -top-1 right-1 w-3 h-3 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
              !
            </div>
          </button>
        )}

        {isOpen && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col overflow-hidden border-2 border-cyan-500/30 animate-scale-in">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 bg-white rounded-full animate-spin-slow">
                    <div className="absolute inset-1 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"
                          style={{ transform: `translate(${eyeX / 2}px, ${eyeY / 2}px)` }}
                        ></div>
                        <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full"
                          style={{ transform: `translate(${eyeX / 2}px, ${eyeY / 2}px)` }}
                        ></div>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-1.5 border-b-2 border-gray-800 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    Zephyr AI
                    <Sparkles className="h-4 w-4" />
                  </h3>
                  <p className="text-xs text-cyan-100">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-800 dark:text-gray-200"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
