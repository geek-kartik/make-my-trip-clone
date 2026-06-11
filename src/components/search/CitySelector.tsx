"use client";

import React, { useState, useRef, useEffect } from "react";
import { City } from "@/store/useSearchStore";
import { Search, Plane, Landmark } from "lucide-react";
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
        <div className="absolute top-[102%] left-0 w-[420px] bg-white border border-slate-100 rounded-xl shadow-2xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="relative mb-3 flex items-center border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <Search className="h-4 w-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder={type === "from" ? "From where?" : "To where?"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm w-full outline-none text-slate-800 placeholder-slate-400 font-medium"
              autoFocus
            />
          </div>

          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            {searchQuery ? "Search Results" : "Popular Cities"}
          </div>

          <div className="max-h-[300px] overflow-y-auto custom-scrollbar space-y-1">
            {isLoading ? (
              <div className="text-center py-6 text-sm text-slate-400 font-medium">
                Loading cities from backend...
              </div>
            ) : isError ? (
              <div className="text-center py-6 text-sm text-red-400 font-medium">
                Unable to load cities. Check the FastAPI service.
              </div>
            ) : cities.length > 0 ? (
              cities.map((city) => (
                <button
                  key={city.code}
                  onClick={() => handleSelect(city)}
                  type="button"
                  className="w-full text-left flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors flex items-center justify-center">
                      {city.country === "India" ? (
                        <Plane className="h-4 w-4 rotate-45" />
                      ) : (
                        <Landmark className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        {city.name}, {city.country}
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1 py-0.5 rounded font-semibold uppercase group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                          {city.country === "India" ? "Domestic" : "Intl"}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium truncate max-w-[240px]">
                        {city.airport}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-100 group-hover:border-blue-100 group-hover:text-blue-600 group-hover:bg-blue-50/50 transition-colors">
                      {city.code}
                    </span>
                  </div>
                </button>
              ))
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
