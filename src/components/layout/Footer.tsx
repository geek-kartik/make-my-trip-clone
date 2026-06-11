"use client";

import React from "react";
import { Plane, Hotel, Train, Car, Compass, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#151c22] text-[#8a98a5] py-14 border-t border-[#1e272f]">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* Row 1: Directories */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Plane className="h-4.5 w-4.5 text-blue-500 rotate-45" /> Flights
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Domestic Flights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">International Flights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Airline Tickets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Flight Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cheap Flights</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Hotel className="h-4.5 w-4.5 text-orange-500" /> Hotels
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Hotels in Delhi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hotels in Mumbai</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hotels in Bangalore</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Luxury Resorts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Budget Stays</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="h-4.5 w-4.5 text-amber-500" /> Holidays
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Goa Packages</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kerala Packages</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kashmir Tour Packages</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Europe Packages</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Honeymoon Packages</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Train className="h-4.5 w-4.5 text-red-500" /> Trains & Buses
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">IRCTC Train Tickets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pnr Status Search</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Book Bus Tickets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">APS RTC Buses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">UPS RTC Buses</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="h-4.5 w-4.5 text-blue-400" /> Contact Info
            </h4>
            <p className="text-xs font-semibold leading-relaxed">
              MakeMyTrip India Pvt. Ltd. DLF Cyber City, Phase 3, Gurugram, Haryana, India.
            </p>
            <div className="flex gap-2">
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white transition-colors flex items-center justify-center" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white transition-colors flex items-center justify-center" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white transition-colors flex items-center justify-center" aria-label="Instagram">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.752.054 2.768.127 4.166 1.525 4.293 4.292.043.969.054 1.32.054 3.753 0 2.43-.01 2.784-.054 3.752-.127 2.768-1.525 4.166-4.292 4.293-.969.043-1.32.054-3.753.054-2.43 0-2.784-.01-3.752-.054-2.768-.127-4.166-1.525-4.293-4.292-.043-.969-.054-1.32-.054-3.753 0-2.43.01-2.784.054-3.752.127-2.768 1.525-4.166 4.292-4.293.969-.043 1.32-.054 3.753-.054zm-.315 1.8c-2.39 0-2.673.01-3.614.053-.2.009-.4.02-.6.04-.6.03-1.1.1-1.5.3-.4.2-.7.5-1 .8-.3.3-.6.6-.8 1-.2.4-.3.9-.3 1.5-.02.2-.03.4-.04.6C4.01 9.327 4 9.61 4 12c0 2.39.01 2.673.053 3.614.009.2.02.4.04.6.03.6.1 1.1.3 1.5.2.4.5.7.8 1 .3.3.6.6 1 .8.4.2.9.3 1.5.3.2.02.4.03.6.04.941.043 1.224.053 3.614.053 2.39 0 2.673-.01 3.614-.053.2-.009.4-.02.6-.04.6-.03 1.1-.1 1.5-.3.4-.2.7-.5 1-.8.3-.3.6-.6.8-1 .2-.4.3-.9.3-1.5.02-.2.03-.4.04-.6.043-.941.053-1.224.053-3.614 0-2.39-.01-2.673-.053-3.614-.009-.2-.02-.4-.04-.6-.03-.6-.1-1.1-.3-1.5-.2-.4-.5-.7-.8-1-.3-.3-.6-.6-1-.8-.4-.2-.9-.3-1.5-.3-.2-.02-.4-.03-.6-.04-.941-.043-1.224-.053-3.614-.053zm0 3.6a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 1.8a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6zm5.8-.8a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white transition-colors flex items-center justify-center" aria-label="Youtube">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Row 2: About MakeMyTrip */}
        <div className="border-t border-[#1e272f] pt-8 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            About MakeMyTrip Clone
          </h3>
          <p className="text-xs font-medium leading-relaxed text-[#758491]">
            MakeMyTrip is India&apos;s leading online travel portal, offering competitive airline bookings, hotel listings, domestic and international vacation packages, and train/bus reservations. This client application is constructed using a modern React & Next.js 15 framework, maintaining highly structured state stores with Zustand and fully caching resources using React Query, preparing the frontend interface for zero-friction backend FastAPI integrations.
          </p>
        </div>

        {/* Row 3: Bottom Copyright & Love */}
        <div className="border-t border-[#1e272f] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-[#5c6b77]">
          <div>
            © {new Date().getFullYear()} MakeMyTrip Clone. Created for demonstration purposes.
          </div>
          <div className="flex items-center gap-1.5">
            Crafted with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" /> for travel lovers.
          </div>
        </div>
      </div>
    </footer>
  );
}
