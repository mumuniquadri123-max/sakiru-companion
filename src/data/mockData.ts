// Define the TypeScript Interface for a Prayer Time item
export interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
  isNext: boolean;
}

// Define the TypeScript Interface for a Wudu Step item
export interface WuduStep {
  step: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  type: 'Sunnah' | 'Fard (Obligatory)';
  description: string;
}

// Define the TypeScript Interface for a Salah Step item
export interface SalahStep {
  unit: string;
  posture: string;
  arabic: string;
  transliteration: string;
  translation: string;
  description: string;
}

// Mock Data arrays using our defined TypeScript types
export const mockPrayerTimes: PrayerTime[] = [
  { name: "Fajr", time: "05:12 AM", arabicName: "الفجر", isNext: false },
  { name: "Sunrise", time: "06:34 AM", arabicName: "الشروق", isNext: false },
  { name: "Dhuhr", time: "01:15 PM", arabicName: "الظهر", isNext: true },
  { name: "Asr", time: "04:45 PM", arabicName: "العصر", isNext: false },
  { name: "Maghrib", time: "07:30 PM", arabicName: "المغرب", isNext: false },
  { name: "Isha", time: "08:50 PM", arabicName: "العشاء", isNext: false },
];

export const wuduSteps: WuduStep[] = [
  {
    step: 1,
    title: "Intention & Basmala",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    transliteration: "Bismillah hir-rahman nir-rahim",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
    type: "Sunnah",
    description: "Begin with the intention in your heart to perform Wudu for cleanliness and worship, and recite Bismillah."
  },
  {
    step: 2,
    title: "Washing Hands",
    arabic: "غسل الكفين",
    transliteration: "Ghusl al-kaffayn",
    translation: "Washing both hands up to the wrists three times.",
    type: "Sunnah",
    description: "Wash your hands thoroughly three times, ensuring water reaches between the fingers."
  },
  {
    step: 3,
    title: "Washing the Face",
    arabic: "غسل الوجه",
    transliteration: "Ghusl al-wajh",
    translation: "Washing the entire face from ear to ear and hairline to chin three times.",
    type: "Fard (Obligatory)",
    description: "Ensure water covers the entire width and length of your face."
  }
];

export const salahSteps: SalahStep[] = [
  {
    unit: "Preparation & Takbir",
    posture: "Qiyam (Standing)",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "Allah is the Greatest",
    description: "Stand upright facing the Qibla with humility, raise your hands to your ears/shoulders, and say Takbir."
  },
  {
    unit: "Bowing (Ruku)",
    posture: "Bowing",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    transliteration: "Subhana Rabbiya al-Azim (3x)",
    translation: "Glory be to my Lord, the Greatest.",
    description: "Bow from the waist with your back straight, placing your hands firmly on your knees."
  }
];