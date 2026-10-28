import { Coordinates, PrayerTimes, CalculationMethod, HighLatitudeRule } from 'adhan';

export interface LivePrayerStatus {
  currentPrayerName: string;
  nextPrayerName: string;
  nextPrayerTime: string;
  nextPrayerTimestamp: number;
  timeRemainingFormatted: string;
  allPrayersToday: { name: string; arabicName: string; time: string; timestamp: number; isNext: boolean }[];
}

export function getLivePrayerStatus(latitude: number, longitude: number): LivePrayerStatus {
  const now = new Date();
  const coordinates = new Coordinates(latitude, longitude);

  // Read user preferences from localStorage
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

  params.madhab = savedAsr === 'Hanafi' ? 'hanafi' : 'shafi';
  
  if (savedHighLat === 'SeventhOfTheNight') params.highLatitudeRule = HighLatitudeRule.SeventhOfTheNight;
  else if (savedHighLat === 'TwilightAngle') params.highLatitudeRule = HighLatitudeRule.TwilightAngle;
  else params.highLatitudeRule = HighLatitudeRule.MiddleOfTheNight;

  // Calculate today's prayer times
  const todayTimes = new PrayerTimes(coordinates, now, params);
  
  // Calculate tomorrow's Fajr in case today's obligatory prayers have all passed
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowTimes = new PrayerTimes(coordinates, tomorrow, params);

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  const schedule = [
    { name: 'Fajr', arabicName: 'الفجر', time: formatTime(todayTimes.fajr), dateObj: todayTimes.fajr },
    { name: 'Sunrise', arabicName: 'الشروق', time: formatTime(todayTimes.sunrise), dateObj: todayTimes.sunrise },
    { name: 'Dhuhr', arabicName: 'الظهر', time: formatTime(todayTimes.dhuhr), dateObj: todayTimes.dhuhr },
    { name: 'Asr', arabicName: 'العصر', time: formatTime(todayTimes.asr), dateObj: todayTimes.asr },
    { name: 'Maghrib', arabicName: 'المغرب', time: formatTime(todayTimes.maghrib), dateObj: todayTimes.maghrib },
    { name: 'Isha', arabicName: 'العشاء', time: formatTime(todayTimes.isha), dateObj: todayTimes.isha },
  ];

  // Find the next upcoming obligatory prayer (excluding Sunrise)
  const obligatorySchedule = schedule.filter(p => p.name !== 'Sunrise');
  let nextPrayer = obligatorySchedule.find(p => p.dateObj.getTime() > now.getTime());

  let targetTimestamp: number;
  let nextPrayerName: string;
  let nextPrayerTimeString: string;

  if (nextPrayer) {
    targetTimestamp = nextPrayer.dateObj.getTime();
    nextPrayerName = nextPrayer.name;
    nextPrayerTimeString = nextPrayer.time;
  } else {
    // If all prayers for today have passed, next is Fajr tomorrow
    targetTimestamp = tomorrowTimes.fajr.getTime();
    nextPrayerName = 'Fajr';
    nextPrayerTimeString = formatTime(tomorrowTimes.fajr);
  }

  // Calculate time remaining until next prayer
  const diffMs = Math.max(0, targetTimestamp - now.getTime());
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const timeRemainingFormatted = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  // Format full list for UI with active flags
  const allPrayersToday = schedule.map(p => ({
    name: p.name,
    arabicName: p.arabicName,
    time: p.time,
    timestamp: p.dateObj.getTime(),
    isNext: p.name === nextPrayerName
  }));

  return {
    currentPrayerName: nextPrayerName,
    nextPrayerName,
    nextPrayerTime: nextPrayerTimeString,
    nextPrayerTimestamp: targetTimestamp,
    timeRemainingFormatted,
    allPrayersToday
  };
}