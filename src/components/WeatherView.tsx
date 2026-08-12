import type { WeatherStatus } from "@/hooks/useWeather.ts";
import type { WeatherLocation } from "@/components/SearchBar.tsx";
import LocationLabel from "@/components/LocationLabel.tsx";
import CurrentConditions from "@/components/CurrentConditions.tsx";
import HourlyForecast from "@/components/HourlyForecast.tsx";

export default function WeatherView({ weather, selectedLocation }: { weather: WeatherStatus, selectedLocation: WeatherLocation | null }) {
    if (weather.status === "idle" || weather.status === "pending") {
        return <p className="text-center text-balance">Loading weather data ...</p>;
    } else if (weather.status === "failed") {
        return <p className="text-center text-balance">{weather.message}</p>;
    } else {
        return (
            <>
                <div className="flex flex-col items-center p-4 text-center text-ink">
                    <LocationLabel name={selectedLocation ? selectedLocation.name : "Current Location"} />
                    <CurrentConditions current={weather.data.current} />
                </div>

                <HourlyForecast hourly={weather.data.hourly} />
            </>
        );
    }
}