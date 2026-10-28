import React, { useState, useEffect, useCallback } from 'react';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, Compass, AlertCircle, RefreshCw, Navigation, ShieldCheck } from 'lucide-react';

interface QiblaCompassProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const QiblaCompass: React.FC<QiblaCompassProps> = ({ currentLocation, onBack }) => {
  const [heading, setHeading] = useState<number | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Rigorous Great-Circle Initial Bearing (Forward Azimuth) Calculation
  const calculateQiblaBearing = useCallback((lat: number, lon: number): number => {
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const toDeg = (rad: number) => (rad * 180) / Math.PI;

    const phi1 = toRad(lat);
    const phi2 = toRad(kaabaLat);
    const deltaLambda = toRad(kaabaLon - lon);

    const y = Math.sin(deltaLambda) * Math.cos(phi2);
    const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

    const theta = Math.atan2(y, x);
    let bearing = toDeg(theta);

    // Normalize to [0, 360) degrees
    return Math.round((bearing + 360) % 360);
  }, []);

  const qiblaBearing = calculateQiblaBearing(currentLocation.latitude, currentLocation.longitude);

  // 2. Convert bearing degrees to cardinal string
  const getCardinalDirection = (deg: number): string => {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    return directions[Math.round(deg / 45) % 8];
  };

  // 3. Handle Sensor Permissions & Event Listeners
  const requestCompassPermission = async () => {
    setErrorMsg(null);
    try {
      // @ts-ignore - iOS Safari 13+ permission API check
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        // @ts-ignore
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setErrorMsg('Compass permission denied by user. Using static bearing mode.');
        }
      } else if ('ondeviceorientation' in window) {
        setPermissionGranted(true);
        window.addEventListener('deviceorientation', handleOrientation, true);
      } else {
        setErrorMsg('Device orientation sensors are not supported on this browser.');
      }
    } catch (err) {
      setErrorMsg('Failed to initialize device orientation sensors.');
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    // Prioritize iOS webkitCompassHeading, fallback to absolute or alpha Z-axis rotation
    // @ts-ignore
    const compassHeading = event.webkitCompassHeading !== undefined ? event.webkitCompassHeading : event.alpha;
    
    if (compassHeading !== null && compassHeading !== undefined) {
      setHeading(Math.round(compassHeading));
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // 4. Compute needle rotation: Qibla bearing relative to current phone heading
  // Formula: needle points towards Qibla as the phone rotates
  const needleRotation = heading !== null ? (qiblaBearing - heading + 360) % 360 : qiblaBearing;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 pb-24 animate-in fade-in duration-300">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Geodesic Accuracy • {currentLocation.name}</span>
        </div>
      </div>

      {/* Header Info Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Qibla Direction Finder</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Great-circle initial bearing relative to True North</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold font-mono text-emerald-600">{qiblaBearing}°</div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">{getCardinalDirection(qiblaBearing)}</div>
        </div>
      </div>

      {/* Compass Interactive / Fallback Display Card */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs text-center flex flex-col items-center justify-center space-y-6">
        
        {/* Visual Compass Dial */}
        <div className="relative w-64 h-64 rounded-full border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-900 shadow-inner">
          <span className="absolute top-3 text-xs font-bold text-slate-400">N</span>
          <span className="absolute bottom-3 text-xs font-bold text-slate-400">S</span>
          <span className="absolute left-3 text-xs font-bold text-slate-400">W</span>
          <span className="absolute right-3 text-xs font-bold text-slate-400">E</span>
          
          {/* Rotating Qibla Arrow Pointer */}
          <div 
            className="absolute w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          >
            <div className="w-1.5 h-32 bg-emerald-600 rounded-full absolute top-3 shadow-lg flex flex-col items-center">
              <div className="w-3 h-3 bg-emerald-700 rounded-full -top-1 absolute shadow"></div>
              <Navigation className="w-4 h-4 text-white absolute top-2 fill-white" />
            </div>
          </div>
          <div className="w-4 h-4 bg-slate-800 dark:bg-slate-200 rounded-full z-10 shadow"></div>
        </div>

        {/* Status & Controls */}
        <div className="space-y-3 w-full max-w-sm">
          {!permissionGranted ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                To use live phone sensors in Safari/Chrome, tap below. Otherwise, face <strong className="text-emerald-600">{qiblaBearing}° ({getCardinalDirection(qiblaBearing)})</strong> from True North.
              </p>
              <button
                onClick={requestCompassPermission}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg shadow-emerald-600/20 transition text-sm flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Enable Live Compass Sensors</span>
              </button>
            </div>
          ) : (
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 py-2.5 px-4 rounded-xl inline-block">
              Sensor Active {heading !== null ? `• Phone Heading: ${heading}°` : '• Calibrating...'}
            </div>
          )}

          {errorMsg && (
            <div className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-500/30 flex items-center gap-2 justify-center">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}