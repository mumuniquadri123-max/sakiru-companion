import { Coordinates, PrayerTimes, CalculationMethod } from 'adhan';

export interface CalculatedPrayer {
  name: string;
  time: string;
  arabicName: string;
  isNext: boolean;
}

export function getPrayerTimesForDate(
  latitude: number, 
  longitude: number, 
  date: Date = new Date()
): CalculatedPrayer[] {
  const coordinates = new Coordinates(latitude, longitude);

  // Read the active calculation method saved in localStorage (defaults to MWL)
  const savedMethod = localStorage.getItem('sakiru_calc_method') || 'MWL';
  const savedAsr = localStorage.getItem('sakiru_asr_method') || 'Standard';

  let params = CalculationMethod.MuslimWorldLeague();
  if (savedMethod === 'ISNA') params = CalculationMethod.NorthAmerica();
  else if (savedMethod === 'Egypt') params = CalculationMethod.Egyptian();
  else if (savedMethod === 'Makkah') params = CalculationMethod.UmmAlQura();
  else if (savedMethod === 'Karachi') params = CalculationMethod.Karachi();

  // Set Asr juristic method (Standard vs Hanafi)
  params.madhab = savedAsr === 'Hanafi' ? 'hanafi' : 'shafi';

  const prayerTimes = new PrayerTimes(coordinates, date, params);

  const formatTime = (timeDate: Date) => {
    if (!timeDate) return '--:--';
    return timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return [
    { name: "Fajr", time: formatTime(prayerTimes.fajr), arabicName: "الفجر", isNext: false },
    { name: "Sunrise", time: formatTime(prayerTimes.sunrise), arabicName: "الشروق", isNext: false },
    { name: "Dhuhr", time: formatTime(prayerTimes.dhuhr), arabicName: "الظهر", isNext: true },
    { name: "Asr", time: formatTime(prayerTimes.asr), arabicName: "العصر", isNext: false },
    { name: "Maghrib", time: formatTime(prayerTimes.maghrib), arabicName: "المغرب", isNext: false },
    { name: "Isha", time: formatTime(prayerTimes.isha), arabicName: "العشاء", isNext: false },
  ];
}