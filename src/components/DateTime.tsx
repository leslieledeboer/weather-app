export default function DateTime() {
  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const formattedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "numeric", hour12: true });

  return (
    <div className="grid gap-2 p-4 rounded bg-gray-200">
      <p className="text-3xl">{formattedDate}</p>
      <p className="text-6xl">{formattedTime}</p>
    </div>
  );
}