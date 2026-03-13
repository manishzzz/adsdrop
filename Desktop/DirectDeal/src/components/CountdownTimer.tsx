'use client';

import { useState, useEffect } from 'react';
import { intervalToDuration, isPast } from 'date-fns';

interface CountdownTimerProps {
  expiresAt: string;
  onExpire?: () => void;
}

export default function CountdownTimer({ expiresAt, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [status, setStatus] = useState<'normal' | 'warning' | 'critical' | 'expired'>('normal');

  useEffect(() => {
    const targetDate = new Date(expiresAt);

    const updateTimer = () => {
      if (isPast(targetDate)) {
        setTimeLeft('EXPIRED');
        setStatus('expired');
        onExpire?.();
        return;
      }

      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setTimeLeft(formatted);

      if (hours < 6) {
        setStatus('critical');
      } else if (hours < 24) {
        setStatus('warning');
      } else {
        setStatus('normal');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const getStatusClasses = () => {
    switch (status) {
      case 'critical':
        return 'text-red-500 animate-pulse font-bold';
      case 'warning':
        return 'text-orange-500 font-semibold';
      case 'expired':
        return 'text-gray-400 font-medium italic';
      default:
        return 'text-gray-600 font-medium';
    }
  };

  return (
    <div className={`flex items-center gap-2 ${getStatusClasses()}`}>
       <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
          {status === 'critical' && <span className="w-2 h-2 bg-red-500 rounded-full animate-ping mr-1"></span>}
          <span className="text-sm font-mono tracking-wider">{timeLeft}</span>
       </div>
    </div>
  );
}
