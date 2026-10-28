import React, { useState } from 'react';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, BookOpen, ChevronRight, ChevronLeft, PlayCircle, Info } from 'lucide-react';

interface WuduGuideProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const WuduGuide: React.FC<WuduGuideProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const wuduSteps = [
    {
      step: 1,
      title: "Intention (Niyyah)",
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      transliteration: "Bismillah hir-rahman nir-rahim",
      translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
      type: "Sunnah",
      description: "Intention is made silently in the heart to purify oneself for prayer. 'Basmala' means reciting Bismillah. This invites Allah's blessings into your act of purification.",
      tips: "You do not need to voice the intention aloud; having it consciously in your mind is sufficient."
    },
    {
      step: 2,
      title: "Washing Both Hands",
      arabic: "غسل الكفين إلى الكوعين",
      transliteration: "Ghusl al-kaffayn",
      translation: "Washing both hands up to the wrists three times.",
      type: "Sunnah",
      description: "Wash your hands thoroughly three times, rubbing between your fingers and ensuring water reaches every part of your hands and wrists.",
      tips: "Start with your right hand, then your left."
    },
    {
      step: 3,
      title: "Rinsing Mouth & Sniffing Water (Madmadah & Istinshaq)",
      arabic: "المضمضة والاستنشاق",
      transliteration: "Al-madmadah wal-istinshaq",
      translation: "Rinsing the mouth 3 times and sniffing water into the nose 3 times.",
      type: "Sunnah",
      description: "Take water into your right hand, put it in your mouth, swish it around, and spit it out. Then, take fresh water, sniff it gently into your nostrils using your right hand, and blow it out using your left hand.",
      tips: "Make sure water reaches the soft part inside your nostrils."
    },
    {
      step: 4,
      title: "Washing the Face",
      arabic: "غسل الوجه",
      transliteration: "Ghusl al-wajh",
      translation: "Washing the entire face from right ear to left ear and from hairline to chin three times.",
      type: "Fard (Obligatory)",
      description: "Water must cover the entire width and length of the face. If you have a beard, water should pass through it gently.",
      tips: "This is a mandatory (Fard) step of Wudu and cannot be skipped or missed."
    },
    {
      step: 5,
      title: "Washing Arms up to the Elbows",
      arabic: "غسل اليدين إلى المرافق",
      transliteration: "Ghusl al-yadayn ila al-marafiq",
      translation: "Washing both arms up to and including the elbows three times.",
      type: "Fard (Obligatory)",
      description: "Start with your right arm. Pour water from your fingertips up past your elbow, ensuring no dry spot remains on your skin or arms.",
      tips: "Wash the right arm completely 3 times, followed by the left arm 3 times."
    },
    {
      step: 6,
      title: "Wiping the Head and Ears (Masah)",
      arabic: "مسح الرأس والأذنين",
      transliteration: "Mash al-ra's wal-udhayn",
      translation: "Wiping the head and cleaning the inner and outer ears once with wet hands.",
      type: "Fard (Obligatory / Sunnah)",
      description: "With wet hands, start from the front of your head, pass your hands over your head to the back, and bring them back to the front. Then, use your index fingers to clean inside the grooves of your ears, and your thumbs behind them.",
      tips: "Unlike washing parts 3 times, wiping the head is performed only once."
    },
    {
      step: 7,
      title: "Washing Both Feet up to the Ankles",
      arabic: "غسل الرجلين إلى الكعبين",
      transliteration: "Ghusl al-rijlayn ila al-ka'bayn",
      translation: "Washing both feet up to and including the ankles three times.",
      type: "Fard (Obligatory)",
      description: "Wash your right foot thoroughly up to the ankle, making sure water flows between all your toes. Repeat three times, then do the same for your left foot.",
      tips: "Pay special attention to the heels and space between the toes."
    }
  ];

  const activeData = wuduSteps[currentStep];

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
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
          Step {currentStep + 1} of {wuduSteps.length}
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Complete Wudu Guide for Beginners</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Detailed instructions, definitions & video demonstration support</p>
          </div>
        </div>
      </div>

      {/* Video Demonstration Placeholder Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-lg border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400">
            Visual Guide
          </span>
          <h3 className="text-lg font-bold">Watch Step {currentStep + 1} Demonstration</h3>
          <p className="text-xs text-slate-300 max-w-md">
            First-time learner? Follow along with our HD video demonstration showing exact hand placements and water flow.
          </p>
        </div>
        <button 
          onClick={() => alert(`[Video Demo] Playing visual guide for: ${activeData.title}`)}
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition flex items-center gap-2 shadow-lg shadow-amber-500/20 shrink-0 text-sm"
        >
          <PlayCircle className="w-5 h-5" />
          <span>Play Step Video</span>
        </button>
      </div>

      {/* Step Content Card */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            activeData.type.includes('Fard') 
              ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
              : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
          }`}>
            {activeData.type} Action
          </span>
          <span className="text-sm font-mono font-semibold text-slate-400">
            0{currentStep + 1} / 0{wuduSteps.length}
          </span>
        </div>

        <div className="text-center space-y-4 py-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activeData.title}</h2>
          <div className="text-3xl font-serif text-amber-600 dark:text-amber-400 py-2">
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

        {/* Beginner Tip Box */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-3 text-amber-900 dark:text-amber-300 text-xs">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold mb-0.5">Beginner Tip:</strong>
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
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, wuduSteps.length - 1))}
            disabled={currentStep === wuduSteps.length - 1}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition text-sm"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};