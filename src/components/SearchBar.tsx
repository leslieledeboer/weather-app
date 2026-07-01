import { Search, Locate } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="py-2 rounded bg-gray-200">
      <div className="relative max-w-sm mx-auto">
        <span className="absolute inset-y-0 left-0 flex items-center ps-3">
          <Search size={16} />
        </span>

        <input type="search" id="search" name="q" placeholder="Search by city or ZIP code" className="w-full py-3 ps-9 pe-9 border rounded text-sm bg-white" />

        <span className="absolute inset-y-0 right-0 flex items-center pe-3">
          <button type="button" className="p-1 rounded-full hover:bg-gray-300"><Locate size={16} /></button>
        </span>
      </div>
    </div>
  );
}