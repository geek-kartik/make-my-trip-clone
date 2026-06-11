"use client";

import React, { useState, useRef, useEffect } from "react";
import { TravelClass } from "@/store/useSearchStore";
import { ChevronDown, Check } from "lucide-react";

interface TravelerSelectorProps {
  value: {
    adults: number;
    children: number;
    infants: number;
  };
  travelClass: TravelClass;
  onChange: (
    travelers: { adults: number; children: number; infants: number },
    travelClass: TravelClass
  ) => void;
}

const CLASS_OPTIONS: { label: string; value: TravelClass }[] = [
  { label: "Economy", value: "economy" },
  { label: "Premium Economy", value: "premiumEconomy" },
  { label: "Business", value: "business" },
  { label: "First Class", value: "firstClass" },
];

export default function TravelerSelector({ value, travelClass, onChange }: TravelerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempAdults, setTempAdults] = useState(value.adults);
  const [tempChildren, setTempChildren] = useState(value.children);
  const [tempInfants, setTempInfants] = useState(value.infants);
  const [tempClass, setTempClass] = useState<TravelClass>(travelClass);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync state with store updates (e.g., reset)
  useEffect(() => {
    setTempAdults(value.adults);
    setTempChildren(value.children);
    setTempInfants(value.infants);
    setTempClass(travelClass);
  }, [value, travelClass, isOpen]);

  const handleApply = () => {
    onChange(
      {
        adults: tempAdults,
        children: tempChildren,
        infants: tempInfants,
      },
      tempClass
    );
    setIsOpen(false);
  };

  const renderSelectorRow = (
    title: string,
    subtitle: string,
    currentValue: number,
    maxValue: number,
    setValue: (val: number) => void,
    minValue: number = 0
  ) => {
    const options = Array.from({ length: maxValue - minValue + 1 }, (_, i) => minValue + i);
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-bold text-slate-800">{title}</span>
          <span className="text-xs text-slate-400 font-medium">{subtitle}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {options.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setValue(val)}
              className={`h-8 min-w-[32px] px-2 rounded-md text-xs font-bold transition-all border ${
                currentValue === val
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {val === maxValue && val >= 9 ? "9+" : val === maxValue && val >= 6 ? "6+" : val}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer p-4 min-h-[96px] h-full flex flex-col justify-center hover:bg-[#eaf5ff] transition-colors"
      >
        <span className="text-[13px] font-medium text-[#4a4a4a] flex items-center gap-1.5">
          Travellers & Class <ChevronDown className="h-3 w-3 text-slate-400" />
        </span>
        <span className="text-[29px] font-black text-[#111] mt-1 block truncate leading-none">
          {value.adults + value.children + value.infants}{" "}
          <span className="text-[17px] font-black text-[#111]">
            Traveller
          </span>
        </span>
        <span className="text-xs text-[#4a4a4a] mt-2 font-medium truncate block">
          {CLASS_OPTIONS.find((c) => c.value === travelClass)?.label}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-[102%] right-0 w-[380px] bg-white border border-slate-100 rounded-xl shadow-2xl z-50 p-5 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
            Select Travellers
          </div>

          {renderSelectorRow("Adults", "12 yrs & above", tempAdults, 9, setTempAdults, 1)}
          {renderSelectorRow("Children", "2 - 12 yrs", tempChildren, 6, setTempChildren)}
          {renderSelectorRow("Infants", "Under 2 yrs", tempInfants, 6, setTempInfants)}

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 pt-4 pb-1">
              Select Travel Class
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CLASS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTempClass(option.value)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold text-left border flex items-center justify-between transition-colors ${
                    tempClass === option.value
                      ? "bg-blue-50 border-blue-200 text-blue-700 font-semibold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {option.label}
                  {tempClass === option.value && <Check className="h-3 w-3 text-blue-600 stroke-[3px]" />}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-end">
            <button
              onClick={handleApply}
              type="button"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all uppercase tracking-wider"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
