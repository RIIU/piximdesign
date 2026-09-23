"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
  Calendar as CalendarIcon,
  CheckCircle2,
  Video,
  Mic,
  MicOff,
  PhoneOff,
  Share2,
  ArrowRight,
} from "lucide-react";
import { GsapMagneticButton } from "@/components/animations";

interface TimeZoneOption {
  label: string;
  value: string;
  offset: string;
}

const TIMEZONES: TimeZoneOption[] = [
  { label: "Asia/Dhaka", value: "Asia/Dhaka", offset: "+06:00" },
  { label: "America/New_York", value: "America/New_York", offset: "-05:00" },
  { label: "America/Los_Angeles", value: "America/Los_Angeles", offset: "-08:00" },
  { label: "Europe/London", value: "Europe/London", offset: "+00:00" },
  { label: "Asia/Dubai", value: "Asia/Dubai", offset: "+04:00" },
  { label: "Asia/Singapore", value: "Asia/Singapore", offset: "+08:00" },
  { label: "Europe/Berlin", value: "Europe/Berlin", offset: "+01:00" },
];

const AVAILABLE_TIMES = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "06:30 PM",
];

export const FreeConsultationSection: React.FC = () => {
  // Calendar date state: default to September 2026, day 23 selected (as shown in design)
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 8, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(23);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeZone, setTimeZone] = useState("Asia/Dhaka");
  const [tzTimeStr, setTzTimeStr] = useState("11:13am");
  const [showTzDropdown, setShowTzDropdown] = useState(false);

  // Booking Flow: "calendar" | "form" | "confirmed"
  const [viewState, setViewState] = useState<"calendar" | "form" | "confirmed">("calendar");
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  // Booking Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectTopic, setProjectTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Interactive video controls state
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  // Calculate live time for selected timezone
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        setTzTimeStr(formatter.format(now).toLowerCase().replace(" ", ""));
      } catch {
        setTzTimeStr("11:13am");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [timeZone]);

  // Calendar calculations
  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const daysInMonth = useMemo(() => {
    return new Date(year, monthIndex + 1, 0).getDate();
  }, [year, monthIndex]);

  // First day offset (Monday = 0 ... Sunday = 6)
  const startDayOffset = useMemo(() => {
    const day = new Date(year, monthIndex, 1).getDay();
    return day === 0 ? 6 : day - 1;
  }, [year, monthIndex]);

  const prevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDay(null);
    setSelectedTime(null);
    setShowTimeSlots(false);
  };

  const nextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDay(null);
    setSelectedTime(null);
    setShowTimeSlots(false);
  };

  // Calendly availability logic:
  // Weekdays available; days before 23 are past for Sept 2026
  const isDayAvailable = (day: number) => {
    const dateObj = new Date(year, monthIndex, day);
    const dayOfWeek = dateObj.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    if (isWeekend) return false;

    if (year === 2026 && monthIndex === 8 && day < 23) {
      return false;
    }
    return true;
  };

  const handleDayClick = (dayNumber: number) => {
    if (!isDayAvailable(dayNumber)) return;
    setSelectedDay(dayNumber);
    setShowTimeSlots(true);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setViewState("form");
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setViewState("confirmed");
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#FF8500", "#FFA229", "#2651B9", "#3B82F6", "#10B981"],
      });
    }, 600);
  };

  const resetBooking = () => {
    setSelectedDay(23);
    setSelectedTime(null);
    setShowTimeSlots(false);
    setViewState("calendar");
    setName("");
    setEmail("");
    setProjectTopic("");
  };

  return (
    <section id="consultation" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient Pixim Brand Lighting (No pitch black) */}
      <div
        className="absolute top-1/4 -left-28 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(255, 133, 0, 0.35) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-10 -right-28 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl opacity-35"
        style={{
          background: "radial-gradient(circle, rgba(38, 81, 185, 0.4) 0%, transparent 70%)",
        }}
      />

      {/* Main Container: Rich Pixim Brand Blue (Black-Free) Studio Card */}
      <div className="relative rounded-[32px] sm:rounded-[42px] bg-gradient-to-br from-[#0C1E4E] via-[#0D2258] to-[#081330] border border-[#2651B9]/35 ring-1 ring-inset ring-white/[0.08] p-6 sm:p-10 lg:p-14 shadow-[0_25px_70px_-15px_rgba(4,10,28,0.85)] overflow-hidden">
        {/* Subtle Brand Mesh Radial Lights inside Card */}
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(circle, #FF8500 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full pointer-events-none opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #2651B9 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-7">
            <div>
              {/* Heading in Pixim Agency Font & Signature Orange Gradient */}
              <h2 className="font-agency text-4xl sm:text-5xl lg:text-[58px] font-black tracking-tight leading-[1.05] text-[#0F172A] dark:text-white">
                Get a Free <br />
                <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
                  Consultation
                </span>
              </h2>

              {/* Subtitle / Description */}
              <p className="mt-4 text-sm sm:text-base text-blue-100/85 leading-relaxed font-sans max-w-lg">
                Schedule a 30-minute call to discuss your ideas. We will listen to your needs and help you find the best design for your business.
              </p>

              {/* Checkmark Tag Pills in Pixim Brand Style */}
              <div className="flex flex-wrap items-center gap-3.5 mt-6">
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#081330]/75 border border-[#2651B9]/35 backdrop-blur-md shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA229] flex items-center justify-center text-[#081330] shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white font-sherika tracking-wide">
                    Branding Specialists
                  </span>
                </div>

                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#081330]/75 border border-[#2651B9]/35 backdrop-blur-md shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA229] flex items-center justify-center text-[#081330] shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white font-sherika tracking-wide">
                    Brand Designers
                  </span>
                </div>
              </div>
            </div>

            {/* Graphic Box: Design Director Video Call & Rating Badges */}
            <div className="relative w-full max-w-[490px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(4,10,28,0.7)] border border-[#2651B9]/35 ring-1 ring-white/10 group">
              <div className="relative w-full aspect-[466/411] overflow-hidden">
                <Image
                  src="/images/consultation/director-card-clean.png"
                  alt="Pixim Design Director Consultation"
                  fill
                  sizes="(max-width: 768px) 100vw, 490px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  priority
                />

                {/* Interactive Video Controls in Pixim Brand Navy */}
                <div className="absolute bottom-[75px] left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0C1E4E]/90 backdrop-blur-md border border-[#2651B9]/40 opacity-90 hover:opacity-100 transition-opacity shadow-lg">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    title={isMuted ? "Unmute Mic" : "Mute Mic"}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      isMuted ? "bg-red-500/25 text-red-400" : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    title={isVideoOn ? "Turn off camera" : "Turn on camera"}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      !isVideoOn ? "bg-red-500/25 text-red-400" : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    title="Screen Share"
                    className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    title="End Call"
                    className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
                  >
                    <PhoneOff className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: CALENDLY WIDGET ================= */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_25px_65px_rgba(4,10,28,0.5)] border border-[#2651B9]/20 relative overflow-hidden text-slate-800 transition-all duration-300">
              {/* Diagonal "POWERED BY Calendly" Badge in Brand Blue Gradient */}
              <div className="absolute -right-12 top-6 w-44 py-1 bg-gradient-to-r from-[#1E3A8A] via-[#2651B9] to-[#3B82F6] text-white text-[9px] font-bold text-center rotate-45 shadow-md uppercase tracking-wider select-none pointer-events-none z-20">
                POWERED BY Calendly
              </div>

              {viewState === "calendar" && (
                <div className="p-6 sm:p-8">
                  {/* Title in Pixim Agency Style */}
                  <h3 className="font-agency text-2xl sm:text-3xl font-extrabold text-[#0C1E4E] text-center tracking-tight mb-6">
                    Select a Day
                  </h3>

                  {/* Month Navigation */}
                  <div className="flex items-center justify-between px-3 mb-6">
                    <button
                      type="button"
                      onClick={prevMonth}
                      aria-label="Previous Month"
                      className="p-2 rounded-full hover:bg-blue-50 text-[#2651B9] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="text-sm sm:text-base font-bold text-[#0C1E4E]">
                      {monthName} {year}
                    </div>

                    <button
                      type="button"
                      onClick={nextMonth}
                      aria-label="Next Month"
                      className="p-2 rounded-full hover:bg-blue-50 text-[#2651B9] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Weekday Labels: Mon Tue Wed Thu Fri Sat Sun */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-3">
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                  </div>

                  {/* Dates Grid */}
                  <div className="grid grid-cols-7 gap-y-2.5 gap-x-1 text-center text-sm font-medium mb-6">
                    {/* Empty padding days before day 1 */}
                    {Array.from({ length: startDayOffset }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="h-9 w-9 mx-auto" />
                    ))}

                    {/* Day numbers */}
                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                      const dayNumber = idx + 1;
                      const available = isDayAvailable(dayNumber);
                      const isSelected = selectedDay === dayNumber;

                      return (
                        <div key={`day-${dayNumber}`} className="flex flex-col items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleDayClick(dayNumber)}
                            disabled={!available}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 relative text-sm ${
                              isSelected
                                ? "bg-gradient-to-r from-[#2651B9] to-[#3B82F6] text-white font-bold shadow-md shadow-blue-500/25 ring-2 ring-[#2651B9]/30 cursor-pointer"
                                : available
                                ? "bg-blue-50/90 text-[#2651B9] font-bold hover:bg-[#FF8500] hover:text-white cursor-pointer"
                                : "text-slate-400 cursor-not-allowed font-normal"
                            }`}
                          >
                            {dayNumber}
                            {/* Blue/Orange dot indicator for day 23 matching screenshot */}
                            {dayNumber === 23 && !isSelected && (
                              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#2651B9]" />
                            )}
                            {isSelected && (
                              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-white" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Available Time Slots Accordion / Drawer */}
                  {showTimeSlots && selectedDay && (
                    <div className="mb-5 pt-4 border-t border-slate-100 animate-fadeIn">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#0C1E4E]">
                          Times for {monthName} {selectedDay}:
                        </span>
                        <span className="text-[11px] text-[#FF8500] font-bold">30 min call</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {AVAILABLE_TIMES.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => handleSelectTime(time)}
                            className="py-2 px-1 text-xs font-bold rounded-xl border border-blue-200/60 bg-blue-50/50 hover:bg-gradient-to-r hover:from-[#FF8500] hover:to-[#FFA229] hover:text-white hover:border-[#FF8500] text-[#0C1E4E] transition-all cursor-pointer shadow-sm"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timezone Selector */}
                  <div className="pt-3 border-t border-slate-100 relative">
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Time zone
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowTzDropdown(!showTzDropdown)}
                      className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 py-1.5 px-2.5 rounded-lg hover:bg-blue-50/60 border border-slate-200 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#2651B9]" />
                        <span>
                          {timeZone} ({tzTimeStr})
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">▾</span>
                    </button>

                    {showTzDropdown && (
                      <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 max-h-48 overflow-y-auto text-xs">
                        {TIMEZONES.map((tz) => (
                          <button
                            key={tz.value}
                            type="button"
                            onClick={() => {
                              setTimeZone(tz.value);
                              setShowTzDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center justify-between ${
                              timeZone === tz.value ? "font-bold text-[#2651B9] bg-blue-50" : "text-slate-700"
                            }`}
                          >
                            <span>{tz.label}</span>
                            <span className="text-slate-400 text-[10px]">{tz.offset}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Confirmation Form */}
              {viewState === "form" && (
                <div className="p-6 sm:p-8 animate-fadeIn">
                  <button
                    type="button"
                    onClick={() => setViewState("calendar")}
                    className="text-xs font-semibold text-[#2651B9] hover:underline flex items-center gap-1 mb-4 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Calendar
                  </button>

                  <h3 className="font-agency text-2xl font-bold text-[#0C1E4E] mb-1">Confirm 30-Min Call</h3>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-blue-50/70 p-2.5 rounded-xl border border-blue-200/60 mb-5">
                    <CalendarIcon className="w-4 h-4 text-[#FF8500]" />
                    <span>
                      {monthName} {selectedDay}, {year} at {selectedTime}
                    </span>
                    <span className="ml-auto text-slate-500 text-[11px]">({timeZone})</span>
                  </div>

                  <form onSubmit={handleConfirmBooking} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0C1E4E] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0C1E4E] mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0C1E4E] mb-1">
                        What would you like to discuss?
                      </label>
                      <textarea
                        rows={2}
                        value={projectTopic}
                        onChange={(e) => setProjectTopic(e.target.value)}
                        placeholder="e.g. Logo rebrand, custom web design, timeline..."
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500] transition-colors resize-none"
                      />
                    </div>

                    <GsapMagneticButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 !bg-gradient-to-r !from-[#FF8500] !to-[#FFA229] hover:!from-[#e67700] hover:!to-[#FF8500] !text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#FF8500]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Scheduling...</span>
                      ) : (
                        <>
                          <span>Schedule Free Call</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </GsapMagneticButton>
                  </form>
                </div>
              )}

              {/* Step 3: Success Confirmation */}
              {viewState === "confirmed" && (
                <div className="p-8 text-center animate-fadeIn flex flex-col items-center justify-center min-h-[380px]">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 ring-8 ring-emerald-50/50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-agency text-3xl font-bold text-[#0C1E4E] mb-2">You&apos;re Scheduled!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 max-w-xs">
                    A calendar invitation has been sent to <span className="font-semibold text-[#0C1E4E]">{email}</span> with Google Meet and call details.
                  </p>

                  <div className="bg-blue-50/80 border border-blue-200/60 rounded-xl p-3 text-xs text-slate-700 w-full mb-6 text-left space-y-1">
                    <div className="font-bold text-[#0C1E4E]">30-Minute Discovery Call</div>
                    <div className="text-slate-600">
                      📅 {monthName} {selectedDay}, {year} • {selectedTime}
                    </div>
                    <div className="text-slate-600">👤 Host: Design Director, Pixim Design</div>
                  </div>

                  <button
                    type="button"
                    onClick={resetBooking}
                    className="text-xs font-bold text-[#FF8500] hover:underline cursor-pointer"
                  >
                    Schedule Another Time
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
