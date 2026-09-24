import type { WeatherStatus } from "@/hooks/useWeather.ts";
import type { WeatherLocation } from "@/components/SearchBar.tsx";
import LocationLabel from "@/components/LocationLabel.tsx";
import CurrentConditions from "@/components/CurrentConditions.tsx";
import ForecastTimeline from "@/components/ForecastTimeline.tsx";

export default function WeatherView({ weather, selectedLocation }: { weather: WeatherStatus, selectedLocation: WeatherLocation | null }) {
  if (weather.status === "idle" || weather.status === "pending") {
    return <p className="text-center text-balance">Loading weather data ...</p>;
  } else if (weather.status === "failed") {
    return <p className="text-center text-balance">{weather.message}</p>;
  } else {
    return (
      <>
        <div className="flex flex-col items-center p-4 text-center">
          <LocationLabel name={selectedLocation ? selectedLocation.name : "Current Location"} />
          <CurrentConditions current={weather.data.current} />
        </div>

        <ForecastTimeline hourly={weather.data.hourly} />
      </>
    );
  }
}