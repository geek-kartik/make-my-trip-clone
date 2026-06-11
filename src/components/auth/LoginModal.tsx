"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const loginSchema = z.object({
  identifier: z.string().min(1, "Please enter your Mobile Number or Email").refine((val) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isPhone = /^\d{10}$/.test(val);
    return isEmail || isPhone;
  }, "Enter a valid email address or 10-digit mobile number"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, login } = useAuthStore();
  const [step, setStep] = useState<"enter" | "verify">("enter");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [userInput, setUserInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    setLoading(true);
    setUserInput(data.identifier);
    
    // Simulate API request to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep("verify");
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const code = otp.join("");
    if (code.length < 4) {
      setOtpError("Please enter a 4-digit code");
      return;
    }

    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      if (code === "1234" || code.startsWith("9") || code.length === 4) {
        // Successful login
        const isEmail = userInput.includes("@");
        login(isEmail ? userInput : `${userInput}@mobile.mmt`, isEmail ? undefined : userInput);
        handleClose();
      } else {
        setOtpError("Invalid OTP. Hint: Use 1234");
      }
    }, 1000);
  };

  const handleClose = () => {
    setLoginModalOpen(false);
    setTimeout(() => {
      setStep("enter");
      reset();
      setOtp(["", "", "", ""]);
      setOtpError("");
    }, 3000);
  };

  return (
    <Dialog open={loginModalOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white border-0 shadow-2xl rounded-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative">
          <div className="absolute top-4 right-4">
            {/* Close handled by dialog component */}
          </div>
          <h2 className="text-2xl font-bold tracking-tight">MakeMyTrip</h2>
          <p className="text-blue-100 text-sm mt-1">Sign in to unlock flights deals & track your bookings</p>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === "enter" ? (
              <motion.div
                key="enter-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Mobile Number or Email
                    </label>
                    <div className="relative">
                      <input
                        {...register("identifier")}
                        placeholder="Enter email or 10 digit mobile number"
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors ${
                          errors.identifier ? "border-red-500" : "border-slate-200"
                        }`}
                        disabled={loading}
                      />
                    </div>
                    {errors.identifier && (
                      <p className="text-xs text-red-500 font-medium">{errors.identifier.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all shadow-lg shadow-blue-500/20"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending Verification Code...
                      </span>
                    ) : (
                      "CONTINUE"
                    )}
                  </Button>
                </form>

                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-100" />
                  </div>
                  <span className="relative bg-white px-3 text-xs font-medium text-slate-400 uppercase">
                    Or Login With
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => login("google-user@gmail.com")}
                    className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-600"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.5 3.77v3.13h4.03c2.37-2.18 3.73-5.39 3.73-9.15z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-4.03-3.13c-1.12.75-2.56 1.2-3.93 1.2-3.03 0-5.6-2.05-6.52-4.82H1.31v3.23A12 12 0 0 0 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.48 14.34a7.2 7.2 0 0 1 0-4.68V6.43H1.31a12 12 0 0 0 0 11.14l4.17-3.23z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A12 12 0 0 0 1.31 6.43l4.17 3.23c.92-2.77 3.49-4.91 6.52-4.91z"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => login("apple-user@icloud.com")}
                    className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-600"
                  >
                    <svg className="w-4 h-4 fill-slate-800" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    MyBiz
                  </button>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
                  By proceeding, you agree to MakeMyTrip&apos;s{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Privacy Policy
                  </a>
                  ,{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    User Agreement
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    T&Cs
                  </a>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="verify-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <p className="text-sm text-slate-500">We have sent a verification code to</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">{userInput}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 h-14 border border-slate-200 rounded-xl text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    ))}
                  </div>

                  {otpError && <p className="text-xs text-red-500 text-center font-medium">{otpError}</p>}
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="w-full py-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/20"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 justify-center">
                        <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
                      </span>
                    ) : (
                      "VERIFY & PROCEED"
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setStep("enter")}
                    className="w-full text-center text-xs font-semibold text-blue-600 hover:underline py-1"
                  >
                    Change Email/Mobile
                  </button>
                </div>

                <div className="text-center text-xs text-slate-400">
                  Didn&apos;t receive code?{" "}
                  <button type="button" className="text-blue-500 font-medium hover:underline">
                    Resend OTP (Hint: use 1234)
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
