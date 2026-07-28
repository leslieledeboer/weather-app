import type { CurrentWeather } from "@/hooks/useWeather.ts";

export default function CurrentConditions({ current }: { current: CurrentWeather }) {
  return (
    <div className="p-4 rounded bg-gray-200">
      <p className="text-2xl">{current.temp}°F</p>
      <p>Next Sunrise: {current.nextSunrise?.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</p>
      <p>Next Sunset: {current.nextSunset?.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</p>
    </div>
  );
}