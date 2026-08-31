import type { HourlyWeather } from "@/hooks/useWeather.ts";

export default function HourlyForecast({ hourly }: { hourly: HourlyWeather[] }) {
  return (
    <div className="scrollbar-hidden overflow-x-auto flex gap-4 p-4 border border-glass rounded-lg text-center text-ink bg-glass shadow-[0_8px_32px_var(--color-shadow)] backdrop-blur-xl">
      {hourly.map((h, i) => (
        <div key={i} className="aspect-square flex flex-col gap-2 shrink-0 justify-center w-16 rounded-lg bg-tile">
          <p>{h.time.toLocaleTimeString("en-US", { hour: "numeric", hour12: true })}</p>
          <p>{h.temp}°</p>
        </div>
      ))}
    </div>
  );
}