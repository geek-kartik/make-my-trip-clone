"use client";

import React, { useState, useEffect } from "react";
import { useSearchStore, TravelClass } from "@/store/useSearchStore";
import { getFlights, Flight } from "@/data/mockData";
import { format } from "date-fns";
import { 
  ArrowLeft, Search, Filter, SlidersHorizontal, ArrowUpDown, 
  Plane, ChevronRight, Loader2, Sparkles, CheckCircle2 
} from "lucide-react";

export default function FlightResults() {
  const {
    fromCity,
    toCity,
    departureDate,
    returnDate,
    travelers,
    travelClass,
    fareType,
    setIsSearchExecuted,
  } = useSearchStore();

  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<Flight[]>([]);
  
  // Filters State
  const [stopFilter, setStopFilter] = useState<number | null>(null); // null = all, 0 = non-stop, 1 = 1 stop
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<"price" | "duration" | "departure">("price");

  // Booking Simulation
  const [bookingFlight, setBookingFlight] = useState<Flight | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    // Simulate API fetch delay
    setLoading(true);
    const timer = setTimeout(() => {
      const results = getFlights(fromCity.code, toCity.code, travelClass);
      setFlights(results);
      
      // Initialize max price filter from results
      if (results.length > 0) {
        const highestPrice = Math.max(...results.map(f => f.price));
        setMaxPrice(highestPrice + 1000);
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [fromCity, toCity, travelClass]);

  const uniqueAirlines = Array.from(new Set(flights.map(f => f.airline)));

  const handleAirlineToggle = (airline: string) => {
    if (selectedAirlines.includes(airline)) {
      setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
    } else {
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  const handleBookFlight = (flight: Flight) => {
    setBookingFlight(flight);
    // Simulate booking process
    setTimeout(() => {
      setBookingSuccess(true);
    }, 2000);
  };

  const closeBooking = () => {
    setBookingFlight(null);
    setBookingSuccess(false);
  };

  // Filter & Sort flights
  const filteredFlights = flights
    .filter(f => {
      // Stop Filter
      if (stopFilter !== null && f.stops !== stopFilter) return false;
      // Airline Filter
      if (selectedAirlines.length > 0 && !selectedAirlines.includes(f.airline)) return false;
      // Price Filter
      if (f.price > maxPrice) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "duration") {
        const getMins = (durStr: string) => {
          const hours = parseInt(durStr.match(/(\d+)h/)?.[1] || "0");
          const mins = parseInt(durStr.match(/(\d+)m/)?.[1] || "0");
          return hours * 60 + mins;
        };
        return getMins(a.duration) - getMins(b.duration);
      }
      if (sortBy === "departure") {
        return a.departureTime.localeCompare(b.departureTime);
      }
      return 0;
    });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Top Bar / Search Params Summary */}
      <div className="bg-[#0a2240] text-white p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg mb-6 border border-blue-900/30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchExecuted(false)}
            type="button"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            title="Go Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-base md:text-lg font-black tracking-tight">
              <span>{fromCity.name}</span>
              <ChevronRight className="h-4 w-4 text-blue-400 stroke-[3px]" />
              <span>{toCity.name}</span>
            </div>
            <div className="text-xs text-slate-300 font-medium mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="bg-blue-900/50 px-2 py-0.5 rounded text-blue-300 font-bold uppercase tracking-wider text-[9px]">
                {useSearchStore.getState().tripType === "roundTrip" ? "Round Trip" : "One Way"}
              </span>
              <span>•</span>
              <span>{format(departureDate, "dd MMM yyyy")}</span>
              {returnDate && (
                <>
                  <span>-</span>
                  <span>{format(returnDate, "dd MMM yyyy")}</span>
                </>
              )}
              <span>•</span>
              <span>{travelers.adults + travelers.children + travelers.infants} Pax</span>
              <span>•</span>
              <span className="capitalize">{travelClass} Class</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsSearchExecuted(false)}
          type="button"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-600/15 uppercase tracking-wider"
        >
          Modify Search
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
          <div className="text-center">
            <h3 className="font-bold text-slate-800 text-lg">Searching Flights...</h3>
            <p className="text-sm text-slate-500 mt-1">Fetching live fares for {fromCity.name} to {toCity.name}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Filters */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Filter className="h-4 w-4 text-blue-500" /> Filters
                </span>
                <button
                  onClick={() => {
                    setStopFilter(null);
                    setSelectedAirlines([]);
                    if (flights.length > 0) {
                      setMaxPrice(Math.max(...flights.map(f => f.price)) + 1000);
                    }
                  }}
                  type="button"
                  className="text-xs text-blue-600 hover:underline font-bold"
                >
                  Clear All
                </button>
              </div>

              {/* Stops Filter */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stops</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStopFilter(stopFilter === 0 ? null : 0)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${
                      stopFilter === 0
                        ? "bg-blue-50 border-blue-400 text-blue-700 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Non Stop
                  </button>
                  <button
                    onClick={() => setStopFilter(stopFilter === 1 ? null : 1)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${
                      stopFilter === 1
                        ? "bg-blue-50 border-blue-400 text-blue-700 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    1 Stop
                  </button>
                </div>
              </div>

              {/* Airlines Filter */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Airlines</h4>
                <div className="space-y-2">
                  {uniqueAirlines.map(airline => (
                    <label key={airline} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedAirlines.includes(airline)}
                        onChange={() => handleAirlineToggle(airline)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">
                        {airline}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Max Price</h4>
                  <span className="text-sm font-extrabold text-blue-600">₹{maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={Math.min(...flights.map(f => f.price), 4000)}
                  max={Math.max(...flights.map(f => f.price), 15000)}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Min: ₹{Math.min(...flights.map(f => f.price), 4000).toLocaleString()}</span>
                  <span>Max: ₹{Math.max(...flights.map(f => f.price), 15000).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Flight Cards list */}
          <div className="lg:col-span-3 space-y-4">
            {/* Sorting Header */}
            <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider pl-3 flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" /> Sort By
              </span>
              <div className="flex gap-1.5">
                {(
                  [
                    { id: "price", label: "Cheapest" },
                    { id: "duration", label: "Fastest" },
                    { id: "departure", label: "Departure" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id)}
                    className={`py-1.5 px-3 rounded-lg font-bold transition-all ${
                      sortBy === opt.id
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Flights */}
            <div className="space-y-3">
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className="bg-white rounded-xl border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all p-5 grid grid-cols-1 md:grid-cols-4 items-center gap-4 relative overflow-hidden group"
                  >
                    {/* Airline & Flight Details */}
                    <div className="md:col-span-1 flex items-center gap-3">
                      <div className="h-10 w-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-lg shadow-inner group-hover:bg-blue-50/50 transition-colors">
                        {flight.logoUrl}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-800 leading-tight">{flight.airline}</div>
                        <div className="text-[10px] text-slate-400 font-bold tracking-wider mt-0.5">{flight.flightNumber}</div>
                      </div>
                    </div>

                    {/* Timeline / Duration details */}
                    <div className="md:col-span-2 grid grid-cols-3 items-center text-center">
                      <div className="text-left">
                        <div className="text-lg font-extrabold text-slate-800">{flight.departureTime}</div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">{flight.fromCode}</div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[10px] text-slate-400 font-bold">{flight.duration}</span>
                        <div className="w-16 h-0.5 bg-slate-200 relative my-1.5">
                          <div className={`absolute h-1.5 w-1.5 rounded-full top-[-2px] left-[calc(50%-3px)] ${
                            flight.stops > 0 ? "bg-amber-400" : "bg-blue-500"
                          }`} />
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${
                          flight.stops > 0 ? "text-amber-500" : "text-emerald-500"
                        }`}>
                          {flight.stopDetails}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-extrabold text-slate-800">{flight.arrivalTime}</div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">{flight.toCode}</div>
                      </div>
                    </div>

                    {/* Price and Book Action */}
                    <div className="md:col-span-1 flex flex-row md:flex-col items-center justify-between md:justify-center md:items-end gap-3 border-t md:border-t-0 border-slate-50 pt-3 md:pt-0">
                      <div className="text-left md:text-right">
                        <span className="text-xl font-extrabold text-slate-800">₹{flight.price.toLocaleString()}</span>
                        <div className="text-[9px] text-slate-400 font-semibold mt-0.5">per traveler</div>
                      </div>
                      <button
                        onClick={() => handleBookFlight(flight)}
                        type="button"
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all uppercase tracking-wider"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl border border-slate-100 p-12 text-center text-slate-400 font-medium">
                  No flights match your filter criteria. Try expanding your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Simulation Dialog */}
      {bookingFlight && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-6 relative overflow-hidden animate-in zoom-in-95 duration-200 border-0">
            {!bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">Processing Your Booking</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Hold tight! We are communicating with {bookingFlight.airline} servers to block your seat at ₹{bookingFlight.price.toLocaleString()}.
                </p>
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex justify-between items-center text-left text-xs font-semibold">
                  <div>
                    <span className="text-slate-400 uppercase text-[9px] tracking-wider block font-bold">Flight</span>
                    <span className="text-slate-800 font-extrabold">{bookingFlight.airline} {bookingFlight.flightNumber}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 uppercase text-[9px] tracking-wider block font-bold">Price</span>
                    <span className="text-blue-600 font-black">₹{bookingFlight.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-5">
                <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                  <CheckCircle2 className="h-8 w-8 stroke-[2.5px]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-800">Booking Confirmed!</h3>
                  <p className="text-xs text-slate-400 font-medium">Ticket sent to your registered email & phone</p>
                </div>

                <div className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/20 text-left space-y-2.5">
                  <div className="flex justify-between items-baseline border-b border-emerald-100/50 pb-2">
                    <span className="text-xs font-extrabold text-slate-700">Booking ID</span>
                    <span className="text-xs font-mono font-bold text-emerald-700">MMT-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="text-left">
                      <span className="text-slate-400 uppercase text-[9px] tracking-wider block font-bold">Departure</span>
                      <span className="text-slate-800 font-bold">{bookingFlight.fromCode} • {bookingFlight.departureTime}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 uppercase text-[9px] tracking-wider block font-bold">Arrival</span>
                      <span className="text-slate-800 font-bold">{bookingFlight.toCode} • {bookingFlight.arrivalTime}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeBooking}
                  type="button"
                  className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider"
                >
                  Close & Back to Results
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
