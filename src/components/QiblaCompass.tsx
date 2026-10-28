import React, { useState, useEffect } from 'react';
import type { CityLocation } from '../services/locationService';
import { ArrowLeft, Compass, AlertCircle, RefreshCw, Navigation } from 'lucide-react';

interface QiblaCompassProps {
  currentLocation: CityLocation;
  onBack: () => void;
}

export const QiblaCompass: React.FC<QiblaCompassProps> = ({ currentLocation, onBack }) => {
  const [heading, setHeading] = useState<number | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Accurate Great-Circle Qibla Bearing calculation from current coordinates to Kaaba
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
    return Math.round((bearing + 360) % 360);
  };

  const qiblaBearing = calculateQiblaBearing(currentLocation.latitude, currentLocation.longitude);

  // Convert bearing degrees to cardinal direction string
  const getCardinalDirection = (deg: number) => {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    return directions[Math.round(deg / 45) % 8];
  };

  // Handle iOS/Android device orientation permission and events
  const requestCompassPermission = async () => {
    try {
      // @ts-ignore - iOS Safari 13+ permission request
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        // @ts-ignore
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientationabsolute', handleOrientation, true);
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setErrorMsg('Permission denied. Using static numerical guidance.');
        }
      } else if ('ondeviceorientation' in window) {
        setPermissionGranted(true);
        window.addEventListener('deviceorientation', handleOrientation, true);
      } else {
        setErrorMsg('Compass sensors not supported on this browser.');
      }
    } catch (err) {
      setErrorMsg('Could not access device sensors.');
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    // @ts-ignore - webkitCompassHeading is specific to iOS Safari for accurate magnetic heading
    const compassHeading = event.webkitCompassHeading !== undefined ? event.webkitCompassHeading : event.alpha;
    if (compassHeading !== null) {
      setHeading(Math.round(compassHeading));
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
    };
  }, []);

  // Compute needle rotation: points towards Qibla relative to phone's current facing heading
  const needleRotation = heading !== null ? (qiblaBearing - heading + 360) % 360 : qiblaBearing;

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
          {currentLocation.name}
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Qibla Direction</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Great-circle heading calculated from your location</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold font-mono text-emerald-600">{qiblaBearing}°</div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">{getCardinalDirection(qiblaBearing)}</div>
        </div>
      </div>

      {/* Compass Interactive Card */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm text-center flex flex-col items-center justify-center space-y-6">
        
        {/* Visual Compass Dial */}
        <div className="relative w-64 h-64 rounded-full border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-900 shadow-inner">
          <span className="absolute top-2 text-xs font-bold text-slate-400">N</span>
          <span className="absolute bottom-2 text-xs font-bold text-slate-400">S</span>
          <span className="absolute left-2 text-xs font-bold text-slate-400">W</span>
          <span className="absolute right-2 text-xs font-bold text-slate-400">E</span>
          
          {/* Rotating Qibla Needle Pointer */}
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

        {/* Status & Permission Control */}
        <div className="space-y-3 w-full max-w-sm">
          {!permissionGranted ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tap below to enable live phone compass rotation in Safari, or align your phone using the static bearing: <strong className="text-emerald-600">{qiblaBearing}° ({getCardinalDirection(qiblaBearing)})</strong>.
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
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 py-2 px-4 rounded-xl inline-block">
              Sensor Active {heading !== null ? `• Phone Heading: ${heading}°` : ''}
            </div>
          )}

          {errorMsg && (
            <div className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-2.5 rounded-xl border border-amber-500/30 flex items-center gap-2 justify-center">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};