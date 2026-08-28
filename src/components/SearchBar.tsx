import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Search, Locate } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce.ts";
import { useGeocoding } from "@/hooks/useGeocoding.ts";
import type { GeocodingStatus } from "@/hooks/useGeocoding.ts";
import type { GeoCoordinates } from "@/hooks/useGeolocation.ts";

export interface WeatherLocation {
  readonly name: string;
  readonly coords: GeoCoordinates;
}

interface SearchBarProps {
  onSelectLocation: (location: WeatherLocation) => void;
  onDetectLocation: () => void;
}

export default function SearchBar({ onSelectLocation, onDetectLocation }: SearchBarProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [query, setQuery] = useState<string>("");

  const debouncedQuery = useDebounce(query, 300);
  const geocoding = useGeocoding(debouncedQuery);

  const hasResults = showDropdown && geocoding.status === "succeeded" && geocoding.data.length > 0;

  useEffect(() => {
    if (showDropdown) {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setShowDropdown(false);
        }
      };

      document.addEventListener("pointerdown", handleClickOutside);

      return () => {
        document.removeEventListener("pointerdown", handleClickOutside);
      };
    }

  }, [showDropdown]);

  const renderResults = (geocoding: GeocodingStatus): ReactNode => {
    if (geocoding.status === "idle") return;

    if (geocoding.status === "pending") {
      return <p className="absolute z-10 w-full mt-2 ps-9 border border-gray-700 rounded text-left bg-white" role="status">Searching for locations ...</p>;
    }

    if (geocoding.status === "failed") {
      return <p className="absolute z-10 w-full mt-2 ps-9 border border-gray-700 rounded text-left bg-white" role="status">{geocoding.message}</p>;
    }

    if (geocoding.data.length === 0) {
      return <p className="absolute z-10 w-full mt-2 ps-9 border border-gray-700 rounded text-left bg-white" role="status">No locations found.</p>;
    }

    return (
      <ul id="search-results" className="absolute z-10 w-full mt-2 ps-8 pe-8 border border-gray-700 rounded divide-y divide-gray-400 bg-white" role="listbox">
        {geocoding.data.map((result, index) => (
          <li
            id={`option-${result.id}`}
            key={result.id}
            className={`${index === activeIndex ? "bg-gray-300" : "bg-white"} w-full p-1 text-left truncate cursor-pointer`}
            role="option"
            aria-selected={index === activeIndex}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => {
              onSelectLocation({
                name: result.name,
                coords: {
                  latitude: result.latitude,
                  longitude: result.longitude,
                },
              });

              setQuery("");
              setShowDropdown(false);
            }}>
            {result.label}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div ref={dropdownRef}>
      <div className="relative">
        <form onSubmit={(e) => {
          e.preventDefault();

          if (hasResults) {
            const selectedIndex = activeIndex === -1 ? 0 : activeIndex;

            onSelectLocation({
              name: geocoding.data[selectedIndex].name,
              coords: {
                latitude: geocoding.data[selectedIndex].latitude,
                longitude: geocoding.data[selectedIndex].longitude,
              },
            });

            setQuery("");
            setShowDropdown(false);
          }
        }}>
          <span className="absolute inset-y-0 left-0 flex items-center ps-3">
            <Search size={16} aria-hidden="true" />
          </span>

          <label htmlFor="search" className="sr-only">Search by city</label>

          <input
            id="search"
            className="w-full h-12 ps-9 pe-9 border border-gray-700 rounded text-base bg-white"
            type="search"
            name="q"
            value={query}
            placeholder="Search by city"
            role="combobox"
            aria-activedescendant={hasResults && activeIndex !== -1 ? `option-${geocoding.data[activeIndex].id}` : undefined}
            aria-autocomplete="list"
            aria-controls={hasResults ? "search-results" : undefined}
            aria-expanded={hasResults}
            onChange={(e) => {
              setQuery(e.currentTarget.value);
              setShowDropdown(true);
              setActiveIndex(-1);
            }}
            onKeyDown={(e) => {
              if (hasResults) {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveIndex((prev) => (prev + 1) % geocoding.data.length);
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIndex((prev) => (prev <= 0 ? geocoding.data.length - 1 : prev - 1));
                }
              }

              if (showDropdown && e.key === "Escape") {
                e.preventDefault();
                setShowDropdown(false);
                setActiveIndex(-1);
              }
            }} />

          <span className="absolute inset-y-0 right-0 flex items-center pe-3">
            <button className="p-1 rounded-full hover:bg-gray-300" type="button" aria-label="Use current location" onClick={() => {
              onDetectLocation();
              setQuery("");
              setShowDropdown(false);
            }}>
              <Locate size={16} />
            </button>
          </span>
        </form>
      </div>

      <div className="relative">
        {showDropdown && renderResults(geocoding)}
      </div>
    </div>
  );
}