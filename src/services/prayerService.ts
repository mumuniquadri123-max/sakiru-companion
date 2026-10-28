import { Coordinates, PrayerTimes, CalculationMethod, HighLatitudeRule } from 'adhan';

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

  // Read saved calculation conventions and preferences from localStorage
  const savedMethod = localStorage.getItem('sakiru_calc_method') || 'MWL';
  const savedAsr = localStorage.getItem('sakiru_asr_method') || 'Standard';
  const savedHighLat = localStorage.getItem('sakiru_high_lat_rule') || 'MiddleOfTheNight';

  let params = CalculationMethod.MuslimWorldLeague();
  if (savedMethod === 'ISNA') params = CalculationMethod.NorthAmerica();
  else if (savedMethod === 'Egypt') params = CalculationMethod.Egyptian();
  else if (savedMethod === 'Makkah') params = CalculationMethod.UmmAlQura();
  else if (savedMethod === 'Karachi') params = CalculationMethod.Karachi();
  else if (savedMethod === 'Dubai') params = CalculationMethod.Dubai();
  else if (savedMethod === 'Moonsighting') params = CalculationMethod.MoonsightingCommittee();
  else if (savedMethod === 'Turkey') params = CalculationMethod.Turkey();

  // Set Asr juristic method
  params.madhab = savedAsr === 'Hanafi' ? 'hanafi' : 'shafi';

  // Set High-Latitude Rule for regions experiencing white nights or polar extremes
  if (savedHighLat === 'SeventhOfTheNight') {
    params.highLatitudeRule = HighLatitudeRule.SeventhOfTheNight;
  } else if (savedHighLat === 'TwilightAngle') {
    params.highLatitudeRule = HighLatitudeRule.TwilightAngle;
  } else {
    params.highLatitudeRule = HighLatitudeRule.MiddleOfTheNight;
  }

  const prayerTimes = new PrayerTimes(coordinates, date, params);

  // Apply optional manual minute adjustments stored in localStorage (e.g., {"fajr": 2, "maghrib": -1})
  const applyOffset = (prayerName: string, timeDate: Date): Date => {
    if (!timeDate) return timeDate;
    try {
      const storedOffsets = JSON.parse(localStorage.getItem('sakiru_prayer_offsets') || '{}');
      const offsetMinutes = storedOffsets[prayerName.toLowerCase()] || 0;
      if (offsetMinutes !== 0) {
        return new Date(timeDate.getTime() + offsetMinutes * 60000);
      }
    } catch (e) {
      // ignore parse errors
    }
    return timeDate;
  };

  const formatTime = (timeDate: Date) => {
    if (!timeDate) return '--:--';
    return timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return [
    { name: "Fajr", time: formatTime(applyOffset("Fajr", prayerTimes.fajr)), arabicName: "الفجر", isNext: false },
    { name: "Sunrise", time: formatTime(applyOffset("Sunrise", prayerTimes.sunrise)), arabicName: "الشروق", isNext: false },
    { name: "Dhuhr", time: formatTime(applyOffset("Dhuhr", prayerTimes.dhuhr)), arabicName: "الظهر", isNext: true },
    { name: "Asr", time: formatTime(applyOffset("Asr", prayerTimes.asr)), arabicName: "العصر", isNext: false },
    { name: "Maghrib", time: formatTime(applyOffset("Maghrib", prayerTimes.maghrib)), arabicName: "المغرب", isNext: false },
    { name: "Isha", time: formatTime(applyOffset("Isha", prayerTimes.isha)), arabicName: "العشاء", isNext: false },
  ];
}