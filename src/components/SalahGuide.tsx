import React, { useState } from 'react';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, BookOpen, ChevronRight, ChevronLeft, PlayCircle, Info } from 'lucide-react';

interface SalahGuideProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const SalahGuide: React.FC<SalahGuideProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const solatSteps = [
    {
      unit: "Step 1: Intention & Takbiratul Ihram",
      posture: "Qiyam (Standing Upright)",
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah is the Greatest",
      description: "Stand facing the direction of the Qibla with humility. Raise your hands up to your ears or shoulders, make the sincere intention in your heart for the prayer you are performing, and say 'Allahu Akbar' to begin.",
      tips: "This marks the formal entry into prayer. From this moment, worldly talk or actions are prohibited."
    },
    {
      unit: "Step 2: Opening Supplication & Surah Al-Fatihah",
      posture: "Qiyam (Standing)",
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۞ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      transliteration: "Bismillah hir-rahman nir-rahim. Alhamdulillah rabb al-alamin...",
      translation: "In the name of Allah, the Most Gracious, the Most Merciful. Praise be to Allah, Lord of the Worlds...",
      description: "Place your right hand over your left hand on your chest or navel. Recite the opening supplication (Thana), followed by Surah Al-Fatihah and any other short Surah from the Quran.",
      tips: "Beginners can follow along with phonetics and listen to audio/video recitations."
    },
    {
      unit: "Step 3: Bowing (Ruku)",
      posture: "Bowing with Straight Back",
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      transliteration: "Subhana Rabbiya al-Azim (3x)",
      translation: "Glory be to my Lord, the Greatest.",
      description: "Bow forward from your waist, keeping your back straight and parallel to the ground, placing your hands firmly on your knees with fingers spread. Quietly recite the glorification three times.",
      tips: "Ensure your head is level with your back—neither held too high nor drooping too low."
    },
    {
      unit: "Step 4: Rising from Ruku (I'tidal)",
      posture: "Standing Straight",
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۞ رَبَّنَا وَلَكَ الْحَمْدُ",
      transliteration: "Sami'allahu liman hamidah. Rabbana wa lakal hamd.",
      translation: "Allah hears the one who praises Him. Our Lord, to You belongs all praise.",
      description: "Rise back up smoothly from bowing into an upright standing position, raising your hands or keeping them at your sides, and praise Allah.",
      tips: "Stand completely still and composed for a brief moment before prostrating."
    },
    {
      unit: "Step 5: Prostration (Sujud)",
      posture: "Prostrating on 7 Points",
      arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى",
      transliteration: "Subhana Rabbiya al-A'la (3x)",
      translation: "Glory be to my Lord, the Most High.",
      description: "Lower yourself into prostration with 7 parts of your body touching the ground: forehead, nose, both palms, both knees, and toes facing the Qibla. Recite the glorification three times.",
      tips: "Keep your elbows raised off the floor and your arms away from your sides."
    },
    {
      unit: "Step 6: Sitting Between Prostrations (Jalsah)",
      posture: "Sitting on Left Foot",
      arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي",
      transliteration: "Rabbighfir li warhamni",
      translation: "My Lord, forgive me and have mercy upon me.",
      description: "Rise from your first prostration, sit upright and calm on your left foot with your right foot resting on its toes, and offer a short supplication for forgiveness.",
      tips: "Take your time in this sitting posture before performing the second prostration (Sujud)."
    },
    {
      unit: "Step 7: Tashahhud & Concluding Salawat",
      posture: "Sitting (Jalsah / Tashahhud)",
      arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ...",
      transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat...",
      translation: "All greetings, prayers, and pure words belong to Allah...",
      description: "In the final unit (Rak'ah) of your prayer, sit respectfully and recite the Tashahhud testimony of faith, followed by prayers upon Prophet Muhammad (PBUH).",
      tips: "Raise your right index finger slightly when bearing witness during the Tashahhud."
    },
    {
      unit: "Step 8: Concluding Prayer (Taslim)",
      posture: "Turning Head Right & Left",
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
      transliteration: "As-salamu alaykum wa rahmatullah",
      translation: "Peace be upon you, and the mercy of Allah.",
      description: "Conclude your Solat by turning your head to your right shoulder saying the Taslim, and then turning your head to your left shoulder repeating it.",
      tips: "This officially concludes your prayer. You may now make personal supplications (Dua)."
    }
  ];

  const activeData = solatSteps[currentStep];

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
          Step {currentStep + 1} of {solatSteps.length}
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Complete Solat (Prayer) Masterclass</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Beginner-friendly postures, recitations & video guides</p>
          </div>
        </div>
      </div>

      {/* Video Demonstration Placeholder Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-lg border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400">
            Solat Visual Guide
          </span>
          <h3 className="text-lg font-bold">Watch Video Demonstration: {activeData.posture}</h3>
          <p className="text-xs text-slate-300 max-w-md">
            New to praying? Watch our step-by-step video demonstration illustrating exact bodily movements and pronunciations.
          </p>
        </div>
        <button 
          onClick={() => alert(`[Video Demo] Playing Solat posture video for: ${activeData.posture}`)}
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-600/20 shrink-0 text-sm"
        >
          <PlayCircle className="w-5 h-5" />
          <span>Play Posture Video</span>
        </button>
      </div>

      {/* Step Card */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            {activeData.posture}
          </span>
          <span className="text-sm font-mono font-semibold text-slate-400">
            0{currentStep + 1} / 0{solatSteps.length}
          </span>
        </div>

        <div className="text-center space-y-4 py-2">
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
          <p className="text-sm text-slate-700 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            {activeData.description}
          </p>
        </div>

        {/* Beginner Tip */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3 text-emerald-900 dark:text-emerald-300 text-xs">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold mb-0.5">Beginner Note:</strong>
            <span>{activeData.tips}</span>
          </div>
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
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, solatSteps.length - 1))}
            disabled={currentStep === solatSteps.length - 1}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition text-sm"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};