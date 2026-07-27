import { useState } from "react";
import type { ReactNode } from "react";
import { useGeolocation } from "@/hooks/useGeolocation.ts";
import type { WeatherLocation } from "@/components/SearchBar.tsx";
import { useWeather } from "@/hooks/useWeather.ts";
import SearchBar from "@/components/SearchBar.tsx";
import LocationLabel from "@/components/LocationLabel.tsx";
import HourlyForecast from "@/components/HourlyForecast.tsx";
import CurrentConditions from "@/components/CurrentConditions.tsx";

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation | null>(null);

  const [geolocation, detectGeolocation] = useGeolocation();

  const detectedLocation = geolocation.status === "succeeded" ? geolocation.data : null;

  const coordinates = selectedLocation ? selectedLocation.coords : detectedLocation;

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
          <LocationLabel name={selectedLocation ? selectedLocation.name : "Current Location"} />
          <HourlyForecast hourly={weather.data.hourly} />
          <CurrentConditions current={weather.data.current} />
        </>
      );
    }
  }

  const handleSelectLocation = (location: WeatherLocation) => {
    setSelectedLocation(location);
  };

  const handleDetectLocation = () => {
    detectGeolocation();
    setSelectedLocation(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-4 text-center">
      <SearchBar onSelectLocation={handleSelectLocation} onDetectLocation={handleDetectLocation} />

      {mainContent}
    </div>
  );
}