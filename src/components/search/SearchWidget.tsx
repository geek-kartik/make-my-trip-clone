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
  ArrowLeftRight, Calendar as CalendarIcon, Search, AlertCircle 
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
};

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
    <div className="w-full max-w-6xl mx-auto px-4 relative z-20 -mt-8 md:-mt-12">
      {/* Category Tabs */}
      <div className="bg-white rounded-t-2xl shadow-lg border-b border-slate-100 flex items-center justify-between overflow-x-auto px-4 md:px-8 py-3.5 scrollbar-none gap-2">
        <div className="flex items-center gap-1 md:gap-3 w-full justify-between md:justify-start">
          {(homepage?.tabs ?? []).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`flex flex-col items-center gap-1 py-1 px-3 md:px-5 rounded-xl transition-all cursor-pointer relative group ${
                  isActive 
                    ? "text-blue-600 font-extrabold scale-105" 
                    : "text-slate-500 font-semibold"
                }`}
              >
                <div className={`p-2 rounded-full transition-all ${
                  isActive 
                    ? "bg-blue-50 text-blue-600" 
                    : "bg-slate-50 group-hover:bg-slate-100 text-slate-500"
                }`}>
                  {TAB_ICONS[tab.icon]}
                </div>
                <span className="text-[11px] tracking-wide mt-0.5">{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-[-14px] left-0 right-0 h-1.5 bg-blue-600 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Search Panel */}
      <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-2xl p-6 md:p-8 space-y-6">
        {/* Row 1: Trip Type selectors */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            {[
              { id: "oneWay", label: "One Way" },
              { id: "roundTrip", label: "Round Trip" },
              { id: "multiCity", label: "Multi City" },
            ].map((type) => (
              <label key={type.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === type.id}
                  onChange={() => setTripType(type.id as TripType)}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className={`text-xs md:text-sm transition-colors cursor-pointer ${
                  tripType === type.id 
                    ? "font-extrabold text-slate-800" 
                    : "font-semibold text-slate-500 group-hover:text-slate-700"
                }`}>
                  {type.label}
                </span>
              </label>
            ))}
          </div>

          <div className="text-xs font-bold text-blue-600 bg-blue-50/60 px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            {homepage?.hero.alert ?? "Loading flight content"}
          </div>
        </div>

        {/* Row 2: Search Box Grid */}
        <div className="border border-slate-200 rounded-xl grid grid-cols-1 md:grid-cols-12 relative overflow-hidden bg-slate-50">
          {/* FROM selector */}
          <div className="md:col-span-3 bg-white border-b md:border-b-0 md:border-r border-slate-200 relative">
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
              className="absolute right-[-16px] top-[calc(50%-16px)] md:right-[-16px] md:top-[calc(50%-16px)] z-10 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 active:scale-95 transition-all"
              title="Swap From & To"
            >
              <ArrowLeftRight className="h-3.5 w-3.5 rotate-90 md:rotate-0" />
            </button>
          </div>

          {/* TO selector */}
          <div className="md:col-span-3 bg-white border-b md:border-b-0 md:border-r border-slate-200">
            <CitySelector
              type="to"
              value={toCity}
              onSelect={setToCity}
              otherCity={fromCity}
            />
          </div>

          {/* DEPARTURE DATE selector */}
          <div className="md:col-span-2 bg-white border-b md:border-b-0 md:border-r border-slate-200">
            <Popover open={depCalendarOpen} onOpenChange={setDepCalendarOpen}>
              <PopoverTrigger className="w-full text-left cursor-pointer p-4 h-full flex flex-col justify-center hover:bg-blue-50/40 transition-colors focus:outline-none">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  Departure <CalendarIcon className="h-3 w-3 text-slate-400" />
                </span>
                <span className="text-3xl font-extrabold text-slate-800 mt-1 block">
                  {format(departureDate, "dd")}
                </span>
                <span className="text-xs text-slate-500 mt-1 font-semibold truncate block">
                  {format(departureDate, "MMM yy, EEEE")}
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
          <div className="md:col-span-2 bg-white border-b md:border-b-0 md:border-r border-slate-200">
            <Popover open={retCalendarOpen} onOpenChange={setRetCalendarOpen}>
              <PopoverTrigger className="w-full text-left cursor-pointer p-4 h-full flex flex-col justify-center hover:bg-blue-50/40 transition-colors relative focus:outline-none">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  Return <CalendarIcon className="h-3 w-3 text-slate-400" />
                </span>
                {returnDate ? (
                  <>
                    <span className="text-3xl font-extrabold text-slate-800 mt-1 block">
                      {format(returnDate, "dd")}
                    </span>
                    <span className="text-xs text-slate-500 mt-1 font-semibold truncate block">
                      {format(returnDate, "MMM yy, EEEE")}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-extrabold text-slate-400 mt-3.5 block leading-tight">
                      Book Round Trip
                    </span>
                    <span className="text-[10px] text-blue-600 font-bold mt-1 block">
                      Save more on return flight
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
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
              Select A Special Fare:
            </span>
            <div className="flex flex-wrap gap-2">
              {(homepage?.fares ?? []).map((fare) => {
                const isSelected = fareType === fare.id;
                return (
                  <button
                    key={fare.id}
                    onClick={() => setFareType(fare.id)}
                    type="button"
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all border text-left ${
                      isSelected
                        ? "bg-blue-50 border-blue-300 text-blue-700 shadow-sm font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div>{fare.label}</div>
                    <div className={`text-[9px] font-medium mt-0.5 ${
                      isSelected ? "text-blue-500" : "text-slate-400"
                    }`}>
                      {fare.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Big Prominent Search Button */}
          <div className="flex justify-center relative pt-4">
            <button
              onClick={handleSearch}
              type="button"
              className="absolute bottom-[-52px] h-[52px] px-16 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-800 text-white font-black text-xl rounded-full shadow-xl shadow-blue-600/30 active:scale-98 hover:scale-102 hover:shadow-2xl hover:shadow-blue-600/40 transition-all uppercase tracking-widest flex items-center gap-3.5 z-20 cursor-pointer"
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
