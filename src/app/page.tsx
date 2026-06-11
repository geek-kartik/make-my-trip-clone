"use client";

import React from "react";
import Header from "@/components/layout/Header";
import SearchWidget from "@/components/search/SearchWidget";
import FlightResults from "@/components/search/FlightResults";
import OffersSection from "@/components/offers/OffersSection";
import DownloadApp from "@/components/features/DownloadApp";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { useSearchStore } from "@/store/useSearchStore";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function Home() {
  const { isSearchExecuted } = useSearchStore();

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
            <div className="w-full bg-gradient-to-b from-[#0a2240] via-[#103058] to-[#15467e] pt-12 pb-24 text-white relative">
              {/* Subtle background graphics */}
              <div className="absolute top-0 right-0 w-96 h-full bg-radial-gradient from-blue-500/5 to-transparent pointer-events-none" />
              
              <div className="max-w-6xl mx-auto px-4 text-center space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-xs font-semibold text-sky-200">
                  <Sparkles className="h-3.5 w-3.5" /> Book with confidence. No hidden charges.
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
                  Where to Next?
                </h1>
                <p className="text-slate-300 text-xs md:text-sm font-medium max-w-md mx-auto">
                  Find the best deals on flights, hotels, holiday packages and much more.
                </p>
              </div>
            </div>

            {/* Core Search Panel (Overlaps the banner) */}
            <SearchWidget />

            {/* Spacer to balance the negative margin of SearchWidget */}
            <div className="h-14 md:h-20" />

            {/* Travel Advisory / Safe Travel Banner */}
            <div className="w-full max-w-6xl mx-auto px-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm">Safe Travel Guidelines</h3>
                    <p className="text-slate-500 text-xs mt-0.5 font-medium">Verify state-wise quarantine policies and airline check-in guidelines before you fly.</p>
                  </div>
                </div>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                  Read Travel Guidelines <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Promo Offers Section */}
            <OffersSection />

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
