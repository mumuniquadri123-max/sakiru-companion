import { useState, useEffect } from 'react';
import { defaultCities } from './services/locationService';
import type { CityLocation } from './services/locationService';
import { Dashboard } from './components/Dashboard';
import { Timetable } from './components/Timetable';
import { QiblaCompass } from './components/QiblaCompass';
import { WuduGuide } from './components/WuduGuide';
import { SalahGuide } from './components/SalahGuide';
import { CalculationSettings } from './components/CalculationSettings';
import { JummahModule } from './components/JummahModule';
import { IslamicCalendar } from './components/IslamicCalendar';
import { NotificationSettings } from './components/NotificationSettings';
import { MapPin, Search, Bell, Sliders } from 'lucide-react';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');
  
  // Load saved location from localStorage or default to London
  const [currentLocation, setCurrentLocation] = useState<CityLocation>(() => {
    const saved = localStorage.getItem('sakiru_selected_location');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved location", e);
      }
    }
    return defaultCities[0];
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Save location to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sakiru_selected_location', JSON.stringify(currentLocation));
  }, [currentLocation]);

  const filteredCities = defaultCities.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-12">
      {/* Top Global Header Bar */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 px-4 py-3 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentScreen('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/20">
              س
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">SAKIRU</span>
              <span className="text-[10px] block text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Islamic Companion</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification Reminders Button */}
            <button
              onClick={() => setCurrentScreen('notifications')}
              className="text-xs bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3.5 py-1.5 rounded-xl font-semibold transition border border-slate-200 dark:border-slate-600 flex items-center gap-1.5 shadow-xs"
            >
              <Bell className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Reminders</span>
            </button>

            {/* Calculation Settings Button */}
            <button
              onClick={() => setCurrentScreen('settings')}
              className="text-xs bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3.5 py-1.5 rounded-xl font-semibold transition border border-slate-200 dark:border-slate-600 flex items-center gap-1.5 shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Settings</span>
            </button>

            {/* Location Selector Trigger Button */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition border border-slate-200 dark:border-slate-600 shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentLocation.name}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dynamic Screen Render */}
      <main className="pt-4">
        {currentScreen === 'dashboard' && (
          <Dashboard 
            currentLocation={currentLocation} 
            onNavigate={(screen) => setCurrentScreen(screen)} 
          />
        )}

        {currentScreen === 'timetable' && (
          <Timetable 
            currentLocation={currentLocation} 
            onBack={() => setCurrentScreen('dashboard')} 
          />
        )}

        {currentScreen === 'qibla' && (
          <QiblaCompass 
            currentLocation={currentLocation} 
            onBack={() => setCurrentScreen('dashboard')} 
          />
        )}

        {currentScreen === 'wudu' && (
          <WuduGuide 
            currentLocation={currentLocation} 
            onBack={() => setCurrentScreen('dashboard')} 
          />
        )}

        {currentScreen === 'salah' && (
          <SalahGuide 
            currentLocation={currentLocation} 
            onBack={() => setCurrentScreen('dashboard')} 
          />
        )}

        {currentScreen === 'jummah' && (
          <JummahModule 
            currentLocation={currentLocation} 
            onBack={() => setCurrentScreen('dashboard')} 
          />
        )}

        {currentScreen === 'calendar' && (
          <IslamicCalendar 
            currentLocation={currentLocation} 
            onBack={() => setCurrentScreen('dashboard')} 
          />
        )}

        {currentScreen === 'settings' && (
          <CalculationSettings 
            currentLocation={currentLocation} 
            onBack={() => setCurrentScreen('dashboard')} 
          />
        )}

        {currentScreen === 'notifications' && (
          <NotificationSettings 
            currentLocation={currentLocation} 
            onBack={() => setCurrentScreen('dashboard')} 
          />
        )}
      </main>

      {/* Global Location Selector Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Select Global Location</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Prayer times & calculation convention auto-configure</p>
              </div>
              <button 
                onClick={() => setIsLocationModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search city or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-slate-200"
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentLocation(city);
                      localStorage.setItem('sakiru_calc_method', city.defaultMethod);
                      setIsLocationModalOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between ${
                      currentLocation.name === city.name
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div>
                      <div>{city.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{city.country} • Standard: {city.defaultMethod}</div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°</span>
                  </button>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  No cities found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;