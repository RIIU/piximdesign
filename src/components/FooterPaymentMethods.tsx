"use client";

import React from "react";
import { ShieldCheck, Lock } from "lucide-react";

interface PaymentItem {
  id: string;
  name: string;
  category: "card" | "mfs" | "bank" | "global";
  badge: React.ReactNode;
}

export const FooterPaymentMethods: React.FC = () => {
  const paymentMethods: PaymentItem[] = [
    // --- Cards & Global ---
    {
      id: "visa",
      name: "Visa",
      category: "card",
      badge: (
        <svg className="h-4 sm:h-5 w-auto" viewBox="0 0 64 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.57 0.5L16.14 19.5H10.74L6.5 4.3C6.25 3.3 5.42 2.29 4.34 1.74C2.59 0.81 0.74 0.28 0.5 0.5H8.76C9.9 0.5 10.9 1.25 11.16 2.59L13.23 13.57L18.42 0.5H24.57ZM45.69 13.29C45.71 8.23 38.65 7.95 38.7 5.67C38.71 4.97 39.38 4.22 40.86 4.03C41.59 3.93 43.62 3.86 45.76 4.86L46.64 0.85C45.43 0.41 43.86 0 41.87 0C36.78 0 33.19 2.7 33.16 6.57C33.1 9.44 35.67 11.03 37.64 11.98C39.66 12.96 40.35 13.59 40.33 14.47C40.31 15.82 38.7 16.42 37.23 16.44C34.62 16.48 33.09 15.74 31.89 15.18L30.98 19.38C32.18 19.93 34.4 20.4 36.7 20.43C42.09 20.43 45.66 17.77 45.69 13.29ZM59.13 19.5H63.85L59.73 0.5H55.36C54.36 0.5 53.51 1.08 53.13 1.99L45.42 19.5H50.84L51.92 16.5H58.54L59.13 19.5ZM53.42 12.44L56.24 4.7L57.86 12.44H53.42ZM32.33 0.5L28.08 19.5H22.92L27.17 0.5H32.33Z" fill="#1434CB"/>
        </svg>
      ),
    },
    {
      id: "mastercard",
      name: "Mastercard",
      category: "card",
      badge: (
        <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" fill="#EB001B"/>
          <circle cx="26" cy="12" r="11" fill="#F79E1B"/>
          <path d="M19 4.8C21.1 6.6 22.5 9.4 22.5 12C22.5 14.6 21.1 17.4 19 19.2C16.9 17.4 15.5 14.6 15.5 12C15.5 9.4 16.9 6.6 19 4.8Z" fill="#FF5F00"/>
        </svg>
      ),
    },
    {
      id: "amex",
      name: "American Express",
      category: "card",
      badge: (
        <div className="flex items-center justify-center px-1.5 py-0.5 rounded bg-[#006FCF] text-white">
          <span className="font-black text-[11px] tracking-tighter">AMEX</span>
        </div>
      ),
    },
    {
      id: "unionpay",
      name: "UnionPay",
      category: "card",
      badge: (
        <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="24" rx="2" fill="#E21836"/>
          <path d="M14 0H24L20 24H10L14 0Z" fill="#00457C"/>
          <path d="M22 0H34C35.1 0 36 0.9 36 2V22C36 23.1 35.1 24 34 24H20L22 0Z" fill="#007B80"/>
          <text x="18" y="15" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">UnionPay</text>
        </svg>
      ),
    },
    {
      id: "diners",
      name: "Diners Club",
      category: "card",
      badge: (
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full border-2 border-[#004A97] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#004A97]" />
          </div>
          <span className="font-bold text-[10px] tracking-tight text-[#004A97]">Diners</span>
        </div>
      ),
    },

    // --- Bangladesh MFS ---
    {
      id: "bkash",
      name: "bKash",
      category: "mfs",
      badge: (
        <div className="flex items-center gap-1.5">
          <svg className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M88 40L62 14L45 55L88 40Z" fill="#E2136E"/>
            <path d="M45 55L12 38L25 72L45 55Z" fill="#C0105D"/>
            <path d="M45 55L68 90L85 68L45 55Z" fill="#E2136E"/>
            <path d="M45 55L25 72L42 86L45 55Z" fill="#990B47"/>
          </svg>
          <span className="font-extrabold text-xs tracking-tight text-[#E2136E]">bKash</span>
        </div>
      ),
    },
    {
      id: "nagad",
      name: "Nagad",
      category: "mfs",
      badge: (
        <div className="flex items-center gap-1.5">
          <svg className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10C50 10 32 30 32 50C32 64 40 76 50 82C60 76 68 64 68 50C68 30 50 10 50 10Z" fill="#F7941D"/>
            <path d="M50 28C50 28 39 42 39 55C39 64 44 71 50 75C56 71 61 64 61 55C61 42 50 28 50 28Z" fill="#E41E26"/>
            <circle cx="50" cy="58" r="5" fill="#FFE500"/>
          </svg>
          <span className="font-black text-xs tracking-tight text-[#E41E26]">নগদ</span>
        </div>
      ),
    },
    {
      id: "rocket",
      name: "Rocket DBBL",
      category: "mfs",
      badge: (
        <div className="flex items-center gap-1.5">
          <svg className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 12L74 42H58V72L42 60V42H26L50 12Z" fill="#8C3494"/>
            <path d="M42 72L50 88L58 72H42Z" fill="#E91E63"/>
          </svg>
          <span className="font-bold text-xs tracking-tight text-[#8C3494]">রকেট</span>
        </div>
      ),
    },
    {
      id: "upay",
      name: "Upay (UCB)",
      category: "mfs",
      badge: (
        <div className="flex items-center gap-1">
          <svg className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="40" r="14" fill="#004B87"/>
            <circle cx="65" cy="40" r="14" fill="#FFC72C"/>
            <path d="M25 58C25 58 35 78 50 78C65 78 75 58 75 58" stroke="#004B87" strokeWidth="8" strokeLinecap="round"/>
          </svg>
          <span className="font-extrabold text-xs tracking-tight text-[#004B87]">upay</span>
        </div>
      ),
    },
    {
      id: "tap",
      name: "tap (Trust Axiata)",
      category: "mfs",
      badge: (
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-[#E51E25] flex items-center justify-center text-white text-[10px] font-black">t</span>
          <span className="font-black text-xs text-[#E51E25]">tap</span>
        </div>
      ),
    },
    {
      id: "cellfin",
      name: "Cellfin (IBBL)",
      category: "mfs",
      badge: (
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-[#008037] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full border border-white" />
          </div>
          <span className="font-bold text-xs text-[#008037]">Cellfin</span>
        </div>
      ),
    },
    {
      id: "okwallet",
      name: "OK Wallet",
      category: "mfs",
      badge: (
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-black text-[#FFB300]">ok</span>
          <span className="font-bold text-[10px] text-slate-700">wallet</span>
        </div>
      ),
    },

    // --- Banks & Internet Banking ---
    {
      id: "dbbl-nexus",
      name: "DBBL Nexus",
      category: "bank",
      badge: (
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#006633] to-[#E41E26] flex items-center justify-center text-[8px] font-bold text-white">N</div>
          <div className="flex flex-col leading-none text-left">
            <span className="font-extrabold text-[8px] text-[#006633]">DBBL</span>
            <span className="font-bold text-[7px] text-[#E41E26]">NEXUS</span>
          </div>
        </div>
      ),
    },
    {
      id: "citytouch",
      name: "City Touch (City Bank)",
      category: "bank",
      badge: (
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded bg-[#ED1C24] flex items-center justify-center text-white font-black text-[8px]">C</div>
          <span className="font-bold text-[10px] text-[#ED1C24]">CityTouch</span>
        </div>
      ),
    },
    {
      id: "eblsky",
      name: "EBL SKY",
      category: "bank",
      badge: (
        <div className="flex items-center gap-1">
          <span className="font-black text-[9px] px-1 py-0.2 bg-[#F58220] text-white rounded">EBL</span>
          <span className="font-bold text-[9px] text-[#0054A6]">SKY</span>
        </div>
      ),
    },
    {
      id: "bankasia",
      name: "Bank Asia",
      category: "bank",
      badge: (
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 border-2 border-[#005596] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#005596]" />
          </div>
          <span className="font-bold text-[9px] text-[#005596]">Bank Asia</span>
        </div>
      ),
    },
    {
      id: "qcash",
      name: "Q-Cash",
      category: "bank",
      badge: (
        <div className="flex items-center gap-0.5">
          <span className="w-4 h-4 rounded bg-[#D62828] text-white font-black text-[9px] flex items-center justify-center">Q</span>
          <span className="font-extrabold text-[9px] text-[#D62828]">CASH</span>
        </div>
      ),
    },
    {
      id: "takapay",
      name: "TakaPay",
      category: "bank",
      badge: (
        <div className="flex items-center gap-1">
          <span className="w-3.5 h-3.5 rounded-full bg-[#006A4E] text-white font-bold text-[8px] flex items-center justify-center">৳</span>
          <span className="font-bold text-[9px] text-[#006A4E]">TakaPay</span>
        </div>
      ),
    },
    {
      id: "pathaopay",
      name: "Pathao Pay",
      category: "mfs",
      badge: (
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded-full bg-[#1062FE] text-white font-bold text-[8px] flex items-center justify-center">P</div>
          <span className="font-bold text-[9px] text-[#1062FE]">PathaoPay</span>
        </div>
      ),
    },
    {
      id: "applepay",
      name: "Apple Pay",
      category: "global",
      badge: (
        <div className="flex items-center gap-1 text-slate-900">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.98-5.77-8.91-10.36-19.16-13.77-30.74-3.41-11.58-5.12-22.61-5.12-33.1 0-14.42 3.65-26.68 10.96-36.78 7.31-10.1 16.59-15.28 27.84-15.54 4.58 0 9.87 1.25 15.87 3.75 6 2.5 10.02 3.81 12.06 3.93 1.93-.12 6.08-1.46 12.44-4.04 6.36-2.58 11.75-3.83 16.16-3.75 12.39.63 22.38 5.48 29.96 14.56-10.96 6.64-16.31 15.7-16.06 27.18.25 9.02 3.62 16.63 10.12 22.84 6.5 6.21 14.15 9.77 22.95 10.68-2.36 7.2-5.44 14.73-9.25 22.61zM119.22 31.84c0-7.31 2.65-14.28 7.96-20.92 5.3-6.64 11.96-10.63 19.96-11.98.24 1.24.36 2.43.36 3.56 0 7.31-2.73 14.36-8.2 21.14-5.46 6.78-12.18 10.6-20.14 11.47.06-1.07.06-2.16.06-3.27z"/>
          </svg>
          <span className="font-bold text-[11px]">Pay</span>
        </div>
      ),
    },
    {
      id: "googlepay",
      name: "Google Pay",
      category: "global",
      badge: (
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <span className="font-bold text-[11px] text-slate-800">Pay</span>
        </div>
      ),
    },
    {
      id: "wise",
      name: "Wise Transfer",
      category: "global",
      badge: (
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-[#163300]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.77 18.667 9.8 8.04l2.977 4.195H20.23L12.777 0H7.72L0 13.627h8.49l-2.095 5.04H3.77z"/>
          </svg>
          <span className="font-extrabold text-[11px] text-[#163300]">Wise</span>
        </div>
      ),
    },
    {
      id: "bank-wire",
      name: "Direct Bank Transfer",
      category: "bank",
      badge: (
        <div className="flex items-center gap-1 text-[#2651B9]">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M14 10v11M12 3l9 7H3l9-7z"/>
          </svg>
          <span className="font-bold text-[9px] whitespace-nowrap">Bank Transfer</span>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-8 pb-4">
      <div className="rounded-2xl p-4 sm:p-6 bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 backdrop-blur-sm transition-all">
        {/* Banner Layout Container (Like Pixim's Official Payment Layout) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Left Title: Pay With */}
          <div className="flex lg:flex-col items-center lg:items-start justify-center gap-1.5 flex-shrink-0 lg:pr-4 lg:border-r border-slate-200 dark:border-slate-800">
            <span className="text-sm sm:text-base font-bold text-[#1E3A8A] dark:text-[#93C5FD] tracking-tight whitespace-nowrap">
              Pay With
            </span>
            <span className="hidden lg:inline text-[11px] font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Global &amp; Local
            </span>
          </div>

          {/* Middle: Grid of Individual Logo Cards */}
          <div className="flex-1 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl">
            {paymentMethods.map((pm) => (
              <div
                key={pm.id}
                title={pm.name}
                className="h-9 px-3 py-1 rounded-xl bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-[#FF8500]/60 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer select-none group"
              >
                {pm.badge}
              </div>
            ))}
          </div>

          {/* Right: Verified By SSLCOMMERZ */}
          <div className="flex lg:flex-col items-center justify-center gap-2 flex-shrink-0 lg:pl-4 lg:border-l border-slate-200 dark:border-slate-800">
            <div className="text-center">
              <div className="text-[10px] uppercase font-mono font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                Verified By
              </div>
              <div className="mt-1 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#013571] text-white shadow-sm hover:opacity-95 transition-opacity">
                <Lock className="w-3 h-3 text-[#FF8500]" />
                <span className="font-extrabold tracking-wider text-[11px] font-sans">
                  SSLCOMMERZ
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-3 h-3" />
              <span>256-bit Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
