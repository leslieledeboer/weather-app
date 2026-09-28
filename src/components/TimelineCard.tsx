import type { TimelineEntry } from "@/utils/timelineEntries.ts";
import { getWeatherCondition } from "@/utils/weatherConditions.ts";
import { getSolarEvent } from "@/utils/solarEvents.ts";

export default function TimelineCard({ entry }: { entry: TimelineEntry }) {
  if (entry.type === "weather") {
    const { label: label, icon: Icon } = getWeatherCondition(entry.code, entry.isDay, "static");

    return (
      <div className="flex flex-col shrink-0 gap-1 justify-center items-center w-20 p-2 rounded-lg bg-sky-middle/70">
        <p>{entry.time.toFormat("h a")}</p>
        <Icon className="size-10" role="img" aria-label={label} />
        <p>{entry.temp}°</p>
      </div>
    );
  }

  const { label: label, icon: Icon } = getSolarEvent(entry.type);

  return (
    <div className="flex flex-col shrink-0 gap-1 justify-center items-center w-20 p-2 rounded-lg bg-sky-middle/70">
      <p>{entry.time.toFormat("h:mm a")}</p>
      <Icon className="size-10 scale-110" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}