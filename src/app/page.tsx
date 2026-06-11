"use client";

import React from "react";
import Header from "@/components/layout/Header";
import SearchWidget from "@/components/search/SearchWidget";
import FlightResults from "@/components/search/FlightResults";
import OffersSection from "@/components/offers/OffersSection";
import DownloadApp from "@/components/features/DownloadApp";
import BrandTrust from "@/components/features/BrandTrust";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { useSearchStore } from "@/store/useSearchStore";
import { ArrowDown, ArrowRight, ShieldCheck } from "lucide-react";
import { useHomepageContent } from "@/hooks/useTravelApi";

export default function Home() {
  const { isSearchExecuted } = useSearchStore();
  const { data: homepage, isLoading, isError } = useHomepageContent();

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        {/* Global Header */}
        <Header />

        {isSearchExecuted ? (
          /* Search Results Screen */
          <div className="animate-in fade-in duration-300">
            <FlightResults />
          </div>
        ) : (
          /* Main Homepage Screen */
          <div className="animate-in fade-in duration-300">
            {/* Top Banner section */}
            <div className="relative w-full min-h-[680px] overflow-visible bg-[#071827] text-white">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(6,18,28,0.55) 0%, rgba(6,18,28,0.35) 46%, rgba(6,18,28,0.78) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80')",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/45 to-transparent" />
              <div className="relative z-10 max-w-6xl mx-auto px-4 pt-[92px] text-center">
                {isError && (
                  <p className="mt-3 text-amber-200 text-xs font-bold">
                    Backend content service is unavailable. Start FastAPI on port 8000 and refresh.
                  </p>
                )}
              </div>
            </div>

            {/* Core Search Panel (Overlaps the banner) */}
            <SearchWidget />

            {/* Spacer to balance the negative margin of SearchWidget */}
            <div className="h-20 md:h-24" />

            <div className="w-full flex justify-center -mt-4 mb-2 relative z-30 pointer-events-none">
              <div className="flex flex-col items-center gap-1 text-white text-xs font-bold">
                <ArrowDown className="h-4 w-4 animate-bounce" />
                Explore More
              </div>
            </div>

            <div className="w-full max-w-[980px] mx-auto px-4 mt-8 relative z-20">
              <div className="bg-white rounded-[22px] shadow-[0_4px_22px_rgba(0,0,0,0.16)] grid grid-cols-2 md:grid-cols-6 overflow-hidden border border-white/60">
                {["Where2Go", "How2Go", "MakeMyTrip ICICI Credit Card", "MICE", "Gift Cards", "Trip Money"].map((item, index) => (
                  <div key={item} className="flex items-center gap-2 px-4 py-3 text-[12px] font-semibold text-[#4a4a4a] border-r last:border-r-0 border-slate-100">
                    <span className="h-7 w-7 rounded-full bg-[#eef7ff] text-[#008cff] grid place-items-center text-xs font-black">
                      {index + 1}
                    </span>
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Advisory / Safe Travel Banner */}
            <div className="w-full max-w-6xl mx-auto px-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm">
                      {homepage?.advisory.title ?? "Safe Travel Guidelines"}
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5 font-medium">
                      {homepage?.advisory.body ?? "Loading backend advisory content..."}
                    </p>
                  </div>
                </div>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                  {homepage?.advisory.ctaLabel ?? "Read Travel Guidelines"} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Promo Offers Section */}
            <OffersSection />

            {!isLoading && <BrandTrust />}

            {/* Mobile App promo section */}
            <DownloadApp />
          </div>
        )}
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Login / Auth Modal Triggered Globally */}
      <LoginModal />
    </main>
  );
}
