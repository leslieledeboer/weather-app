import type { HourlyWeather } from "@/hooks/useWeather.ts";

export default function HourlyForecast({ hourly }: { hourly: HourlyWeather[] }) {
  return (
    <div className="scrollbar-hidden overflow-x-auto flex gap-4 p-4 border border-white/30 rounded-lg text-center text-ink bg-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      {hourly.map((h, i) => (
        <div key={i} className="aspect-square flex flex-col gap-2 shrink-0 justify-center w-16 rounded-lg bg-sky-middle/70">
          <p>{h.time.toLocaleTimeString("en-US", { hour: "numeric", hour12: true })}</p>
          <p>{h.temp}°</p>
        </div>
      ))}
    </div>
  );
}