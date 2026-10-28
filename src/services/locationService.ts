export interface CityLocation {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  defaultMethod: string; // e.g., 'MWL', 'ISNA', 'Makkah', 'Egypt', 'Karachi'
}

export const defaultCities: CityLocation[] = [
  // Europe & UK
  { name: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London", defaultMethod: "MWL" },
  { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522, timezone: "Europe/Paris", defaultMethod: "MWL" },
  { name: "Berlin", country: "Germany", latitude: 52.5200, longitude: 13.4050, timezone: "Europe/Berlin", defaultMethod: "MWL" },
  { name: "Istanbul", country: "Turkey", latitude: 41.0082, longitude: 28.9784, timezone: "Europe/Istanbul", defaultMethod: "MWL" },
  
  // Middle East & Africa
  { name: "Makkah", country: "Saudi Arabia", latitude: 21.4225, longitude: 39.8262, timezone: "Asia/Riyadh", defaultMethod: "Makkah" },
  { name: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai", defaultMethod: "MWL" },
  { name: "Cairo", country: "Egypt", latitude: 30.0444, longitude: 31.2357, timezone: "Africa/Cairo", defaultMethod: "Egypt" },
  { name: "Lagos", country: "Nigeria", latitude: 6.5244, longitude: 3.3792, timezone: "Africa/Lagos", defaultMethod: "MWL" },
  { name: "Casablanca", country: "Morocco", latitude: 33.5731, longitude: -7.5898, timezone: "Africa/Casablanca", defaultMethod: "MWL" },
  { name: "Nairobi", country: "Kenya", latitude: -1.2921, longitude: 36.8219, timezone: "Africa/Nairobi", defaultMethod: "MWL" },
  
  // Asia & South Asia
  { name: "Jakarta", country: "Indonesia", latitude: -6.2088, longitude: 106.8456, timezone: "Asia/Jakarta", defaultMethod: "MWL" },
  { name: "Kuala Lumpur", country: "Malaysia", latitude: 3.1390, longitude: 101.6869, timezone: "Asia/Kuala_Lumpur", defaultMethod: "MWL" },
  { name: "Karachi", country: "Pakistan", latitude: 24.8607, longitude: 67.0011, timezone: "Asia/Karachi", defaultMethod: "Karachi" },
  { name: "Lahore", country: "Pakistan", latitude: 31.5204, longitude: 74.3587, timezone: "Asia/Karachi", defaultMethod: "Karachi" },
  { name: "Dhaka", country: "Bangladesh", latitude: 23.8103, longitude: 90.4125, timezone: "Asia/Dhaka", defaultMethod: "Karachi" },
  { name: "Mumbai", country: "India", latitude: 19.0760, longitude: 72.8777, timezone: "Asia/Kolkata", defaultMethod: "Karachi" },
  { name: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo", defaultMethod: "MWL" },
  
  // Americas
  { name: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060, timezone: "America/New_York", defaultMethod: "ISNA" },
  { name: "Chicago", country: "United States", latitude: 41.8781, longitude: -87.6298, timezone: "America/Chicago", defaultMethod: "ISNA" },
  { name: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832, timezone: "America/Toronto", defaultMethod: "ISNA" },
  { name: "São Paulo", country: "Brazil", latitude: -23.5505, longitude: -46.6333, timezone: "America/Sao_Paulo", defaultMethod: "ISNA" },
  
  // Oceania
  { name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney", defaultMethod: "MWL" }
];