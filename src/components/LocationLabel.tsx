export default function LocationLabel({ name }: { name: string }) {
  return (
    <p className="w-full text-xl font-medium tracking-wide truncate">{name}</p>
  );
}