import React, { useState, useEffect } from 'react';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, Compass, AlertCircle, RefreshCw } from 'lucide-react';

interface QiblaCompassProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const QiblaCompass: React.FC<QiblaCompassProps> = ({ currentLocation, onBack }) => {
  const [heading, setHeading] = useState<number | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Calculate Qibla bearing relative to North based on coordinates
  // Kaaba coordinates: 21.4225° N, 39.8262° E
  const calculateQiblaBearing = (lat: number, lon: number) => {
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    const phi1 = (lat * Math.PI) / 180;
    const phi2 = (kaabaLat * Math.PI) / 180;
    const deltaLambda = ((kaabaLon - lon) * Math.PI) / 180;

    const y = Math.sin(deltaLambda) * Math.cos(phi2);
    const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
    
    let theta = Math.atan2(y, x);
    let bearing = (theta * 180) / Math.PI;
    return (bearing + 360) % 360;
  };

  const qiblaBearing = Math.round(calculateQiblaBearing(currentLocation.latitude, currentLocation.longitude));

  // Handle device orientation sensors for mobile web
  const requestCompassPermission = async () => {
    try {
      // @ts-ignore - DeviceOrientationEvent with requestPermission for iOS Safari
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        // @ts-ignore
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setErrorMsg('Compass permission denied. Using static bearing view.');
        }
      } else if ('ondeviceorientation' in window) {
        setPermissionGranted(true);
        window.addEventListener('deviceorientation', handleOrientation, true);
      } else {
        setErrorMsg('Device orientation sensors not supported on this device/browser.');
      }
    } catch (err) {
      setErrorMsg('Compass sensor access failed.');
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      // alpha gives direction relative to magnetic north
      setHeading(Math.round(event.alpha));
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

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
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
          Qibla Finder • {currentLocation.name}
        </div>
      </div>

      {/* Header Info */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Qibla Direction</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Great-circle bearing computed locally</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold font-mono text-blue-600">{qiblaBearing}°</div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">From True North</div>
        </div>
      </div>

      {/* Compass Interactive / Fallback Card */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm text-center flex flex-col items-center justify-center space-y-6">
        {permissionGranted ? (
          <div className="relative w-64 h-64 rounded-full border-4 border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-inner">
            <div 
              className="absolute w-full h-full flex items-center justify-center transition-transform duration-200"
              style={{ transform: `rotate(${heading !== null ? qiblaBearing - heading : qiblaBearing}deg)` }}
            >
              <div className="w-2 h-28 bg-blue-600 rounded-full absolute top-2 shadow-lg flex items-start justify-center">
                <span className="text-[10px] text-white font-bold mt-1">QIBLA</span>
              </div>
            </div>
            <div className="text-sm font-semibold text-slate-500">
              {heading !== null ? `Heading: ${heading}°` : 'Aligning compass...'}
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-md mx-auto py-6">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Compass className="w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Static Numerical Guidance Active</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Compass sensors require active device permission or may be unsupported on desktop browsers. Face <strong className="text-blue-600">{qiblaBearing}° relative to True North</strong> from {currentLocation.name}.
            </p>
            <button
              onClick={requestCompassPermission}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-600/20 transition text-sm flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Request Device Compass Access</span>
            </button>
            {errorMsg && (
              <div className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-2.5 rounded-xl border border-amber-500/30 flex items-center gap-2 justify-center">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};