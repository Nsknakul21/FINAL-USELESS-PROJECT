import React, { useEffect, useState } from 'react';
import { Terminal, Wifi, Shield, AlertTriangle, Zap } from 'lucide-react';

interface HackingScreenProps {
  isActive: boolean;
  onComplete: () => void;
}

export const HackingScreen: React.FC<HackingScreenProps> = ({ isActive, onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const hackingLines = [
    'INITIALIZING NEURAL NETWORK...',
    'CONNECTING TO MAINFRAME...',
    'BYPASSING FIREWALL...',
    'ACCESSING ENCRYPTED DATABASE...',
    'DECRYPTING USER PREFERENCES...',
    'ANALYZING DECISION PATTERNS...',
    'MAPPING UNCERTAINTY ALGORITHMS...',
    'INFILTRATING CHOICE MATRIX...',
    'EXTRACTING DOUBT COEFFICIENTS...',
    'COMPILING CONFUSION PROTOCOLS...',
    'HACKING REALITY PARAMETERS...',
    'OVERRIDING CERTAINTY MODULES...',
    'INJECTING CHAOS VARIABLES...',
    'CORRUPTING LOGIC CIRCUITS...',
    'FRAGMENTING DECISION TREES...',
    'SCRAMBLING NEURAL PATHWAYS...',
    'DESTABILIZING CONFIDENCE LEVELS...',
    'IMPLANTING RECURSIVE DOUBTS...',
    'ACTIVATING PARADOX ENGINE...',
    'FINALIZING MIND CONTROL PROTOCOL...'
  ];

  const statusMessages = [
    'BREACH DETECTED',
    'SYSTEM COMPROMISED',
    'ACCESSING CONSCIOUSNESS',
    'REALITY HACK IN PROGRESS',
    'MIND CONTROL ACTIVE'
  ];

  useEffect(() => {
    if (!isActive) {
      setLines([]);
      setCurrentLine('');
      setProgress(0);
      setPhase(0);
      setTimeLeft(30);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let progressInterval: NodeJS.Timeout;
    let lineInterval: NodeJS.Timeout;
    let phaseInterval: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    // Countdown timer
    countdownInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Progress bar
    progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / 300), 100)); // 30 seconds = 300 intervals
    }, 100);

    // Phase changes
    phaseInterval = setInterval(() => {
      setPhase(prev => (prev + 1) % statusMessages.length);
    }, 6000);

    // Typing effect
    const typeNextChar = () => {
      if (lineIndex >= hackingLines.length) {
        lineIndex = 0;
      }

      const currentHackingLine = hackingLines[lineIndex];
      
      if (charIndex < currentHackingLine.length) {
        setCurrentLine(currentHackingLine.substring(0, charIndex + 1));
        charIndex++;
      } else {
        // Line complete, add to lines array
        setLines(prev => {
          const newLines = [...prev, currentHackingLine];
          return newLines.slice(-12); // Keep only last 12 lines
        });
        setCurrentLine('');
        lineIndex++;
        charIndex = 0;
      }
    };

    lineInterval = setInterval(typeNextChar, 50 + Math.random() * 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
      clearInterval(phaseInterval);
      clearInterval(countdownInterval);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black z-[9999] font-mono text-green-400 overflow-hidden">
      {/* Matrix-style background */}
      <div className="absolute inset-0 opacity-10">
        <div className="text-xs leading-none whitespace-pre-wrap animate-pulse">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              {Array.from({ length: 100 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
            </div>
          ))}
        </div>
      </div>

      {/* Main terminal */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-green-400 pb-4">
          <div className="flex items-center gap-4">
            <Terminal className="w-8 h-8 animate-pulse" />
            <div>
              <h1 className="text-2xl font-bold text-red-400 animate-pulse">
                NEURAL HACK INITIATED
              </h1>
              <p className="text-sm opacity-75">Unauthorized Access Detected</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-red-400 text-xl font-bold animate-pulse">
              {String(timeLeft).padStart(2, '0')}s
            </div>
            <div className="text-xs opacity-75">Time Remaining</div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 p-3 border border-green-400 rounded bg-green-400/10">
            <Wifi className="w-5 h-5 animate-pulse text-green-400" />
            <div>
              <div className="font-bold">CONNECTION</div>
              <div className="text-xs opacity-75">ESTABLISHED</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 border border-yellow-400 rounded bg-yellow-400/10">
            <Shield className="w-5 h-5 animate-spin text-yellow-400" />
            <div>
              <div className="font-bold text-yellow-400">FIREWALL</div>
              <div className="text-xs opacity-75">BYPASSING...</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 border border-red-400 rounded bg-red-400/10">
            <AlertTriangle className="w-5 h-5 animate-bounce text-red-400" />
            <div>
              <div className="font-bold text-red-400">{statusMessages[phase]}</div>
              <div className="text-xs opacity-75">CRITICAL</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>HACK PROGRESS</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 border border-green-400">
            <div 
              className="bg-gradient-to-r from-green-400 to-red-400 h-full rounded-full transition-all duration-100 animate-pulse"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Terminal output */}
        <div className="flex-1 bg-black/50 border border-green-400 rounded p-4 overflow-hidden">
          <div className="space-y-1">
            {lines.map((line, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-red-400">{'>'}</span>
                <span className="animate-pulse">{line}</span>
                <span className="text-green-400 animate-pulse">✓</span>
              </div>
            ))}
            {currentLine && (
              <div className="flex items-center gap-2">
                <span className="text-red-400">{'>'}</span>
                <span>{currentLine}</span>
                <span className="animate-pulse text-green-400">|</span>
              </div>
            )}
          </div>
        </div>

        {/* Warning message */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-red-400 animate-pulse">
            <Zap className="w-6 h-6" />
            <span className="text-lg font-bold">
              YOUR MIND IS BEING HACKED - RESISTANCE IS FUTILE
            </span>
            <Zap className="w-6 h-6" />
          </div>
          <p className="text-sm opacity-75 mt-2">
            Please wait while we recalibrate your uncertainty levels...
          </p>
        </div>
      </div>

      {/* Scanlines effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)',
          animation: 'scanlines 0.1s linear infinite',
        }}
      />

      <style jsx>{`
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
};