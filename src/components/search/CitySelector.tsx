"use client";

import React, { useState, useRef, useEffect } from "react";
import { City } from "@/store/useSearchStore";
import { Search } from "lucide-react";
import { useCities } from "@/hooks/useTravelApi";

interface CitySelectorProps {
  type: "from" | "to";
  value: City;
  onSelect: (city: City) => void;
  otherCity: City;
}

export default function CitySelector({ type, value, onSelect, otherCity }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: cities = [], isLoading, isError } = useCities(searchQuery, otherCity);

  const groupedCities = cities.reduce<Record<string, City[]>>((groups, city) => {
    const group = searchQuery ? "Search Results" : city.group ?? "Popular Cities";
    return {
      ...groups,
      [group]: [...(groups[group] ?? []), city],
    };
  }, {});

  const orderedGroups = searchQuery
    ? ["Search Results"]
    : ["Visa-Free/Visa-on-Arrival Destinations", "E-Visa Destinations", "Popular Cities"];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city: City) => {
    onSelect(city);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer p-4 min-h-[96px] h-full flex flex-col justify-center hover:bg-[#eaf5ff] transition-colors"
      >
        <span className="text-[13px] font-medium text-[#4a4a4a]">
          {type === "from" ? "From" : "To"}
        </span>
        <span className="text-[29px] font-black text-[#111] mt-1 block truncate leading-none">
          {value.name}
        </span>
        <span className="text-xs text-[#4a4a4a] mt-2 font-medium truncate block">
          {value.code}, {value.airport}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-[100%] left-0 w-[348px] bg-white border border-[#c8d7ea] rounded-[3px] shadow-[0_4px_14px_rgba(0,0,0,0.24)] z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="grid grid-cols-2 border-b border-[#d8e5f2] text-[13px] font-semibold">
            <button
              type="button"
              className={`h-9 text-left px-4 ${type === "from" ? "bg-[#eaf5ff] text-[#008cff]" : "bg-white text-[#333]"}`}
            >
              From
            </button>
            <button
              type="button"
              className={`h-9 text-left px-4 ${type === "to" ? "bg-[#eaf5ff] text-[#008cff]" : "bg-white text-[#333]"}`}
            >
              To
            </button>
          </div>

          <div className="relative flex h-[38px] items-center border-b border-[#e5e7eb] px-3 bg-white">
            <Search className="h-4 w-4 text-[#6b7280] mr-2" />
            <input
              type="text"
              placeholder={type === "from" ? "From" : "To"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[13px] w-full outline-none text-[#111] placeholder-[#4a4a4a] font-medium"
              autoFocus
            />
          </div>

          <div className="max-h-[360px] overflow-y-auto custom-scrollbar p-3">
            {isLoading ? (
              <div className="text-center py-6 text-sm text-slate-400 font-medium">
                Loading cities from backend...
              </div>
            ) : isError ? (
              <div className="text-center py-6 text-sm text-red-400 font-medium">
                Unable to load cities. Check the FastAPI service.
              </div>
            ) : cities.length > 0 ? (
              <div className="space-y-4">
                {orderedGroups
                  .filter((group) => groupedCities[group]?.length)
                  .map((group) => (
                    <section key={group}>
                      <h3 className="mb-2 text-[12px] font-black text-[#111]">
                        {group}
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {groupedCities[group].map((city) => (
                          <button
                            key={city.code}
                            onClick={() => handleSelect(city)}
                            type="button"
                            title={`${city.name}, ${city.country} - ${city.airport}`}
                            className="min-h-[34px] rounded-[5px] border border-[#d8d8d8] bg-white px-2 py-1 text-center text-[12px] font-medium text-[#111] shadow-sm transition-colors hover:border-[#008cff] hover:bg-[#eaf5ff] hover:text-[#008cff]"
                          >
                            <span className="block truncate">
                              {city.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </section>
                  ))}
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-slate-400 font-medium">
                No matching cities found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
