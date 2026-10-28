import React from 'react';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, Sun, CheckCircle2 } from 'lucide-react';

interface JummahModuleProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const JummahModule: React.FC<JummahModuleProps> = ({ currentLocation, onBack }) => {
  const jummahEtiquettes = [
    { title: "Ghusl (Full Ablution)", desc: "Taking a full ritual bath before attending the Friday prayer is highly recommended (Sunnah Muakkadah)." },
    { title: "Early Arrival", desc: "Arriving early at the Masjid allows time for voluntary prayers (Nafl) and listening to the Quran before the Khutbah begins." },
    { title: "Listening to the Khutbah", desc: "Silence is mandatory during the Friday Sermon. Talking or using phones during the Khutbah invalidates the reward of Jummah." },
    { title: "Dua on Friday", desc: "There is a special hour on Friday where supplications are answered (often accepted during the last hour before Maghrib)." },
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
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          Jummah Hub • {currentLocation.name}
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Jummah (Friday Prayer) Guide</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Special timings, sunnah etiquettes, and blessed practices</p>
          </div>
        </div>
      </div>

      {/* Jummah Timing Card */}
      <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-emerald-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400">
            Friday Schedule
          </span>
          <span className="text-xs text-slate-300 font-mono">Replaces Dhuhr on Fridays</span>
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold">Jummah Khutbah & Prayer</h2>
          <p className="text-emerald-400 font-mono text-base">Typically held around standard Dhuhr time ({currentLocation.name})</p>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-700 pt-3">
          "O you who have believed, when [the adhan] is called for the prayer on the day of Friday [Jummah], then proceed to the remembrance of Allah and leave trade." (Surah Al-Jumu'ah, 9)
        </p>
      </div>

      {/* Etiquettes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jummahEtiquettes.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{item.title}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};