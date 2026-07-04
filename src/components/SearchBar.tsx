import { useState } from "react";
import type { ReactNode } from "react";
import { Search, Locate } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce.ts";
import { useGeocoding } from "@/hooks/useGeocoding.ts";
import type { GeocodingStatus } from "@/hooks/useGeocoding.ts";
import type { GeoCoordinates } from "@/hooks/useGeolocation.ts";

interface SearchBarProps {
  onSelectLocation: (location: GeoCoordinates) => void;
}

export default function SearchBar({ onSelectLocation }: SearchBarProps) {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 300);
  const geocoding = useGeocoding(debouncedValue);

  const renderResults = (geocoding: GeocodingStatus): ReactNode => {
    if (geocoding.status === "idle") return;

    if (geocoding.status === "pending") {
      return <p className="absolute w-full mt-2 ps-9 border rounded text-left bg-white">Searching for locations ...</p>;
    }

    if (geocoding.status === "failed") {
      return <p className="absolute w-full mt-2 ps-9 border rounded text-left bg-white">Could not get locations: {geocoding.message}</p>;
    }

    if (geocoding.data.length === 0) {
      return <p className="absolute w-full mt-2 ps-9 border rounded text-left bg-white">No locations found.</p>;
    }

    return (
      <ul className="absolute z-10 w-full mt-2 ps-8 pe-8 border rounded divide-y divide-gray-400 bg-white">
        {geocoding.data.map((result) => (
          <li key={result.id}>
            <button type="button" className="w-full p-1 text-left truncate hover:bg-gray-300" onClick={(_e) => {
              onSelectLocation({
                latitude: result.latitude,
                longitude: result.longitude,
              });
            }}>
              {result.name} ({result.latitude}, {result.longitude})
            </button>
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

          if (geocoding.status === "succeeded" && geocoding.data.length > 0) {
            onSelectLocation({
              latitude: geocoding.data[0].latitude,
              longitude: geocoding.data[0].longitude,
            });
          }
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

      <div className="relative max-w-sm mx-auto">
        {renderResults(geocoding)}
      </div>
    </div>
  );
}