import { useRef, useState } from "react";
import { Search, ArrowDown, Download } from "lucide-react";

export default function ToolBar({
  setSearchQuery,
  verifiedFilter,
  setVerifiedFilter,
}) {
  const inputRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFocus = () => inputRef.current.focus();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterSelect = (value) => {
    setVerifiedFilter(value);
    setDropdownOpen(false);
  };

  const filterLabel =
    verifiedFilter === undefined
      ? "All Members"
      : verifiedFilter
      ? "Verified"
      : "Unverified";

  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center gap-3 relative">
      {/* Search box */}
      <div
        className="w-full md:w-auto flex flex-1 items-center gap-2 px-3 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg cursor-pointer"
        onClick={handleFocus}
      >
        <Search className="text-[#6b7280]" size={18} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm w-full sm:w-48 placeholder-[#9ca3af]"
          onChange={handleSearchChange}
        />
      </div>

      {/* Verified Filter dropdown */}
      <div className="relative w-full md:w-auto">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center justify-between gap-2 w-full md:w-auto px-3 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg hover:bg-[#f3f4f6]"
        >
          <p className="text-sm text-[#374151] font-medium">{filterLabel}</p>
          <ArrowDown size={16} className="text-[#6b7280]" />
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 mt-1 w-32 bg-white border border-[#e5e7eb] rounded-lg shadow-md">
            <ul>
              <li
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleFilterSelect(undefined)}
              >
                All Members
              </li>
              <li
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleFilterSelect(true)}
              >
                Verified
              </li>
              <li
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleFilterSelect(false)}
              >
                Unverified
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Export button */}
      <button className="w-full md:w-auto flex items-center justify-center gap-2 px-3 py-2 bg-black border border-black rounded-lg hover:bg-black/90 transition cursor-pointer">
        <Download size={16} className="text-white" />
        <p className="text-white text-sm font-medium">Export</p>
      </button>
    </div>
  );
}
