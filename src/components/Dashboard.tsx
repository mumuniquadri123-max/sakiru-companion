import React, { useState, useEffect } from 'react';
import type { CityLocation } from '../services/locationService';
import { getLivePrayerStatus } from '../services/prayerTimeEngine';
import type { LivePrayerStatus } from '../services/prayerTimeEngine';
import { Clock, Compass, BookOpen, Calendar, ChevronRight, MapPin, Sparkles, Users, CalendarDays, Timer } from 'lucide-react';

interface DashboardProps {
  currentLocation: CityLocation;
  onNavigate: (screen: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentLocation, onNavigate }) => {
  const [prayerStatus, setPrayerStatus] = useState<LivePrayerStatus>(() => 
    getLivePrayerStatus(currentLocation.latitude, currentLocation.longitude)
  );

  // 1-second live ticker effect
  useEffect(() => {
    setPrayerStatus(getLivePrayerStatus(currentLocation.latitude, currentLocation.longitude));

    const timer = setInterval(() => {
      setPrayerStatus(getLivePrayerStatus(currentLocation.latitude, currentLocation.longitude));
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setPrayerStatus(getLivePrayerStatus(currentLocation.latitude, currentLocation.longitude));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentLocation]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 pb-24 animate-in fade-in duration-300">
      
      {/* Offline PWA Ready Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-2xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Offline-first mode active. Live clock ticking.</span>
        </div>
        <span className="font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
          PWA READY
        </span>
      </div>

      {/* Hero Next Prayer Card with Live Countdown */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Next Prayer</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono bg-white/10 px-3 py-1 rounded-full text-emerald-300 backdrop-blur-xs">
            <Timer className="w-3.5 h-3.5 animate-spin-slow" />
            <span>in {prayerStatus.timeRemainingFormatted}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{prayerStatus.nextPrayerName}</h1>
            <div className="text-xl md:text-2xl font-mono font-bold text-emerald-400 mt-1">{prayerStatus.nextPrayerTime}</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-700/60 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currentLocation.name}, {currentLocation.country}</span>
          </div>
          <button 
            onClick={() => onNavigate('timetable')}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition group"
          >
            <span>View Full Timetable</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
        </div>
      </div>

      {/* Quick Access Navigation Modules Grid (All 6 Features) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { id: 'timetable', name: 'Timetable', desc: 'Daily Schedule', icon: Clock, color: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600' },
          { id: 'qibla', name: 'Qibla Compass', desc: 'Kaaba Direction', icon: Compass, color: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600' },
          { id: 'wudu', name: 'Learn Wudu', desc: 'Step-by-Step', icon: BookOpen, color: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600' },
          { id: 'salah', name: 'Learn Salah', desc: 'Prayer Guide', icon: Sparkles, color: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600' },
          { id: 'jummah', name: 'Jummah Module', desc: 'Khutbah & Sunnah', icon: Users, color: 'bg-teal-50 dark:bg-teal-950/30 text-teal-600' },
          { id: 'calendar', name: 'Islamic Calendar', desc: 'Hijri Dates', icon: CalendarDays, color: 'bg-rose-50 dark:bg-rose-950/30 text-rose-600' },
        ].map((mod) => {
          const Icon = mod.icon;
          return (
            <button
              key={mod.id}
              onClick={() => onNavigate(mod.id)}
              className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs hover:shadow-md transition text-left flex flex-col justify-between group"
            >
              <div className={`w-10 h-10 rounded-2xl ${mod.color} flex items-center justify-center mb-4 group-hover:scale-105 transition`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">{mod.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{mod.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Today's Prayers Summary Card with Live Highlighting */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Today's Prayer Schedule</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Live Clock Active</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {prayerStatus.allPrayersToday.map((p, idx) => (
            <div 
              key={idx}
              className={`p-3.5 rounded-2xl border transition flex flex-col justify-between ${
                p.isNext 
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-xs' 
                  : 'bg-slate-50 dark:bg-slate-700/40 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>{p.name}</span>
                <span className="font-arabic text-slate-400">{p.arabicName}</span>
              </div>
              <div className="font-mono text-base font-bold mt-2">{p.time}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};