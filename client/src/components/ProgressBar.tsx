import { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);
  
  return (
    <div 
      id="progressBar" 
      className="progress-bar" 
      style={{ width: `${scrollProgress}%` }}
    ></div>
  );
};

export default ProgressBar;
