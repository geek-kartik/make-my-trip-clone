"use client";

import React from "react";

const TRUST_ITEMS = [
  {
    id: "mmt-select",
    title: "MMT Select",
    text: "The Most-Rewarding Loyalty Program Globally",
    imageUrl: "https://promos.makemytrip.com/appfest/2x/MMT-Select-Icon.png",
  },
  {
    id: "mmt-exclusive",
    title: "MMT Exclusive Hotels",
    text: "Avail Lowest Price Guarantee on select hotels",
    imageUrl: "https://promos.makemytrip.com/appfest/2x/Best-Price.png",
  },
  {
    id: "mmt-connect",
    title: "MMT Connect",
    text: "Best Flight Connections & Cheapest Fares",
    imageUrl: "https://promos.makemytrip.com/appfest/2x/Free-cancellation.png",
  },
  {
    id: "247-support",
    title: "24*7 Customer Support",
    text: "Call Support in less than 2 minutes",
    imageUrl: "https://promos.makemytrip.com/appfest/2x/Customer-support.png",
  },
  {
    id: "secured-payments",
    title: "Secured Payments",
    text: "Visa, Mastercard and more",
    imageUrl: "https://promos.makemytrip.com/appfest/2x/Trusted-Partners.png",
  },
];

export default function BrandTrust() {
  return (
    <section className="w-full bg-[#f6f6f6] border-t border-b border-slate-200/50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 items-start text-center">
          {TRUST_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col items-center p-3 space-y-3 group hover:scale-[1.02] transition-transform duration-200">
              <div className="h-16 w-16 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100/50 p-2.5">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-slate-800 tracking-tight leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-semibold leading-snug max-w-[150px] mx-auto">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
