import type { CurrentWeather } from "@/hooks/useWeather.ts";
import { getCondition } from "@/utils/weatherConditions.ts";

export default function CurrentConditions({ current }: { current: CurrentWeather }) {
  return (
    <div className="mb-8 text-center text-slate-900">
      <p className="mb-4 text-6xl">{current.temp}°F</p>
      <p>{getCondition(current.code, current.isDay).label}</p>
    </div>
  );
}