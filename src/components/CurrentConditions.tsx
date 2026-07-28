import type { CurrentWeather } from "@/hooks/useWeather.ts";

export default function CurrentConditions({ current }: { current: CurrentWeather }) {
  return (
    <div className="mb-8 text-center text-slate-900">
      <p className="mb-4 text-6xl">{current.temp}°F</p>
      <p>Next Sunrise: {current.nextSunrise?.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</p>
      <p>Next Sunset: {current.nextSunset?.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</p>
    </div>
  );
}