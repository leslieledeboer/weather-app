import { useState } from "react";
import type { ReactNode } from "react";
import { useGeolocation } from "@/hooks/useGeolocation.ts";
import type { GeoCoordinates } from "@/hooks/useGeolocation.ts";
import { useWeather } from "@/hooks/useWeather.ts";
import DateTime from "@/components/DateTime.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import HourlyForecast from "@/components/HourlyForecast.tsx";
import CurrentConditions from "@/components/CurrentConditions.tsx";
import Precipitation from "@/components/Precipitation.tsx";
import UVIndex from "@/components/UVIndex.tsx";

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<GeoCoordinates | null>(null);

  const [geolocation, detectGeolocation] = useGeolocation();

  const detectedLocation = geolocation.status === "succeeded" ? geolocation.data : null;

  const coordinates = selectedLocation ?? detectedLocation;

  const weather = useWeather(coordinates);

  let mainContent: ReactNode = null;

  if (!coordinates) {
    if (geolocation.status === "pending") {
      mainContent = <p>Detecting your location ...</p>;
    } else if (geolocation.status === "failed") {
      mainContent = <p>Could not get your location: {geolocation.message}</p>;
    }
  } else {
    if (weather.status === "idle" || weather.status === "pending") {
      mainContent = <p>Loading weather data ...</p>;
    } else if (weather.status === "failed") {
      mainContent = <p>Could not get weather data: {weather.message}</p>;
    } else {
      mainContent = (
        <>
          <HourlyForecast hourly={weather.data.hourly} />
          <CurrentConditions current={weather.data.current} />
          <Precipitation />
          <UVIndex />
        </>
      );
    }
  }

  const handleSelectLocation = (location: GeoCoordinates) => {
    setSelectedLocation(location);
  };

  const handleDetectLocation = () => {
    detectGeolocation();
    setSelectedLocation(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-4 text-center">
      <DateTime />

      <SearchBar onSelectLocation={handleSelectLocation} onDetectLocation={handleDetectLocation} />

      {mainContent}
    </div>
  );
}