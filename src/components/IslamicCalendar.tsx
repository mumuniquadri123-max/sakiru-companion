import React, { useState } from 'react';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, Calendar as CalendarIcon, Moon, Star, Sparkles } from 'lucide-react';

interface IslamicCalendarProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const IslamicCalendar: React.FC<IslamicCalendarProps> = ({ onBack }) => {
  // Approximate Hijri conversion for current timeframe (1447 AH / 2026 CE)
  const [hijriMonth] = useState<string>("Shawwal 1447 AH");
  
  const specialEvents = [
    { date: "1st - 3rd Shawwal", name: "Eid al-Fitr", desc: "Celebration marking the conclusion of Ramadan." },
    { date: "8th - 13th Dhu al-Hijjah", name: "The Hajj Pilgrimage", desc: "Annual Islamic pilgrimage to Makkah." },
    { date: "9th Dhu al-Hijjah", name: "Day of Arafah", desc: "Blessed day of fasting and supplication." },
    { date: "10th Dhu al-Hijjah", name: "Eid al-Adha", desc: "The Feast of Sacrifice." },
    { date: "1st Muharram", name: "Islamic New Year", desc: "Beginning of the Hijri calendar year (1448 AH)." },
    { date: "12th Rabi al-Awwal", name: "Mawlid al-Nabi", desc: "Commemoration of the birth of Prophet Muhammad (PBUH)." },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 pb-24">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
          Hijri Calendar
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Islamic Hijri Calendar</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Lunar dates, historical months & special Islamic occasions</p>
          </div>
        </div>
      </div>

      {/* Current Hijri Month Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden flex items-center justify-between border border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Moon className="w-3.5 h-3.5" />
            <span>Current Lunar Month</span>
          </div>
          <h2 className="text-3xl font-extrabold">{hijriMonth}</h2>
          <p className="text-xs text-slate-400">Corresponding to Gregorian Year 2026</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center relative z-10 text-blue-400">
          <Star className="w-6 h-6" />
        </div>
      </div>

      {/* Special Occasions List */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Major Islamic Occasions</span>
        </h3>
        <div className="space-y-3">
          {specialEvents.map((ev, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{ev.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ev.desc}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                {ev.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};