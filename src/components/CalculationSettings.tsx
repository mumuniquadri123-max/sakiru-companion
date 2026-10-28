import React, { useState, useEffect } from 'react';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, Settings, Check, Sliders } from 'lucide-react';

interface CalculationSettingsProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const CalculationSettings: React.FC<CalculationSettingsProps> = ({ onBack }) => {
  const [method, setMethod] = useState<string>(() => {
    return localStorage.getItem('sakiru_calc_method') || 'MWL';
  });

  const [asrMethod, setAsrMethod] = useState<string>(() => {
    return localStorage.getItem('sakiru_asr_method') || 'Standard';
  });

  useEffect(() => {
    localStorage.setItem('sakiru_calc_method', method);
    localStorage.setItem('sakiru_asr_method', asrMethod);
  }, [method, asrMethod]);

  const calculationMethods = [
    { id: 'MWL', name: 'Muslim World League (MWL)', desc: 'Fajr 18°, Isha 17°' },
    { id: 'ISNA', name: 'Islamic Society of North America (ISNA)', desc: 'Fajr 15°, Isha 15°' },
    { id: 'Egypt', name: 'Egyptian General Authority of Survey', desc: 'Fajr 19.5°, Isha 17.5°' },
    { id: 'Makkah', name: 'Umm Al-Qura University, Makkah', desc: 'Fajr 18.5°, Isha 90 mins after Maghrib' },
    { id: 'Karachi', name: 'University of Islamic Sciences, Karachi', desc: 'Fajr 18°, Isha 18°' },
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
          Preferences
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Calculation Settings</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure astronomical conventions and juristic preferences</p>
          </div>
        </div>
      </div>

      {/* Calculation Conventions */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-4 h-4 text-emerald-600" />
          <span>Calculation Convention</span>
        </h2>
        <div className="space-y-2">
          {calculationMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMethod(m.id);
                localStorage.setItem('sakiru_calc_method', m.id);
              }}
              className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between ${
                method === m.id
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                  : 'bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div>
                <div className="text-sm">{m.name}</div>
                <div className="text-xs text-slate-400 font-normal">{m.desc}</div>
              </div>
              {method === m.id && <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Asr Juristic Method */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Asr Juristic Method</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setAsrMethod('Standard');
              localStorage.setItem('sakiru_asr_method', 'Standard');
            }}
            className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
              asrMethod === 'Standard'
                ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                : 'bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-800 dark:text-slate-200'
            }`}
          >
            <div>
              <div className="text-sm">Standard (Shafi'i, Maliki, Hanbali)</div>
              <div className="text-xs text-slate-400 font-normal">Shadow length equals object height</div>
            </div>
            {asrMethod === 'Standard' && <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
          </button>

          <button
            onClick={() => {
              setAsrMethod('Hanafi');
              localStorage.setItem('sakiru_asr_method', 'Hanafi');
            }}
            className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
              asrMethod === 'Hanafi'
                ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                : 'bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-800 dark:text-slate-200'
            }`}
          >
            <div>
              <div className="text-sm">Hanafi Method</div>
              <div className="text-xs text-slate-400 font-normal">Shadow length is twice object height</div>
            </div>
            {asrMethod === 'Hanafi' && <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
          </button>
        </div>
      </div>
    </div>
  );
};