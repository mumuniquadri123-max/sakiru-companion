import React from 'react';
import { getPrayerTimesForDate } from '../services/prayerService';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, Clock, Bell } from 'lucide-react';

interface TimetableProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const Timetable: React.FC<TimetableProps> = ({ currentLocation, onBack }) => {
  const livePrayerTimes = getPrayerTimesForDate(currentLocation.latitude, currentLocation.longitude);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 pb-24">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          {currentLocation.name} Timetable
        </div>
      </div>

      {/* Header Title */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Prayer Timetable</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Calculated locally for {currentLocation.name}, {currentLocation.country}</p>
          </div>
        </div>
      </div>

      {/* Prayer List */}
      <div className="space-y-3">
        {livePrayerTimes.map((prayer, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl border transition flex items-center justify-between ${
              prayer.isNext
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold text-xs ${
                prayer.isNext ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                <span>{prayer.arabicName}</span>
              </div>
              <div>
                <div className="font-bold text-base flex items-center gap-2">
                  {prayer.name}
                  {prayer.isNext && (
                    <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                      Upcoming
                    </span>
                  )}
                </div>
                <div className={`text-xs ${prayer.isNext ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  Calculated locally (Zero tracking)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right font-mono text-lg font-bold">
                {prayer.time}
              </div>
              <button className={`p-2 rounded-xl transition ${
                prayer.isNext ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-300'
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