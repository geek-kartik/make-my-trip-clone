"use client";

import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Briefcase, ChevronDown, Heart, Home, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user, isLoggedIn, setLoginModalOpen, logout } = useAuthStore();

  return (
    <header className="absolute left-0 right-0 top-0 z-40 w-full border-b border-white/5 bg-[#061522]/82 px-4 py-3 text-white backdrop-blur-sm md:px-8">
      {/* Left: Brand Logo */}
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-5">
        <div className="flex items-center gap-1 cursor-pointer shrink-0">
          <span className="text-[18px] font-black tracking-tight text-white">make</span>
          <span className="rounded-[7px] bg-[#e51f26] px-1.5 py-1 text-[15px] font-black italic leading-none text-white shadow-sm">my</span>
          <span className="text-[18px] font-black tracking-tight text-white">trip</span>
        </div>

      {/* Right: Actions */}
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 text-xs font-semibold">
        <div className="hidden xl:flex items-center gap-2 cursor-pointer hover:bg-white/8 px-3 py-1.5 rounded-lg transition-colors border-l border-white/10">
          <div className="h-8 w-8 rounded-full bg-[#ffba00] text-[#111827] grid place-items-center">
            <Home className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] text-white font-black leading-none">
              List Your Property
            </div>
            <div className="text-[9px] text-slate-300 font-medium mt-1">
              Grow your business!
            </div>
          </div>
        </div>

        {/* myBiz Promo */}
        <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:bg-white/8 px-3 py-1.5 rounded-lg transition-colors border-l border-white/10">
          <div className="h-8 w-8 rounded-md bg-[#e51f26] grid place-items-center text-[13px] font-black italic">
            my
          </div>
          <div>
            <div className="text-[10px] text-white font-black uppercase tracking-tight leading-none">
              Introducing myBiz
            </div>
            <div className="text-[9px] text-slate-300 font-medium mt-0.5">
              Business Travel Solution
            </div>
          </div>
        </div>

        {/* My Trips */}
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-white/8 px-3 py-1.5 rounded-lg transition-colors focus:outline-none border-l border-white/10">
            <Briefcase className="h-4.5 w-4.5 text-[#ffba00]" />
            <div className="text-left">
              <div className="leading-tight">My Trips</div>
              <div className="text-[9px] text-slate-300 font-normal mt-0.5">Manage your bookings</div>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 p-2 rounded-xl border border-slate-100 bg-white shadow-xl">
            <div className="px-2.5 py-2 border-b border-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Upcoming Trips</span>
            </div>
            <div className="py-6 px-4 text-center text-slate-400 text-xs font-medium">
              No upcoming trips found.
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:bg-white/8 px-3 py-1.5 rounded-lg transition-colors border-l border-white/10">
          <div className="h-8 w-8 rounded-full bg-[#ff6d6a]/20 text-[#ff6d6a] grid place-items-center">
            <Heart className="h-4 w-4 fill-[#ff6d6a]" />
          </div>
          <div>
            <div className="leading-tight">Wishlist</div>
            <div className="text-[9px] text-slate-300 font-normal mt-0.5">Save favourites</div>
          </div>
        </div>

        {/* Auth Button */}
        {isLoggedIn && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-xl text-white shadow-lg shadow-blue-500/10 transition-all border border-blue-500/20 focus:outline-none cursor-pointer">
              <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold uppercase">
                {user.name.slice(0, 2)}
              </div>
              <span className="max-w-[100px] truncate">Hey {user.name}</span>
              <ChevronDown className="h-3 w-3 text-blue-200" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 p-1 bg-white border border-slate-100 rounded-xl shadow-xl text-slate-700">
              <div className="p-3 border-b border-slate-50">
                <p className="text-xs font-semibold text-slate-400">Signed in as</p>
                <p className="text-sm font-bold text-slate-800 truncate mt-0.5">{user.email}</p>
                {user.phone && <p className="text-xs text-slate-500 font-medium mt-0.5">{user.phone}</p>}
              </div>
              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2 p-2.5 rounded-lg text-red-600 focus:text-red-700 hover:bg-red-50 focus:bg-red-50 cursor-pointer font-semibold text-xs"
              >
                <LogOut className="h-4 w-4" />
                Logout Account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={() => setLoginModalOpen(true)}
            className="flex items-center gap-2.5 bg-white px-4 py-2 rounded text-[#008cff] shadow-lg shadow-black/10 transition-all border border-white/20 hover:bg-[#f2f8ff]"
          >
            <User className="h-4 w-4 text-[#008cff]" />
            <span>Login or Create Account</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        )}

        {/* Country Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:bg-white/8 px-2.5 py-1.5 rounded transition-colors focus:outline-none">
            <span className="h-3 w-5 rounded-[1px] bg-gradient-to-b from-[#ff9933] via-white to-[#138808] shadow-sm" />
            <div className="text-left uppercase text-[10px] whitespace-nowrap">
              INR | English
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 mt-2 p-1 bg-white border border-slate-100 rounded-xl shadow-xl text-slate-700">
            <div className="px-3 py-2 border-b border-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Regional Settings</span>
            </div>
            <div className="p-1 space-y-0.5">
              <DropdownMenuItem className="flex items-center justify-between text-xs font-semibold p-2 rounded-lg cursor-pointer bg-slate-50 text-blue-600">
                <span>India (English)</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">INR</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center justify-between text-xs font-semibold p-2 rounded-lg cursor-pointer hover:bg-slate-50">
                <span>UAE (English)</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">AED</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center justify-between text-xs font-semibold p-2 rounded-lg cursor-pointer hover:bg-slate-50">
                <span>USA (English)</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">USD</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </div>
    </header>
  );
}
