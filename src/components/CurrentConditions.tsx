import type { CurrentWeather } from "@/hooks/useWeather.ts";
import { getWeatherConditionIcon } from "@/utils/weatherConditions.ts";

export default function CurrentConditions({ current }: { current: CurrentWeather }) {
  const { label, icon: Icon } = getWeatherConditionIcon(current.code, current.isDay, "animated");

  return (
    <>
      <div className="flex justify-center items-center size-64">
        <Icon className="size-full" aria-hidden="true" />
      </div>

      <p className="mt-3 mb-2 text-6xl font-semibold leading-none tabular-nums">{current.temp}°F</p>
      <p className="w-full text-xl font-medium tracking-wide truncate">{label}</p>
    </>
  );
}