import type { TimelineEntry } from "@/utils/timelineEntries.ts";
import { getSolarEvent } from "@/utils/solarEvents.ts";

export default function TimelineCard({ entry }: { entry: TimelineEntry }) {
  if (entry.type === "weather") {
    return (
      <div className="flex flex-col shrink-0 justify-center w-20 p-2 rounded-lg bg-sky-middle/70">
        <p>{entry.time.toFormat("h a")}</p>
        <p>{entry.temp}°</p>
      </div>
    );
  }

  const { label: label, icon: Icon } = getSolarEvent(entry.type);

  return (
    <div className="flex flex-col shrink-0 justify-center w-20 p-2 rounded-lg bg-sky-middle/70">
      <p>{entry.time.toFormat("h:mm a")}</p>
      <Icon className="size-full" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}