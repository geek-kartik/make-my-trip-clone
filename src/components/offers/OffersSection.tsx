"use client";

import React, { useState } from "react";
import { mockOffers, Offer } from "@/data/mockData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tag, Calendar, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: "all", label: "All Offers" },
  { id: "flights", label: "Flights" },
  { id: "hotels", label: "Hotels" },
  { id: "holidays", label: "Holidays" },
  { id: "cabs", label: "Cabs" },
];

export default function OffersSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredOffers = mockOffers.filter(
    (offer) => activeCategory === "all" || offer.category === activeCategory
  );

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Tag className="h-5 w-5 text-blue-600 rotate-90" /> Offers & Promotions
          </h2>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Handpicked deals, discount codes, and credit card promotions for your trip
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`py-1.5 px-4 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Offers Carousel */}
      <div className="relative px-1 pt-1">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            <AnimatePresence mode="popLayout">
              {filteredOffers.map((offer, idx) => (
                <CarouselItem
                  key={offer.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="h-40 w-full overflow-hidden relative bg-slate-100">
                        <img
                          src={offer.imageUrl}
                          alt={offer.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-bold text-slate-800 uppercase tracking-wider shadow-sm border border-slate-100">
                          {offer.category}
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-5 space-y-2">
                        <h3 className="font-extrabold text-slate-800 text-sm leading-snug line-clamp-1">
                          {offer.title}
                        </h3>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2">
                          {offer.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Actions info */}
                    <div className="px-5 pb-5 pt-3 border-t border-slate-50 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                          Promo Code
                        </span>
                        <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100/50">
                          {offer.code}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider flex items-center gap-1 justify-end">
                          <Calendar className="h-3 w-3" /> {offer.expiry}
                        </span>
                        <span className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-0.5 justify-end mt-0.5 group/link">
                          Book Now{" "}
                          <ChevronRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </AnimatePresence>
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white text-slate-800 border-slate-200 hover:bg-slate-50 shadow-md h-9 w-9" />
            <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white text-slate-800 border-slate-200 hover:bg-slate-50 shadow-md h-9 w-9" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
