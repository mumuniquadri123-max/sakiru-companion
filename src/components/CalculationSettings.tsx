import React, { useState, useEffect } from 'react';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, Settings, Check, Sliders, Globe } from 'lucide-react';

interface CalculationSettingsProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const CalculationSettings: React.FC<CalculationSettingsProps> = ({ onBack }) => {
  const [method, setMethod] = useState<string>(() => localStorage.getItem('sakiru_calc_method') || 'MWL');
  const [asrMethod, setAsrMethod] = useState<string>(() => localStorage.getItem('sakiru_asr_method') || 'Standard');
  const [highLatRule, setHighLatRule] = useState<string>(() => localStorage.getItem('sakiru_high_lat_rule') || 'MiddleOfTheNight');

  useEffect(() => {
    localStorage.setItem('sakiru_calc_method', method);
    localStorage.setItem('sakiru_asr_method', asrMethod);
    localStorage.setItem('sakiru_high_lat_rule', highLatRule);
  }, [method, asrMethod, highLatRule]);

  const calculationMethods = [
    { id: 'MWL', name: 'Muslim World League (MWL)', desc: 'Fajr 18°, Isha 17°' },
    { id: 'ISNA', name: 'Islamic Society of North America (ISNA)', desc: 'Fajr 15°, Isha 15°' },
    { id: 'Egypt', name: 'Egyptian General Authority of Survey', desc: 'Fajr 19.5°, Isha 17.5°' },
    { id: 'Makkah', name: 'Umm Al-Qura University, Makkah', desc: 'Fajr 18.5°, Isha 90 mins after Maghrib' },
    { id: 'Karachi', name: 'University of Islamic Sciences, Karachi', desc: 'Fajr 18°, Isha 18°' },
    { id: 'Dubai', name: 'Dubai (UAE)', desc: 'Regional Gulf standards' },
    { id: 'Turkey', name: 'Diyanet İşleri Başkanlığı, Turkey', desc: 'Fajr 18°, Isha 17°' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 pb-24">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          Preferences & Rules
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Calculation Settings</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure astronomical conventions, madhhabs, and high-latitude rules</p>
          </div>
        </div>
      </div>

      {/* Calculation Conventions */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-4 h-4 text-emerald-600" />
          <span>Calculation Convention</span>
        </h2>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {calculationMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
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
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Asr Juristic Method</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'Standard', name: "Standard (Shafi'i, Maliki, Hanbali)", desc: 'Shadow length equals object height' },
            { id: 'Hanafi', name: 'Hanafi Method', desc: 'Shadow length is twice object height' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setAsrMethod(item.id)}
              className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                asrMethod === item.id
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                  : 'bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div>
                <div className="text-sm">{item.name}</div>
                <div className="text-xs text-slate-400 font-normal">{item.desc}</div>
              </div>
              {asrMethod === item.id && <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* High Latitude Adjustment Rule */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-600" />
          <span>High-Latitude Rule (Northern/Southern Regions)</span>
        </h2>
        <div className="space-y-2">
          {[
            { id: 'MiddleOfTheNight', name: 'Middle of the Night', desc: 'Splits night duration equally for Fajr/Isha bounds' },
            { id: 'SeventhOfTheNight', name: 'One-Seventh of the Night', desc: 'Sets twilight boundaries to 1/7th of night duration' },
            { id: 'TwilightAngle', name: 'Twilight Angle', desc: 'Adjusts twilight angle proportionally for high latitudes' },
          ].map((rule) => (
            <button
              key={rule.id}
              onClick={() => setHighLatRule(rule.id)}
              className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between ${
                highLatRule === rule.id
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                  : 'bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div>
                <div className="text-sm">{rule.name}</div>
                <div className="text-xs text-slate-400 font-normal">{rule.desc}</div>
              </div>
              {highLatRule === rule.id && <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};