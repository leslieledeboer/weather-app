import type { CurrentWeather } from "@/hooks/useWeather.ts";

export default function CurrentConditions({ current }: { current: CurrentWeather }) {
  return (
    <div className="p-4 rounded bg-gray-200">
      <p>Temperature: {current.temp}</p>
      <p>Weather Code: {current.code}</p>
      <p>Is Day: {String(current.isDay)}</p>
      <p>Next Sunrise: {current.nextSunrise?.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</p>
      <p>Next Sunset: {current.nextSunset?.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</p>
    </div>
  );
}