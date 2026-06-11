"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSearchStore, TripType } from "@/store/useSearchStore";
import CitySelector from "./CitySelector";
import TravelerSelector from "./TravelerSelector";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  Plane, Hotel, Home, Palmtree, Train, Bus, Car, 
  ArrowLeftRight, Calendar as CalendarIcon, Search, AlertCircle,
  MapPinned, FileCheck, Ship, CreditCard, ShieldCheck, CirclePlay
} from "lucide-react";
import { useCities, useHomepageContent } from "@/hooks/useTravelApi";
import type { TravelTabItem } from "@/services/api-types";

const TAB_ICONS: Record<TravelTabItem["icon"], React.ReactNode> = {
  plane: <Plane className="h-5 w-5" />,
  hotel: <Hotel className="h-5 w-5" />,
  home: <Home className="h-5 w-5" />,
  palmtree: <Palmtree className="h-5 w-5" />,
  train: <Train className="h-5 w-5" />,
  bus: <Bus className="h-5 w-5" />,
  car: <Car className="h-5 w-5" />,
  map: <MapPinned className="h-5 w-5" />,
  file: <FileCheck className="h-5 w-5" />,
  ship: <Ship className="h-5 w-5" />,
  card: <CreditCard className="h-5 w-5" />,
  shield: <ShieldCheck className="h-5 w-5" />,
};

const formatMmtDate = (date: Date) => `${format(date, "MMM")}'${format(date, "yy, EEEE")}`;

