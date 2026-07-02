import { useState } from "react";
import type { ReactNode } from "react";
import { Search, Locate } from "lucide-react";
import { useGeocoding } from "@/hooks/useGeocoding.ts";
import type { GeocodingStatus } from "@/hooks/useGeocoding.ts";

export default function SearchBar() {
  const [value, setValue] = useState<string>("");
  const geocoding = useGeocoding(value);

  const renderResults = (geocoding: GeocodingStatus): ReactNode => {
    if (geocoding.status === "idle") return;

    if (geocoding.status === "pending") {
      return <p className="mt-2 ps-9 text-left">Searching for locations ...</p>;
    }

    if (geocoding.status === "failed") {
      return <p className="mt-2 ps-9 text-left">Could not get locations: {geocoding.message}</p>;
    }

    if (geocoding.data.length === 0) {
      return <p className="mt-2 ps-9 text-left">No locations found.</p>;
    }

    return (
      <ul className="mt-2 ps-9 text-left">
        {geocoding.data.map((result) => (
          <li key={result.id}>
            {result.name} ({result.latitude}, {result.longitude})
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="py-2 rounded bg-gray-200">
      <div className="relative max-w-sm mx-auto">
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log(value);
        }}>
          <span className="absolute inset-y-0 left-0 flex items-center ps-3">
            <Search size={16} />
          </span>

          <input onChange={(e) => setValue(e.currentTarget.value)} value={value} type="search" id="search" name="q" placeholder="Search by city or ZIP code" className="w-full py-3 ps-9 pe-9 border rounded text-sm bg-white" />

          <span className="absolute inset-y-0 right-0 flex items-center pe-3">
            <button type="button" className="p-1 rounded-full hover:bg-gray-300"><Locate size={16} /></button>
          </span>
        </form>
      </div>

      <div className="max-w-sm mx-auto">
        {renderResults(geocoding)}
      </div>
    </div>
  );
}