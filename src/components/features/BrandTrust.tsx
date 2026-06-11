"use client";

import React from "react";
import { useHomepageContent } from "@/hooks/useTravelApi";

export default function BrandTrust() {
  const { data: homepage, isLoading, isError } = useHomepageContent();

  return (
    <section className="w-full bg-[#f6f6f6] border-t border-b border-slate-200/50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 items-start text-center">
          {isLoading && (
            <div className="col-span-full text-sm font-bold text-slate-400">
              Loading trust markers from backend...
            </div>
          )}
          {isError && (
            <div className="col-span-full text-sm font-bold text-red-400">
              Unable to load trust markers. Check the FastAPI service.
            </div>
          )}
          {(homepage?.trustItems ?? []).map((item) => (
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