export default function SearchWidget() {
  const { data: homepage } = useHomepageContent();
  const { data: initialCities = [] } = useCities("");
  const {
    activeTab,
    tripType,
    fromCity,
    toCity,
    departureDate,
    returnDate,
    travelers,
    travelClass,
    fareType,
    setActiveTab,
    setTripType,
    setFromCity,
    setToCity,
    setDepartureDate,
    setReturnDate,
    setTravelers,
    setTravelClass,
    setFareType,
    setIsSearchExecuted,
    swapCities,
  } = useSearchStore();

  const [depCalendarOpen, setDepCalendarOpen] = useState(false);
  const [retCalendarOpen, setRetCalendarOpen] = useState(false);

  useEffect(() => {
    const backendFromCity = initialCities.find((city) => city.code === fromCity.code);
    const backendToCity = initialCities.find((city) => city.code === toCity.code);

    if (backendFromCity && backendFromCity.airport !== fromCity.airport) {
      setFromCity(backendFromCity);
    }
    if (backendToCity && backendToCity.airport !== toCity.airport) {
      setToCity(backendToCity);
    }
  }, [initialCities, fromCity, toCity, setFromCity, setToCity]);

  const handleSearch = () => {
    setIsSearchExecuted(true);
  };

  return (
    <div className="w-full max-w-[1180px] mx-auto px-4 relative z-20 -mt-[545px]">
      {/* Category Tabs */}
      <div className="mx-auto max-w-[1090px] bg-white rounded-[10px] shadow-[0_4px_18px_rgba(0,0,0,0.18)] flex items-center overflow-x-auto px-5 py-2.5 scrollbar-none">
        <div className="flex items-stretch gap-2 w-full justify-between">
          {(homepage?.tabs ?? []).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`min-w-[70px] flex flex-col items-center justify-start gap-1.5 px-1.5 py-1 transition-all cursor-pointer relative group ${
                  isActive 
                    ? "text-[#008cff] font-extrabold" 
                    : "text-[#242424] font-semibold hover:text-[#008cff]"
                }`}
              >
                {tab.id === "cruise" && (
                  <span className="absolute -top-2 rounded-sm bg-[#d64bd8] px-1.5 py-0.5 text-[10px] font-black text-white">
                    new
                  </span>
                )}
                <div className={`transition-all ${
                  isActive 
                    ? "text-[#008cff]" 
                    : "text-[#111] group-hover:text-[#008cff]"
                }`}>
                  {TAB_ICONS[tab.icon]}
                </div>
                <span className="text-[12px] leading-[14px] tracking-[-0.1px]">{tab.label}</span>
                {isActive && (
                  <div className="absolute -bottom-2.5 left-4 right-4 h-[3px] bg-[#008cff] rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Search Panel */}
      <div className="bg-white rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.25)] mt-4 px-5 md:px-6 pt-7 pb-8 space-y-5">
        <div className="flex items-center justify-center gap-5">
          <div className="text-[20px] font-black italic text-[#3158f5]">
            Try <span className="font-black text-[#1b7cff]">myra</span><sup className="ml-1 text-[10px] text-[#00a1ff]">beta</sup>
          </div>
          <button type="button" className="flex h-[50px] w-full max-w-[580px] items-center justify-between rounded-full border-2 border-[#ffe655] bg-white px-5 text-left shadow-[0_2px_9px_rgba(0,0,0,0.12)]">
            <span className="text-sm text-[#5c6570]">
              Try asking <em className="font-semibold text-[#334155]">&quot;Book me a flight from Bangalore to Delhi tomorrow morning&quot;</em>
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#9aa4ad] text-white">
              <CirclePlay className="h-6 w-6 fill-white/40" />
            </span>
          </button>
        </div>
        {/* Row 1: Trip Type selectors */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-7">
            {[
              { id: "oneWay", label: "One Way" },
              { id: "roundTrip", label: "Round Trip" },
              { id: "multiCity", label: "Multi City" },
            ].map((type) => (
              <label key={type.id} className="flex items-center gap-1.5 cursor-pointer group">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === type.id}
                  onChange={() => setTripType(type.id as TripType)}
                  className="w-3.5 h-3.5 accent-[#008cff] cursor-pointer"
                />
                <span className={`text-xs md:text-sm transition-colors cursor-pointer ${
                  tripType === type.id 
                    ? "font-extrabold text-[#111]" 
                    : "font-medium text-[#4a4a4a] group-hover:text-[#111]"
                }`}>
                  {type.label}
                </span>
              </label>
            ))}
          </div>

          <div className="text-[13px] font-medium text-[#333] flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            {homepage?.hero.alert ?? "Loading flight content"}
          </div>
        </div>

        {/* Row 2: Search Box Grid */}
        <div className="border border-[#d8d8d8] rounded-[7px] grid grid-cols-1 md:grid-cols-12 relative overflow-hidden bg-white">
          {/* FROM selector */}
          <div className="md:col-span-3 bg-white border-b md:border-b-0 md:border-r border-[#d8d8d8] relative">
            <CitySelector
              type="from"
              value={fromCity}
              onSelect={setFromCity}
              otherCity={toCity}
            />

            {/* City Swap Button */}
            <button
              onClick={swapCities}
              type="button"
              className="absolute right-[-16px] top-[calc(50%-16px)] md:right-[-16px] md:top-[calc(50%-16px)] z-10 w-8 h-8 rounded-full bg-white border border-[#d8e7fa] shadow-md flex items-center justify-center text-[#008cff] hover:bg-[#eaf5ff] active:scale-95 transition-all"
              title="Swap From & To"
            >
              <ArrowLeftRight className="h-3.5 w-3.5 rotate-90 md:rotate-0" />
            </button>
          </div>

          {/* TO selector */}
          <div className="md:col-span-3 bg-white border-b md:border-b-0 md:border-r border-[#d8d8d8]">
            <CitySelector
              type="to"
              value={toCity}
              onSelect={setToCity}
              otherCity={fromCity}
            />
          </div>

          {/* DEPARTURE DATE selector */}
          <div className="md:col-span-2 bg-white border-b md:border-b-0 md:border-r border-[#d8d8d8]">
            <Popover open={depCalendarOpen} onOpenChange={setDepCalendarOpen}>
              <PopoverTrigger className="w-full text-left cursor-pointer p-4 h-full min-h-[96px] flex flex-col justify-center hover:bg-[#eaf5ff] transition-colors focus:outline-none">
                <span className="text-[13px] font-medium text-[#4a4a4a] flex items-center gap-1.5">
                  Departure <CalendarIcon className="h-3 w-3 text-slate-400" />
                </span>
                <span className="text-[30px] font-black text-[#111] mt-1 block leading-none">
                  {format(departureDate, "dd")}
                </span>
                <span className="text-xs text-[#4a4a4a] mt-1 font-medium truncate block">
                  {formatMmtDate(departureDate)}
                </span>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-0 shadow-2xl rounded-xl" align="start">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={(date) => {
                    if (date) {
                      setDepartureDate(date);
                      setDepCalendarOpen(false);
                    }
                  }}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* RETURN DATE selector */}
          <div className="md:col-span-2 bg-white border-b md:border-b-0 md:border-r border-[#d8d8d8]">
            <Popover open={retCalendarOpen} onOpenChange={setRetCalendarOpen}>
              <PopoverTrigger className="w-full text-left cursor-pointer p-4 h-full min-h-[96px] flex flex-col justify-center hover:bg-[#eaf5ff] transition-colors relative focus:outline-none">
                <span className="text-[13px] font-medium text-[#4a4a4a] flex items-center gap-1.5">
                  Return <CalendarIcon className="h-3 w-3 text-slate-400" />
                </span>
                {returnDate ? (
                  <>
                    <span className="text-[30px] font-black text-[#111] mt-1 block leading-none">
                      {format(returnDate, "dd")}
                    </span>
                    <span className="text-xs text-[#4a4a4a] mt-1 font-medium truncate block">
                      {formatMmtDate(returnDate)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] font-bold text-[#6b7280] mt-2 block leading-tight max-w-[110px]">
                      Tap to add a return date for bigger discounts
                    </span>
                  </>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-0 shadow-2xl rounded-xl" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate || undefined}
                  onSelect={(date) => {
                    if (date) {
                      setReturnDate(date);
                      setTripType("roundTrip");
                      setRetCalendarOpen(false);
                    }
                  }}
                  disabled={{ before: departureDate }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* TRAVELLERS & CLASS selector */}
          <div className="md:col-span-2 bg-white">
            <TravelerSelector
              value={travelers}
              travelClass={travelClass}
              onChange={(t, tc) => {
                setTravelers(t);
                setTravelClass(tc);
              }}
            />
          </div>
        </div>

        {/* Row 3: Fare options & Search button */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-stretch gap-2">
            <span className="flex w-[78px] items-center text-[12px] font-black uppercase leading-[13px] text-[#111]">
              SPECIAL<br />FARES
            </span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {(homepage?.fares ?? []).map((fare) => {
                const isSelected = fareType === fare.id;
                return (
                  <button
                    key={fare.id}
                    onClick={() => setFareType(fare.id)}
                    type="button"
                    className={`min-w-[118px] py-2 px-3 rounded-[6px] text-xs font-semibold transition-all border text-left ${
                      isSelected
                        ? "bg-[#eaf5ff] border-[#008cff] text-[#008cff] shadow-sm font-bold"
                        : "bg-white border-[#d8d8d8] text-[#333] hover:bg-[#f7fbff]"
                    }`}
                  >
                    <div className="font-black">{fare.label}</div>
                    <div className={`text-[9px] font-medium mt-0.5 ${
                      isSelected ? "text-[#008cff]" : "text-[#6b7280]"
                    }`}>
                      {fare.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_130px] gap-3">
            <label className="flex flex-wrap items-center gap-2 rounded-[5px] border border-[#d8d8d8] bg-gradient-to-r from-white via-white to-[#e7f6ff] px-3 py-3 text-[13px] text-[#333]">
              <input type="checkbox" className="h-4 w-4 accent-[#008cff]" />
              <span className="font-bold text-[#111]">Add Price Drop Protection</span>
              <span>If the price drops, we&apos;ll refund the difference.</span>
              <button type="button" className="ml-2 text-[#008cff] text-xs font-bold">View Details</button>
            </label>
            <button type="button" className="rounded-[5px] border border-[#d8d8d8] bg-white px-3 py-3 text-[13px] font-semibold text-[#111]">
              Flight Tracker
            </button>
          </div>

          {/* Big Prominent Search Button */}
          <div className="flex justify-center relative pt-1">
            <button
              onClick={handleSearch}
              type="button"
              className="absolute bottom-[-55px] h-[52px] min-w-[210px] px-16 bg-gradient-to-r from-[#53b2fe] to-[#065af3] hover:from-[#42a8fb] hover:to-[#0055e6] text-white font-black text-[22px] rounded-full shadow-[0_5px_12px_rgba(0,0,0,0.22)] active:scale-98 transition-all uppercase tracking-wide flex items-center justify-center gap-3 z-20 cursor-pointer"
            >
              <Search className="h-5 w-5 stroke-[3px]" />
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
