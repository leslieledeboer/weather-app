import type { TimelineEntry } from "@/utils/timelineEntries.ts";
import { Sunrise, Sunset } from "@/assets/icons/static/index.ts";

export default function ForecastTimeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="scrollbar-hidden overflow-x-auto flex gap-4 p-4 border border-glass-edge rounded-lg text-center bg-glass-surface backdrop-blur-xl">
      {entries.map((e, i) => (
        <div key={i} className="flex flex-col shrink-0 justify-center w-20 p-2 rounded-lg bg-sky-middle/70">
          {e.type === "weather" ? <p>{e.time.toFormat("h a")}</p> : <p>{e.time.toFormat("h:mm a")}</p>}
          {e.type === "sunrise" && <Sunrise className="size-full" aria-hidden="true" />}
          {e.type === "sunset" && <Sunset className="size-full" aria-hidden="true" />}
          {e.type === "weather" ? <p>{e.temp}°</p> : <p className="capitalize">{e.type}</p>}
        </div>
      ))}
    </div>
  );
}