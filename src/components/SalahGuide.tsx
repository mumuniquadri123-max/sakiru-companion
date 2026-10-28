import React, { useState } from 'react';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';

interface SalahGuideProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const SalahGuide: React.FC<SalahGuideProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const salahSteps = [
    {
      unit: "Preparation & Takbir",
      posture: "Qiyam (Standing)",
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah is the Greatest",
      description: "Stand upright facing the Qibla with humility, raise your hands to your ears or shoulders, and say Takbir to begin prayer."
    },
    {
      unit: "Opening Recitation",
      posture: "Qiyam (Standing)",
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ...",
      transliteration: "Subhanaka Allahumma wa bihamdika...",
      translation: "Glory be to You, O Allah, and praise be to You...",
      description: "Recite the opening supplication followed by Surah Al-Fatihah and a short Surah from the Quran."
    },
    {
      unit: "Bowing (Ruku)",
      posture: "Bowing",
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      transliteration: "Subhana Rabbiya al-Azim (3x)",
      translation: "Glory be to my Lord, the Greatest.",
      description: "Bow from the waist with your back straight, placing your hands firmly on your knees."
    },
    {
      unit: "Standing Up from Ruku",
      posture: "I'tidal (Standing straight)",
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
      transliteration: "Sami'allahu liman hamidah",
      translation: "Allah hears the one who praises Him.",
      description: "Rise back up straight while saying the praise, followed by 'Rabbana wa lakal hamd'."
    },
    {
      unit: "Prostration (Sujud)",
      posture: "Prostration",
      arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى",
      transliteration: "Subhana Rabbiya al-A'la (3x)",
      translation: "Glory be to my Lord, the Most High.",
      description: "Prostrate with seven parts of your body touching the ground: forehead, nose, both hands, both knees, and toes."
    },
    {
      unit: "Sitting & Tashahhud",
      posture: "Jalsah / Tashahhud",
      arabic: "التَّحِيَّاتُ لِلَّهِ...",
      transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat...",
      translation: "All greetings, prayers and pure words belong to Allah...",
      description: "Sit respectfully on your left foot and recite the Tashahhud and Salawat upon the Prophet (PBUH)."
    },
    {
      unit: "Concluding Prayer",
      posture: "Taslim",
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
      transliteration: "As-salamu alaykum wa rahmatullah",
      translation: "Peace be upon you, and the mercy of Allah.",
      description: "Turn your head to the right shoulder then to the left shoulder, concluding your prayer."
    }
  ];

  const activeData = salahSteps[currentStep];

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
          Step {currentStep + 1} of {salahSteps.length}
        </div>
      </div>

      {/* Header Info */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Learn Salah (Prayer)</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Step-by-step postures and recitations guide</p>
          </div>
        </div>
      </div>

      {/* Interactive Step Card */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            {activeData.posture}
          </span>
          <span className="text-sm font-mono font-semibold text-slate-400">
            0{currentStep + 1} / 0{salahSteps.length}
          </span>
        </div>

        <div className="text-center space-y-4 py-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activeData.unit}</h2>
          <div className="text-3xl font-serif text-emerald-600 dark:text-emerald-400 py-2">
            {activeData.arabic}
          </div>
          <div className="text-sm font-medium italic text-slate-600 dark:text-slate-300">
            "{activeData.transliteration}"
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            {activeData.translation}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            {activeData.description}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, salahSteps.length - 1))}
            disabled={currentStep === salahSteps.length - 1}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg shadow-emerald-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition text-sm"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};