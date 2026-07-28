export default function LocationLabel({ name }: { name: string }) {
  return (
    <div className="mt-4 mb-4 text-center text-white/80">
      <p className="text-2xl">{name}</p>
    </div>
  );
}