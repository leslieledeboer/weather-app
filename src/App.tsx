import { useState } from "react";
import type { ReactNode } from "react";
import { useGeolocation } from "@/hooks/useGeolocation.ts";
import type { GeoCoordinates } from "@/hooks/useGeolocation.ts";
import { useWeather } from "@/hooks/useWeather.ts";
import type { Weather } from "@/hooks/useWeather.ts";
import SearchBar from "@/components/SearchBar.tsx";
import HourlyForecast from "@/components/HourlyForecast.tsx";

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
      mainContent = <WeatherContent data={weather.data} />;
    }
  }

  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const formattedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "numeric", hour12: true });

  const handleSelectLocation = (location: GeoCoordinates) => {
    setSelectedLocation(location);
  };

  const handleDetectLocation = () => {
    detectGeolocation();
    setSelectedLocation(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-4 text-center">
      <div className="py-1 rounded text-3xl bg-gray-200">
        {formattedDate}
      </div>

      <div className="py-1 rounded text-6xl bg-gray-200">
        {formattedTime}
      </div>

      <SearchBar onSelectLocation={handleSelectLocation} onDetectLocation={handleDetectLocation} />

      {mainContent}
    </div>
  );
}

function WeatherContent({ data }: { data: Weather }) {
  return (
    <>
      <HourlyForecast hourly={data.hourly} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 p-4 rounded bg-gray-200">
        <div className="p-4 rounded bg-gray-400">
          <p>Temperature: {data.currentTemp}</p>
          <p>Weather Code: {data.currentCode}</p>
          <p>Is Day: {String(data.isDay)}</p>
          <p>Next Sunrise: {data.sunrise?.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</p>
          <p>Next Sunset: {data.sunset?.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</p>
        </div>

        <div className="p-4 rounded bg-gray-400">

        </div>

        <div className="p-4 rounded bg-gray-400">

        </div>
      </div>
    </>
  );
}