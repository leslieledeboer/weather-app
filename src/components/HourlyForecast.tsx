import type { HourlyWeather } from "@/hooks/useWeather.ts";

export default function HourlyForecast({ hourly }: { hourly: HourlyWeather[] }) {
  return (
    <div className="scrollbar-hidden overflow-x-auto flex gap-4 p-4 border border-glass-edge rounded-lg text-center bg-glass-surface backdrop-blur-xl">
      {hourly.map((h, i) => (
        <div key={i} className="aspect-square flex flex-col gap-2 shrink-0 justify-center w-16 rounded-lg bg-sky-middle/70">
          <p>{h.time.toLocaleTimeString("en-US", { hour: "numeric", hour12: true })}</p>
          <p>{h.temp}°</p>
        </div>
      ))}
    </div>
  );
}