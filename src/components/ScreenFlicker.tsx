import React, { useEffect, useState } from 'react';

interface ScreenFlickerProps {
  isActive: boolean;
  onComplete: () => void;
}

export const ScreenFlicker: React.FC<ScreenFlickerProps> = ({ isActive, onComplete }) => {
  const [flickerPhase, setFlickerPhase] = useState(0);
  const [glitchText, setGlitchText] = useState('');
  const [intensity, setIntensity] = useState(1);

  const glitchMessages = [
    'PROCESSING...',
    'REALITY GLITCH DETECTED',
    'SYSTEM OVERLOAD',
    'CONSCIOUSNESS SHIFT',
    'DOUBT INTENSIFYING...',
    'UNCERTAINTY RISING',
    'CHOICE REGISTERED',
    'MIND BENDING...',
    'NEURAL INTERFERENCE',
    'QUANTUM FLUCTUATION',
    'PARADOX DETECTED',
    'LOGIC ERROR',
    'REALITY.EXE STOPPED',
    'CONFUSION OVERFLOW'
  ];

  useEffect(() => {
    if (!isActive) return;

    let timeouts: NodeJS.Timeout[] = [];
    
    // Phase 1: Rapid intense flicker (0-1s)
    const flickerInterval = setInterval(() => {
      setFlickerPhase(Math.random() > 0.3 ? 1 : 2);
      setIntensity(Math.random() * 2 + 1);
    }, 60);
    
    timeouts.push(setTimeout(() => {
      clearInterval(flickerInterval);
    }, 1000));

    // Phase 2: Glitch text with distortion (1-2s)
    timeouts.push(setTimeout(() => {
      setGlitchText(glitchMessages[Math.floor(Math.random() * glitchMessages.length)]);
      setFlickerPhase(3);
      
      // Change text a few times during this phase
      const textInterval = setInterval(() => {
        setGlitchText(glitchMessages[Math.floor(Math.random() * glitchMessages.length)]);
        setIntensity(Math.random() * 1.5 + 0.5);
      }, 200);
      
      timeouts.push(setTimeout(() => {
        clearInterval(textInterval);
      }, 1000));
    }, 1000));

    // Phase 3: Final intense flicker (2-2.5s)
    timeouts.push(setTimeout(() => {
      setFlickerPhase(4);
      const finalFlicker = setInterval(() => {
        setFlickerPhase(Math.random() > 0.5 ? 1 : 2);
        setIntensity(Math.random() * 3 + 1);
      }, 40);
      
      timeouts.push(setTimeout(() => {
        clearInterval(finalFlicker);
      }, 500));
    }, 2000));

    // Phase 4: Fade out (2.5-3s)
    timeouts.push(setTimeout(() => {
      setFlickerPhase(5);
      setGlitchText('');
    }, 2500));

    // Complete the effect after exactly 3 seconds
    timeouts.push(setTimeout(() => {
      setFlickerPhase(0);
      setGlitchText('');
      setIntensity(1);
      onComplete();
    }, 3000));

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(flickerInterval);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const getFlickerStyle = () => {
    switch (flickerPhase) {
      case 1:
        return {
          filter: `brightness(${0.1 * intensity}) contrast(${2 * intensity}) hue-rotate(${90 * intensity}deg) saturate(${3 * intensity})`,
          transform: `scale(${1 + 0.02 * intensity}) skew(${0.3 * intensity}deg) rotate(${0.1 * intensity}deg)`,
        };
      case 2:
        return {
          filter: `brightness(${1.5 * intensity}) contrast(${0.3 * intensity}) saturate(${4 * intensity}) blur(${0.5 * intensity}px)`,
          transform: `scale(${1 - 0.02 * intensity}) skew(${-0.2 * intensity}deg) rotate(${-0.1 * intensity}deg)`,
        };
      case 3:
        return {
          filter: `brightness(${1.2 * intensity}) contrast(${1.5 * intensity}) saturate(${2 * intensity}) hue-rotate(${45 * intensity}deg)`,
          background: `linear-gradient(${45 * intensity}deg, rgba(255,0,0,${0.15 * intensity}), rgba(0,255,0,${0.15 * intensity}), rgba(0,0,255,${0.15 * intensity}))`,
        };
      case 4:
        return {
          filter: `brightness(${0.3 * intensity}) contrast(${2 * intensity}) saturate(${2 * intensity}) blur(${intensity}px)`,
          transform: `scale(${1 + 0.05 * intensity}) rotate(${0.5 * intensity}deg)`,
        };
      case 5:
        return {
          filter: 'brightness(1) contrast(1) saturate(1)',
          opacity: 0.2,
        };
      default:
        return {};
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={getFlickerStyle()}
    >
      {/* Scanlines effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `repeating-linear-gradient(${Math.random() * 180}deg, transparent, transparent 2px, rgba(0,0,0,${0.1 * intensity}) 2px, rgba(0,0,0,${0.1 * intensity}) 4px)`,
          animation: 'scanlines 0.1s linear infinite',
        }}
      />
      
      {/* Glitch text overlay */}
      {glitchText && (flickerPhase === 3 || flickerPhase === 4) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={`text-2xl md:text-4xl font-mono font-bold animate-pulse ${
              flickerPhase === 4 ? 'text-cyan-400' : 'text-red-500'
            }`}
            style={{
              textShadow: `${2 * intensity}px ${2 * intensity}px 0px #00ff00, ${-2 * intensity}px ${-2 * intensity}px 0px #ff00ff, 0 0 ${10 * intensity}px currentColor`,
              filter: `blur(${0.5 * intensity}px)`,
              transform: `scale(${1 + 0.1 * intensity}) rotate(${Math.random() * 4 - 2}deg)`,
            }}
          >
            {glitchText}
          </div>
        </div>
      )}

      {/* Color distortion overlay */}
      {flickerPhase >= 1 && (
        <>
          <div 
            className="absolute inset-0 mix-blend-multiply opacity-20"
            style={{
              background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                rgba(255,0,0,${0.3 * intensity}), 
                rgba(0,255,0,${0.3 * intensity}), 
                rgba(0,0,255,${0.3 * intensity}))`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 animate-pulse" 
               style={{ transform: `translateX(${Math.random() * 200 - 100}%)` }} />
        </>
      )}

      <style jsx>{`
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
};