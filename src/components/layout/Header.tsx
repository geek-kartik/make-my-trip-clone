"use client";

import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Briefcase, ChevronDown, User, LogOut, Globe, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user, isLoggedIn, setLoginModalOpen, logout } = useAuthStore();

  return (
    <header className="w-full bg-[#0a2240] text-white px-4 md:px-8 py-3.5 flex items-center justify-between border-b border-blue-950/40 relative z-30">
      {/* Left: Brand Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-sky-300 to-white bg-clip-text text-transparent">
          make<span className="text-white">my</span>trip
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 md:gap-6 text-xs font-semibold">
        {/* myBiz Promo */}
        <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:bg-white/5 px-3 py-1.5 rounded-lg transition-colors border border-blue-900/30">
          <div className="p-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-md">
            <Briefcase className="h-3.5 w-3.5 text-slate-900" />
          </div>
          <div>
            <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider leading-none">
              Introducing myBiz
            </div>
            <div className="text-[9px] text-slate-300 font-medium mt-0.5">
              Business Travel Solution
            </div>
          </div>
        </div>

        {/* My Trips */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-3 py-1.5 rounded-lg transition-colors focus:outline-none">
            <Briefcase className="h-4.5 w-4.5 text-blue-400" />
            <div className="text-left">
              <div className="leading-tight">My Trips</div>
              <div className="text-[9px] text-slate-400 font-normal mt-0.5">Manage Bookings</div>
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
            className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-xl text-white shadow-lg shadow-blue-500/15 transition-all border border-blue-500/20"
          >
            <User className="h-4 w-4 text-blue-200" />
            <span>Login or Create Account</span>
          </button>
        )}

        {/* Country Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-2.5 py-1.5 rounded-lg transition-colors border border-blue-900/10 focus:outline-none">
            <Globe className="h-4 w-4 text-blue-400" />
            <div className="text-left uppercase text-[10px]">
              IN | EN | INR
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
    </header>
  );
}
