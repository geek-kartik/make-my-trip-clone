"use client";

import React, { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useHomepageContent } from "@/hooks/useTravelApi";

export default function DownloadApp() {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const { data: homepage } = useHomepageContent();
  const content = homepage?.downloadApp;

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) return;
    
    setSent(true);
    setTimeout(() => {
      setPhone("");
    }, 4000);
  };

  return (
    <section className="w-full bg-slate-900 text-white py-14 overflow-hidden border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        {/* Left: Branding & Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] bg-blue-500/20 text-blue-400 font-extrabold uppercase px-3 py-1 rounded-full border border-blue-500/20 tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" /> {content?.eyebrow ?? "Loading savings"}
            </span>
            <h2 className="text-3xl font-black tracking-tight leading-tight">
              {content?.title ?? "Download the MakeMyTrip App"}
            </h2>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              {content?.body ?? "Loading app content from backend."}
            </p>
          </div>

          {/* Input SMS link sender */}
          {sent ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl max-w-md flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-emerald-300">Download link sent!</p>
                <p className="text-slate-400 mt-0.5">Please check your messages on the entered mobile number.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendLink} className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <input
                  type="tel"
                  placeholder="Enter 10-Digit Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/35 focus:border-blue-500 text-white placeholder-slate-500 font-semibold"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider whitespace-nowrap"
              >
                Get App Link
              </button>
            </form>
          )}

          {/* App Stores badges */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a href="#" className="hover:scale-[1.02] active:scale-98 transition-transform">
              <img
                src={content?.appStoreUrl ?? ""}
                alt="App Store"
                className="h-10 border border-slate-800 rounded-md bg-black"
              />
            </a>
            <a href="#" className="hover:scale-[1.02] active:scale-98 transition-transform">
              <img
                src={content?.playStoreUrl ?? ""}
                alt="Google Play"
                className="h-10"
              />
            </a>
          </div>
        </div>

        {/* Right: Isometric mockups */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          {/* Decorative gradients */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          
          {/* SVG Phone Mockup */}
          <div className="w-[260px] h-[480px] bg-slate-950 border-[6px] border-slate-800 rounded-[38px] shadow-2xl relative overflow-hidden ring-1 ring-white/10">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-900" />
            </div>

            {/* Simulated Screen */}
            <div className="h-full w-full bg-gradient-to-b from-[#0a2240] to-slate-900 p-4 pt-10 flex flex-col justify-between text-left relative z-10 select-none">
              <div className="space-y-4">
                {/* Logo and Greeting */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black tracking-tight text-blue-400">make<span className="text-white">my</span>trip</span>
                  <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded text-slate-300 font-bold uppercase">PRO</span>
                </div>

                {/* Simulated Widget Card */}
                <div className="bg-white rounded-2xl p-3 space-y-2.5 shadow-lg shadow-black/20 text-slate-800">
                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Flights Search</span>
                    <span className="text-blue-600">{content?.phoneMockupRoute ?? "DEL -> BOM"}</span>
                  </div>
                  <div className="h-2.5 w-24 bg-slate-100 rounded" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-7 bg-slate-50 border border-slate-100 rounded-lg p-1.5">
                      <div className="h-1.5 w-8 bg-slate-200 rounded" />
                      <div className="h-1 w-6 bg-slate-100 rounded mt-1" />
                    </div>
                    <div className="h-7 bg-slate-50 border border-slate-100 rounded-lg p-1.5">
                      <div className="h-1.5 w-8 bg-slate-200 rounded" />
                      <div className="h-1 w-6 bg-slate-100 rounded mt-1" />
                    </div>
                  </div>
                  <div className="h-7 bg-blue-600 rounded-lg flex items-center justify-center text-[9px] text-white font-extrabold uppercase tracking-wider shadow-md shadow-blue-500/20">
                    Search Flights
                  </div>
                </div>

                {/* Offer alert */}
                <div className="bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-500/20 rounded-xl p-2.5 flex items-center gap-2">
                    <div className="text-[12px]">%</div>
                  <div>
                    <div className="text-[9px] font-bold text-amber-300">{content?.offerTitle ?? "Loading app offer"}</div>
                    <div className="text-[7px] text-slate-400 mt-0.5">Code: {content?.offerCode ?? "..."}</div>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="text-center text-[8px] text-slate-500 font-semibold border-t border-slate-800/80 pt-3">
                Loved by 50 Million+ Travelers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
