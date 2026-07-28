import type { HourlyWeather } from "@/hooks/useWeather.ts";

export default function HourlyForecast({ hourly }: { hourly: HourlyWeather[] }) {
  return (
    <div className="scrollbar-hidden overflow-x-auto flex gap-6 p-4 rounded bg-gray-200">
      {hourly.map((h, i) => (
        <div key={i} className="aspect-square flex flex-col shrink-0 justify-center w-24 rounded bg-gray-400">
          <p>{h.time.toLocaleTimeString("en-US", { hour: "numeric", hour12: true })}</p>
          <p>{h.temp}°</p>
        </div>
      ))}
    </div>
  );
}