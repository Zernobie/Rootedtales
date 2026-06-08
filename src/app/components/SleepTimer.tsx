import React, { useState, useEffect, useRef } from 'react';
import { Moon, Clock, Power, Bell, CheckCircle, X } from 'lucide-react';

interface SleepTimerProps {
  theme: 'forest' | 'ocean' | 'sunset' | 'night';
  onTimerExpire: () => void;
}

const THEME_COLORS = {
  forest: { primary: 'emerald-600', secondary: 'green-100', text: 'green-900' },
  ocean: { primary: 'cyan-600', secondary: 'cyan-100', text: 'cyan-900' },
  sunset: { primary: 'orange-600', secondary: 'orange-100', text: 'orange-900' },
  night: { primary: 'indigo-600', secondary: 'indigo-100', text: 'indigo-900' }
};

const PRESET_TIMERS = [
  { label: '5 minutes', minutes: 5 },
  { label: '10 minutes', minutes: 10 },
  { label: '15 minutes', minutes: 15 },
  { label: '30 minutes', minutes: 30 },
  { label: '45 minutes', minutes: 45 },
  { label: '1 hour', minutes: 60 },
  { label: '2 hours', minutes: 120 },
  { label: 'End of chapter', minutes: 0, isSpecial: true }
];

export function SleepTimer({ theme, onTimerExpire }: SleepTimerProps) {
  const [isActive, setIsActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(15);
  const [customMinutes, setCustomMinutes] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMinutes, setNotificationMinutes] = useState(5);
  const [playFadeOutSound, setPlayFadeOutSound] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>();
  const warningRef = useRef<NodeJS.Timeout>();
  const notificationRef = useRef<NodeJS.Timeout>();

  const colors = THEME_COLORS[theme];

  useEffect(() => {
    // Load saved timer settings
    const savedTimer = localStorage.getItem('sleep_timer_active');
    const savedEndTime = localStorage.getItem('sleep_timer_end_time');
    const savedNotification = localStorage.getItem('sleep_timer_notification');
    const savedFadeOut = localStorage.getItem('sleep_timer_fadeout');

    if (savedTimer === 'true' && savedEndTime) {
      const endTime = parseInt(savedEndTime);
      const now = Date.now();
      
      if (endTime > now) {
        const remaining = Math.floor((endTime - now) / 1000);
        setRemainingTime(remaining);
        setIsActive(true);
        startCountdown(remaining);
      } else {
        clearSavedTimer();
      }
    }

    if (savedNotification) setNotificationMinutes(parseInt(savedNotification));
    if (savedFadeOut) setPlayFadeOutSound(savedFadeOut === 'true');

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
      if (notificationRef.current) clearTimeout(notificationRef.current);
    };
  }, []);

  const startCountdown = (seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
    if (notificationRef.current) clearTimeout(notificationRef.current);

    let remaining = seconds;
    setRemainingTime(remaining);

    // Set warning notification (1 minute before)
    if (remaining > 60) {
      warningRef.current = setTimeout(() => {
        setShowWarning(true);
        playWarningSound();
      }, (remaining - 60) * 1000);
    }

    // Set early notification if enabled
    if (showNotification && remaining > notificationMinutes * 60) {
      notificationRef.current = setTimeout(() => {
        showEarlyNotification();
      }, (remaining - notificationMinutes * 60) * 1000);
    }

    timerRef.current = setInterval(() => {
      remaining--;
      setRemainingTime(remaining);

      if (remaining <= 0) {
        handleTimerExpire();
      }
    }, 1000);
  };

  const handleStartTimer = (minutes: number) => {
    const seconds = minutes * 60;
    const endTime = Date.now() + (seconds * 1000);

    setSelectedMinutes(minutes);
    setIsActive(true);
    setShowWarning(false);

    // Save to localStorage
    localStorage.setItem('sleep_timer_active', 'true');
    localStorage.setItem('sleep_timer_end_time', endTime.toString());
    localStorage.setItem('sleep_timer_notification', notificationMinutes.toString());
    localStorage.setItem('sleep_timer_fadeout', playFadeOutSound.toString());

    startCountdown(seconds);
  };

  const handleCustomTimer = () => {
    const minutes = parseInt(customMinutes);
    if (minutes > 0 && minutes <= 480) { // Max 8 hours
      handleStartTimer(minutes);
      setCustomMinutes('');
    }
  };

  const handleCancelTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
    if (notificationRef.current) clearTimeout(notificationRef.current);

    setIsActive(false);
    setRemainingTime(0);
    setShowWarning(false);
    clearSavedTimer();
  };

  const handleTimerExpire = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    setIsActive(false);
    setRemainingTime(0);
    clearSavedTimer();

    // Play fade-out sound if enabled
    if (playFadeOutSound) {
      playFadeOutAudio();
    }

    // Show expiration notification
    showExpirationNotification();

    // Wait 3 seconds then trigger callback
    setTimeout(() => {
      onTimerExpire();
    }, 3000);
  };

  const clearSavedTimer = () => {
    localStorage.removeItem('sleep_timer_active');
    localStorage.removeItem('sleep_timer_end_time');
  };

  const playWarningSound = () => {
    // In production, play a gentle warning sound
    console.log('Playing warning sound...');
  };

  const playFadeOutAudio = () => {
    // In production, play a gentle fade-out sound
    console.log('Playing fade-out sound...');
  };

  const showEarlyNotification = () => {
    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Sleep Timer', {
        body: `${notificationMinutes} minutes remaining`,
        icon: '/icon.png'
      });
    }
  };

  const showExpirationNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Sleep Timer', {
        body: 'Sleep timer has ended. Sweet dreams! 🌙',
        icon: '/icon.png'
      });
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    const totalSeconds = selectedMinutes * 60;
    return ((totalSeconds - remainingTime) / totalSeconds) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className={`text-2xl font-bold text-${colors.text} flex items-center gap-2`}>
            <Moon className="w-7 h-7" />
            Sleep Timer
          </h1>
          <p className="text-sm text-gray-600 mt-1">Auto-close app after a set time</p>
        </div>
      </div>

      {/* Warning Notification */}
      {showWarning && (
        <div className="fixed top-20 left-4 right-4 z-50 animate-bounce">
          <div className="bg-orange-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <span className="font-medium">1 minute remaining!</span>
            </div>
            <button onClick={() => setShowWarning(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Active Timer Display */}
        {isActive && (
          <div className={`bg-gradient-to-br from-${colors.primary} to-${colors.secondary} rounded-xl p-6 text-center shadow-lg`}>
            <div className="mb-4">
              <Clock className={`w-16 h-16 text-white mx-auto mb-3 ${remainingTime <= 60 ? 'animate-pulse' : ''}`} />
              <p className="text-white/80 text-sm mb-2">Time Remaining</p>
              <p className="text-5xl font-bold text-white mb-1">{formatTime(remainingTime)}</p>
              <p className="text-white/80 text-sm">
                App will close automatically
              </p>
            </div>

            {/* Progress Circle */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - getProgressPercentage() / 100)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {Math.round(getProgressPercentage())}%
                </span>
              </div>
            </div>

            <button
              onClick={handleCancelTimer}
              className="w-full bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Power className="w-5 h-5" />
              Cancel Timer
            </button>
          </div>
        )}

        {/* Timer Setup */}
        {!isActive && (
          <>
            {/* Preset Timers */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Quick Timer</h2>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                {PRESET_TIMERS.filter(t => !t.isSpecial).map((timer) => (
                  <button
                    key={timer.minutes}
                    onClick={() => handleStartTimer(timer.minutes)}
                    className={`p-4 border-2 border-${colors.primary} rounded-lg hover:bg-${colors.secondary} transition-colors`}
                  >
                    <Clock className={`w-6 h-6 text-${colors.primary} mx-auto mb-2`} />
                    <p className="font-semibold text-gray-900">{timer.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Timer */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Custom Timer</h2>
              </div>
              <div className="p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minutes (1-480)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="480"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(e.target.value)}
                    placeholder="Enter minutes"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <button
                    onClick={handleCustomTimer}
                    disabled={!customMinutes || parseInt(customMinutes) <= 0}
                    className={`px-6 py-3 bg-${colors.primary} text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>

            {/* Timer Options */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Timer Options</h2>
              </div>

              <div className="divide-y divide-gray-100">
                {/* Early Notification */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">Early Notification</p>
                      <p className="text-sm text-gray-500">Get notified before timer ends</p>
                    </div>
                    <button
                      onClick={() => setShowNotification(!showNotification)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        showNotification ? `bg-${colors.primary}` : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                        showNotification ? 'right-0.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                  
                  {showNotification && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Notify me {notificationMinutes} minutes before
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="15"
                        value={notificationMinutes}
                        onChange={(e) => setNotificationMinutes(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 min</span>
                        <span>15 min</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fade Out Sound */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Fade-Out Sound</p>
                      <p className="text-sm text-gray-500">Play gentle sound when timer ends</p>
                    </div>
                    <button
                      onClick={() => setPlayFadeOutSound(!playFadeOutSound)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        playFadeOutSound ? `bg-${colors.primary}` : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                        playFadeOutSound ? 'right-0.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Information */}
            <div className={`bg-${colors.secondary} border border-${colors.primary} rounded-xl p-4`}>
              <h3 className={`font-semibold text-${colors.text} mb-2 flex items-center gap-2`}>
                <Moon className="w-5 h-5" />
                How Sleep Timer Works
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className={`w-4 h-4 text-${colors.primary} mt-0.5 flex-shrink-0`} />
                  <span>Set a timer and continue reading</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className={`w-4 h-4 text-${colors.primary} mt-0.5 flex-shrink-0`} />
                  <span>Get a warning notification 1 minute before</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className={`w-4 h-4 text-${colors.primary} mt-0.5 flex-shrink-0`} />
                  <span>App automatically closes when timer expires</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className={`w-4 h-4 text-${colors.primary} mt-0.5 flex-shrink-0`} />
                  <span>Your progress is saved before closing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className={`w-4 h-4 text-${colors.primary} mt-0.5 flex-shrink-0`} />
                  <span>Timer persists even if you minimize the app</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
