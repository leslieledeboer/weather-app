import { DateTime } from "luxon";

export default function Clock() {
  const now = DateTime.now();

  const formattedDate = now.toFormat("EEEE, MMMM d");
  const formattedTime = now.toFormat("hh:mm a");

  return (
    <div className="grid gap-2 p-4 rounded bg-gray-200">
      <p className="text-3xl">{formattedDate}</p>
      <p className="text-6xl">{formattedTime}</p>
    </div>
  );
}