export default function LocationLabel({ name }: { name: string }) {
  return (
    <div className="p-4 rounded bg-gray-200">
      <p className="text-2xl">{name}</p>
    </div>
  );
}