import { useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation.ts";
import type { WeatherLocation } from "@/components/SearchBar.tsx";
import { useWeather } from "@/hooks/useWeather.ts";
import SearchBar from "@/components/SearchBar.tsx";
import LocationView from "@/components/LocationView.tsx";
import WeatherView from "@/components/WeatherView.tsx";

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation | null>(null);

  const [geolocation, detectGeolocation] = useGeolocation();

  const detectedLocation = geolocation.status === "succeeded" ? geolocation.data : null;

  const coordinates = selectedLocation ? selectedLocation.coords : detectedLocation;

  const weather = useWeather(coordinates);

  const handleSelectLocation = (location: WeatherLocation) => {
    setSelectedLocation(location);
  };

  const handleDetectLocation = () => {
    detectGeolocation();
    setSelectedLocation(null);
  };

  return (
    <div className="flex justify-center items-center min-h-dvh bg-linear-to-b from-sky-top via-sky-middle to-sky-bottom">
      <div className="flex flex-col gap-4 max-w-sm mx-auto p-4">
        <SearchBar onSelectLocation={handleSelectLocation} onDetectLocation={handleDetectLocation} />

        {coordinates ? <WeatherView weather={weather} selectedLocation={selectedLocation} /> : <LocationView geolocation={geolocation} />}
      </div>
    </div>
  );
}