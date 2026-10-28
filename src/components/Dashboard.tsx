import React from 'react';
import type { CityLocation } from '../services/locationService';
import { Clock, Compass, BookOpen, Bookmark, Sun, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface DashboardProps {
  currentLocation: CityLocation;
  onNavigate: (screen: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentLocation, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 pb-24">
      {/* Offline Mode Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 p-4 rounded-2xl flex items-center justify-between text-emerald-800 dark:text-emerald-300 shadow-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs md:text-sm font-medium">Offline-first mode active. Timetable cached locally.</span>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          PWA Ready
        </span>
      </div>

      {/* Main Hero Card */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6 border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Next Prayer</span>
          </div>
          <div className="text-xs bg-white/10 px-3 py-1 rounded-full font-mono text-slate-300">
            Calculated Live
          </div>
        </div>

        <div className="relative z-10 space-y-1">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Dhuhr</h1>
          <p className="text-emerald-400 font-mono text-lg font-semibold">01:45 pm</p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 relative z-10">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <span>📍 {currentLocation.name}, {currentLocation.country}</span>
          </div>
          <button 
            onClick={() => onNavigate('timetable')}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition"
          >
            <span>View Full Timetable</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Navigation Modules Grid (Now 6 Modules) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('timetable')}
          className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 hover:shadow-lg transition text-left flex flex-col justify-between space-y-6 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Timetable</h3>
            <p className="text-xs text-slate-400 mt-0.5">Daily schedules</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('qibla')}
          className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:shadow-lg transition text-left flex flex-col justify-between space-y-6 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Qibla</h3>
            <p className="text-xs text-slate-400 mt-0.5">Direction finder</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('wudu')}
          className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-amber-500/50 hover:shadow-lg transition text-left flex flex-col justify-between space-y-6 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center group-hover:scale-110 transition">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Learn Wudu</h3>
            <p className="text-xs text-slate-400 mt-0.5">Ablution guide</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('salah')}
          className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 hover:shadow-lg transition text-left flex flex-col justify-between space-y-6 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Learn Solat</h3>
            <p className="text-xs text-slate-400 mt-0.5">Prayer guide</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('jummah')}
          className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 hover:shadow-lg transition text-left flex flex-col justify-between space-y-6 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Jummah Guide</h3>
            <p className="text-xs text-slate-400 mt-0.5">Friday blessings</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('calendar')}
          className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:shadow-lg transition text-left flex flex-col justify-between space-y-6 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Hijri Calendar</h3>
            <p className="text-xs text-slate-400 mt-0.5">Islamic events</p>
          </div>
        </button>
      </div>
    </div>
  );
};