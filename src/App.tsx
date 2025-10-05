import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Carousel from './components/Carousel';
import Stats from './components/Stats';
import Logos from './components/Logos';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import InteractiveDemo from './components/InteractiveDemo';
import Footer from './components/Footer';
import Bot3D from './components/Bot3D';
import ScrollToTop from './components/ScrollToTop';
import DataTable from './components/DataTable';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <Features />
      <InteractiveDemo />
      <DataTable />
      <Carousel />
      <Stats />
      <Logos />
      <Testimonials />
      <Team />
      <Footer />
      <Bot3D />
      <ScrollToTop />
    </div>
  );
}

export default App;
