import type { TimelineEntry } from "@/utils/timelineEntries.ts";
import TimelineCard from "@/components/TimelineCard.tsx";

export default function ForecastTimeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="scrollbar-hidden overflow-x-auto flex gap-4 p-4 border border-glass-edge rounded-lg text-center bg-glass-surface backdrop-blur-xl">
      {entries.map((e) => <TimelineCard key={e.type + " - " + e.time.toMillis()} entry={e} />)}
    </div>
  );
}