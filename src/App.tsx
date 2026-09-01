import { useState } from "react";
import { IoLogoGithub } from "react-icons/io5";
import { useGeolocation } from "@/hooks/useGeolocation.ts";
import type { WeatherLocation } from "@/components/SearchBar.tsx";
import { useWeather } from "@/hooks/useWeather.ts";
import SearchBar from "@/components/SearchBar.tsx";
import LocationView from "@/components/LocationView.tsx";
import WeatherView from "@/components/WeatherView.tsx";

const GITHUB_URL = "https://github.com/leslieledeboer/weather-app";

type ColorPalette = "day" | "night";

const getInitialPalette = (): ColorPalette => {
  const hours = new Date().getHours();

  return hours >= 6 && hours < 18 ? "day" : "night";
};

export default function App() {
  const [colorPalette, setColorPalette] = useState<ColorPalette>(getInitialPalette);

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

  if (weather.status === "succeeded") {
    const palette = weather.data.current.isDay ? "day" : "night";

    if (colorPalette !== palette) setColorPalette(palette);
  }

  return (
    <div className={`${colorPalette} flex flex-col min-h-dvh px-4 text-ink bg-linear-to-b from-sky-top via-sky-middle to-sky-bottom`}>
      <div className="flex justify-end items-center h-36 pb-18">
        <a className="block sm:hidden p-2 rounded-xl bg-glass-button hover:bg-glass-hover backdrop-blur-md" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
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
        <a className="hidden sm:block hover:underline" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          View source on GitHub
        </a>
      </div>
    </div>
  );
}