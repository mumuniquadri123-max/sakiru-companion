import React from 'react';
import type { CityLocation } from '../services/locationService';
import { getLivePrayerStatus } from '../services/prayerTimeEngine';
import { ArrowLeft, Clock, MapPin, Bell } from 'lucide-react';

interface TimetableProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const Timetable: React.FC<TimetableProps> = ({ currentLocation, onBack }) => {
  const status = getLivePrayerStatus(currentLocation.latitude, currentLocation.longitude);
  const isFriday = new Date().getDay() === 5;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 pb-24 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <MapPin className="w-3 h-3" />
          <span>{currentLocation.name}, {currentLocation.country}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Daily Prayer Timetable</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isFriday ? 'Jumu\'ah congregation schedule active for today' : 'Astronomical calculations based on local coordinates'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {status.allPrayersToday.map((p, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border transition flex items-center justify-between ${
              p.isNext
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold text-xs ${
                p.isNext ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                <span>{p.arabicName}</span>
              </div>
              <div>
                <div className="font-bold text-base flex items-center gap-2">
                  {p.name}
                  {p.isNext && (
                    <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                      Upcoming
                    </span>
                  )}
                </div>
                <div className={`text-xs ${p.isNext ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {p.name === 'Jumu\'ah' ? 'Congregational Friday Prayer' : 'Calculated locally (Zero tracking)'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right font-mono text-lg font-bold">
                {p.time}
              </div>
              <button className={`p-2 rounded-xl transition ${
                p.isNext ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-300'
              }`}>
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};