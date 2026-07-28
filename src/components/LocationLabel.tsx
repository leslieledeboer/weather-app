export default function LocationLabel({ name }: { name: string }) {
  return (
    <div className="mt-4 mb-4 text-center text-slate-900">
      <p className="text-2xl">{name}</p>
    </div>
  );
}