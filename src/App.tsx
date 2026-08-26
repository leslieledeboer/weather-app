import { useState } from "react";
import { IoLogoGithub } from "react-icons/io5";
import { useGeolocation } from "@/hooks/useGeolocation.ts";
import type { WeatherLocation } from "@/components/SearchBar.tsx";
import { useWeather } from "@/hooks/useWeather.ts";
import SearchBar from "@/components/SearchBar.tsx";
import LocationView from "@/components/LocationView.tsx";
import WeatherView from "@/components/WeatherView.tsx";

const GITHUB_URL = "https://github.com/leslieledeboer/weather-app";

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
    <div className="flex flex-col min-h-dvh px-4 bg-linear-to-b from-sky-top via-sky-middle to-sky-bottom">
      <div className="flex justify-end items-center h-36 pb-18">
        <a className="block sm:hidden p-2 rounded-xl text-ink bg-white/30 hover:bg-white/40 backdrop-blur-md" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
          <IoLogoGithub size={24} />
        </a>
      </div>

      <div className="grow flex flex-col justify-center gap-4 w-full max-w-88 mx-auto">
        <SearchBar onSelectLocation={handleSelectLocation} onDetectLocation={handleDetectLocation} />

        {/* 536px is the loaded state's height, reserved so the layout doesn't jump between states */}
        <div className="flex flex-col gap-4 min-h-134">
          {coordinates ? <WeatherView weather={weather} selectedLocation={selectedLocation} /> : <LocationView geolocation={geolocation} />}
        </div>
      </div>

      <div className="flex justify-center items-center h-36">
        <a className="hidden sm:block text-ink hover:underline" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          View source on GitHub
        </a>
      </div>
    </div>
  );
}