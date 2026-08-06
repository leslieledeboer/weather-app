import type { CurrentWeather } from "@/hooks/useWeather.ts";
import { getCondition } from "@/utils/weatherConditions.ts";

export default function CurrentConditions({ current }: { current: CurrentWeather }) {
  return (
    <>
      <p className="mt-3 mb-2 text-6xl font-semibold leading-none tabular-nums">{current.temp}°F</p>
      <p className="text-xl font-medium tracking-wide">{getCondition(current.code, current.isDay).label}</p>
    </>
  );
}