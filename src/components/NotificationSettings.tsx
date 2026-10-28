import React, { useState, useEffect } from 'react';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, Bell, Volume2, ShieldAlert, Play } from 'lucide-react';

interface NotificationSettingsProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onBack }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    return localStorage.getItem('sakiru_notifications_enabled') === 'true';
  });

  const [selectedSound, setSelectedSound] = useState<string>(() => {
    return localStorage.getItem('sakiru_adhan_sound') || 'Short Adhan';
  });

  useEffect(() => {
    localStorage.setItem('sakiru_notifications_enabled', String(notificationsEnabled));
    localStorage.setItem('sakiru_adhan_sound', selectedSound);
  }, [notificationsEnabled, selectedSound]);

  // Function to test audio playback immediately bypassing browser autoplay restrictions
  const testAudioPlayback = () => {
    try {
      // Create a pleasant synthesized chime / Adhan notification tone using Web Audio API
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) {
        alert("Audio context not supported in this browser.");
        return;
      }
      const ctx = new AudioContext();
      
      // Play a sequence of tones representing an Adhan notification chime
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime + index * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.2 + 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + index * 0.2);
        osc.stop(ctx.currentTime + index * 0.2 + 0.4);
      });

      alert(`[Test Success] Playing preview for: ${selectedSound}`);
    } catch (e) {
      console.error("Audio playback error:", e);
      alert("Could not play test audio. Please interact with the page first.");
    }
  };

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
          Reminders
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Notification & Adhan Preferences</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Opt-in prayer reminders. Never forced or intrusive[cite: 5].</p>
          </div>
        </div>
      </div>

      {/* Toggle Main Switch */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/60">
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">Enable Prayer Reminders</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Receive optional notifications at local prayer times</div>
          </div>
          <input 
            type="checkbox" 
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className="w-5 h-5 accent-emerald-600 cursor-pointer"
          />
        </div>

        {notificationsEnabled && (
          <div className="space-y-4 p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/30 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                <Volume2 className="w-4 h-4" />
                <span>Audio Selection</span>
              </div>
              <button
                onClick={testAudioPlayback}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Test Sound</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {['Short Adhan', 'Normal Notification Sound', 'Silent Notification'].map((sound, idx) => (
                <label key={idx} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer p-2 rounded-xl hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20 transition">
                  <input 
                    type="radio" 
                    name="adhanSound" 
                    checked={selectedSound === sound}
                    onChange={() => setSelectedSound(sound)}
                    className="accent-emerald-600 w-4 h-4" 
                  />
                  <span>{sound}</span>
                </label>
              ))}
            </div>

            <div className="border-t border-emerald-500/20 pt-3 mt-3 flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                * Note: Browsers require page interaction before playing audio. Click "Test Sound" above to verify your speaker output. For full background native alarms, SAKIRU's upcoming mobile builds handle OS-level scheduling.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};