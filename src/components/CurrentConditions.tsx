import type { CurrentWeather } from "@/hooks/useWeather.ts";
import { getCondition } from "@/utils/weatherConditions.ts";

export default function CurrentConditions({ current }: { current: CurrentWeather }) {
  const { label: conditionLabel, icon: ConditionIcon } = getCondition(current.code, current.isDay);

  return (
    <>
      <div className="flex justify-center items-center size-64">
        <ConditionIcon className="size-full text-ink" aria-hidden="true" />
      </div>

      <p className="mt-3 mb-2 text-6xl font-semibold leading-none tabular-nums">{current.temp}°F</p>
      <p className="w-full text-xl font-medium tracking-wide truncate">{conditionLabel}</p>
    </>
  );
}