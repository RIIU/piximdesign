"use client";

import React, { useState, useMemo } from "react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle
} from "lucide-react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "07:30 PM",
];

const TIME_ZONES = [
  { id: "Asia/Dhaka", label: "Asia/Dhaka (GMT+6)" },
  { id: "America/New_York", label: "America/New_York (EST / GMT-5)" },
  { id: "Europe/London", label: "Europe/London (GMT/BST)" },
  { id: "Asia/Dubai", label: "Asia/Dubai (GST / GMT+4)" },
  { id: "Asia/Singapore", label: "Asia/Singapore (SGT / GMT+8)" },
];

export const BookingCalendarSection: React.FC = () => {
  const { openContact } = useContactModal();

  // Calendar State
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<number>(29);
  const [selectedSlot, setSelectedSlot] = useState<string>("02:00 PM");
  const [timeZone, setTimeZone] = useState<string>("Asia/Dhaka");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    // In our week Mo=0, Su=6. JS getDay() is Su=0, Mo=1...
    const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days: Array<{
      day: number;
      isCurrentMonth: boolean;
      isSelected: boolean;
    }> = [];

    // Prev month padding
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isSelected: i === selectedDay,
      });
    }

    // Next month padding to fill a complete 35 or 42 grid
    const totalSlots = days.length > 35 ? 42 : 35;
    const nextDays = totalSlots - days.length;
    for (let i = 1; i <= nextDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    return days;
  }, [currentYear, currentMonth, selectedDay]);

  const formattedSelectedDate = useMemo(() => {
    return `${MONTH_NAMES[currentMonth]} ${selectedDay}, ${currentYear}`;
  }, [currentMonth, selectedDay, currentYear]);

  const handleBookDiscoveryCall = () => {
    const notes = `Booked Discovery Call: ${formattedSelectedDate} at ${selectedSlot} (${timeZone})`;
    openContact("Discovery Consultation Call", notes);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 sm:pb-32">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(38,81,185,0.12),transparent_70%)] pointer-events-none" />

      {/* Styled Header matching Image 3 */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
          Let&apos;s Talk
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-300">
          Schedule your free 30-minute discovery call and map out your project roadmap with our lead specialists.
        </p>
      </div>

      {/* Interactive Booking Card (Dual-Pane Layout) */}
      <div className="relative max-w-4xl mx-auto rounded-[32px] border border-white/10 bg-white/95 dark:bg-[#0A1638]/95 backdrop-blur-xl text-slate-800 dark:text-slate-100 p-6 sm:p-10 shadow-[0_20px_60px_rgba(4,10,28,0.5),0_0_30px_rgba(255,133,0,0.08)]">
        {/* Top Card Title & Subtitle */}
        <div className="flex items-center gap-3.5 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#FF8500] shrink-0">
            <Clock className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Event Calendar
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Schedule your team meetings and discovery calls easily
            </p>
          </div>
        </div>

        {/* Dual-Pane Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Pane: Interactive Calendar Grid */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/60 dark:bg-[#07112B]/70">
            {/* Month & Navigation Header */}
            <div className="flex items-center justify-between px-2 py-1 mb-4 rounded-xl bg-white dark:bg-[#0C1E4E] border border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous Month"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next Month"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Weekdays Row */}
            <div className="grid grid-cols-7 text-center mb-2">
              {WEEK_DAYS.map((day) => (
                <div
                  key={day}
                  className="py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
              {calendarDays.map((item, index) => {
                const isSelected = item.isCurrentMonth && item.day === selectedDay;
                return (
                  <button
                    key={index}
                    type="button"
                    disabled={!item.isCurrentMonth}
                    onClick={() => {
                      if (item.isCurrentMonth) setSelectedDay(item.day);
                    }}
                    className={`h-9 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      !item.isCurrentMonth
                        ? "text-slate-300 dark:text-slate-700 pointer-events-none"
                        : isSelected
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/30 scale-105"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 active:scale-95"
                    }`}
                  >
                    {item.day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Pane: Meeting Details & Slot Picker */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            {/* Selected Meeting Date Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Meeting date <span className="text-[#FF8500]">*</span>
              </label>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#07112B] text-xs sm:text-sm text-slate-800 dark:text-slate-200 shadow-sm">
                <CalendarIcon className="w-4 h-4 text-[#FF8500]" />
                <span className="font-mono font-medium">
                  {currentYear}-{String(currentMonth + 1).padStart(2, "0")}-{String(selectedDay).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Available Slots Picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Available slots <span className="text-[#FF8500]">*</span>
                </label>
                <span className="text-[11px] font-mono text-emerald-500 dark:text-emerald-400 font-semibold">
                  6 slots open
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isSlotActive = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all border cursor-pointer ${
                        isSlotActive
                          ? "bg-gradient-to-r from-[#FF8500] to-[#E66000] text-white border-[#FFA133] shadow-md shadow-orange-500/25 scale-[1.02]"
                          : "bg-slate-100 dark:bg-[#0C1E4E]/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-[#FF8500]/50"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Zone Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Time zone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Globe className="w-4 h-4" />
                </div>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#07112B] text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#FF8500] cursor-pointer appearance-none"
                >
                  {TIME_ZONES.map((tz) => (
                    <option key={tz.id} value={tz.id} className="bg-slate-900 text-white">
                      {tz.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                </div>
              </div>
            </div>

            {/* Info notice pill */}
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/25 text-[11px] sm:text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
              <span>
                Free 30-min discovery call over Google Meet / Zoom with our lead designer and strategist.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Booking Summary & Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <div>
              <strong className="text-slate-900 dark:text-white">Date:</strong> {formattedSelectedDate}
            </div>
            <div className="mt-0.5">
              <strong className="text-slate-900 dark:text-white">Time:</strong> {selectedSlot} ({timeZone})
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setSelectedDay(29);
                setSelectedSlot("02:00 PM");
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={handleBookDiscoveryCall}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register to book</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
