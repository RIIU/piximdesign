"use client";

import React, { useState } from "react";
import { Eyebrow, GradientText } from "@/components/page-kit/shared";
import { 
  Palette, 
  Sliders, 
  Film, 
  FolderCheck, 
  Download, 
  Layers,
  Sparkles
} from "lucide-react";

interface StepItem {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: StepItem[] = [
  {
    id: "questionnaire",
    stepNumber: "01",
    title: "Questionnaire",
    description:
      "You fill out a short form that takes about ten minutes, and from your answers we learn what your product does, who buys it, and why anyone should care.",
  },
  {
    id: "storyboarding",
    stepNumber: "02",
    title: "Story boarding",
    description:
      "Before we start animating anything, you see exactly what the design will communicate and how every frame will look, and once you give your notes we lock the whole thing in.",
  },
  {
    id: "animation-dev",
    stepNumber: "03",
    title: "Final Animation",
    description:
      "Custom animation, illustrations, sound design, and clean code all come from the same in-house team, working on your project from the first day to the last.",
  },
  {
    id: "delivery",
    stepNumber: "04",
    title: "Delivery",
    description:
      "You get the variations for every platform you post on, usually within 2 weeks from kickoff.",
  },
];

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-32">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(38,81,185,0.15),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mb-14 sm:mb-20">
        <Eyebrow>How We Work</Eyebrow>
        <h2 className="mt-4 font-agency text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.08]">
          How your project moves <GradientText>from brief to launch</GradientText>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
          A predictable, transparent four-step pipeline from first brief to global launch.
        </p>
      </div>

      {/* Steps List */}
      <div className="relative space-y-12 sm:space-y-16">
        {/* Continuous minimal vertical line matching reference */}
        <div className="hidden lg:block absolute left-[7px] top-4 bottom-8 w-[1.5px] bg-slate-700/60 pointer-events-none" />

        {PROCESS_STEPS.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={step.id}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              onMouseEnter={() => setActiveStep(idx)}
            >
              {/* Left Column: Minimal Stepper & Typography */}
              <div className="lg:col-span-5 relative pl-0 lg:pl-10">
                {/* Minimal White Square Node matching reference image */}
                <div
                  className="hidden lg:block absolute left-[3.5px] top-2 w-2.5 h-2.5 rounded-[2px] transition-all duration-300 pointer-events-none"
                  style={{
                    backgroundColor: isActive ? "#FF8500" : "#FFFFFF",
                    boxShadow: isActive
                      ? "0 0 14px rgba(255, 133, 0, 0.9), 0 0 4px rgba(255, 133, 0, 0.6)"
                      : "0 0 8px rgba(255, 255, 255, 0.5)",
                  }}
                />

                <div className="flex items-center gap-2 mb-2 lg:hidden">
                  <span className="w-2 h-2 rounded-[2px] bg-[#FF8500]" />
                  <span className="text-xs font-mono font-bold text-[#FFA133]">Step {step.stepNumber}</span>
                </div>

                {/* Minimal Title + Superscript Badge */}
                <h3 className="font-agency text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
                  <span>{step.title}</span>
                  <span className="font-mono text-xs font-bold text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded tracking-normal">
                    {step.stepNumber}
                  </span>
                </h3>

                {/* Clean, concise paragraph */}
                <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Right Column: Visual Mockup Card */}
              <div className="lg:col-span-7">
                <div className="relative rounded-[24px] border border-[#2651B9]/30 bg-gradient-to-br from-[#0C1E4E]/85 via-[#0A183D] to-[#06102A] p-5 sm:p-7 shadow-[0_12px_36px_rgba(4,10,28,0.45)] overflow-hidden transition-all duration-300 hover:border-[#FF8500]/50 hover:shadow-[0_12px_30px_rgba(255,133,0,0.12)]">
                  {/* Subtle backlight */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-[#2452C7]/15 via-[#FF8500]/10 to-transparent blur-3xl pointer-events-none" />

                  {/* STEP 1: Questionnaire Chat UI Mockup */}
                  {idx === 0 && (
                    <div className="space-y-3 relative z-10 py-1">
                      {/* Bubble 1: Studio Question */}
                      <div className="flex items-start gap-2.5 max-w-[85%]">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#2452C7] to-[#FF8500] flex items-center justify-center text-white text-[9px] font-black shrink-0">
                          PX
                        </div>
                        <div className="p-2.5 sm:p-3 rounded-2xl rounded-tl-sm bg-[#16295C]/80 border border-[#2651B9]/40 text-xs text-slate-200">
                          What does your product do?
                        </div>
                      </div>

                      {/* Bubble 2: Client Answer */}
                      <div className="flex items-start gap-2.5 max-w-[85%] ml-auto justify-end">
                        <div className="p-2.5 sm:p-3 rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#FF8500] to-[#E66000] text-white text-xs font-medium shadow-md shadow-orange-500/15">
                          SaaS project management tool for startups
                        </div>
                        <div className="w-6 h-6 rounded-md bg-slate-700 border border-white/20 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                          YOU
                        </div>
                      </div>

                      {/* Bubble 3: Studio Question 2 */}
                      <div className="flex items-start gap-2.5 max-w-[85%]">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#2452C7] to-[#FF8500] flex items-center justify-center text-white text-[9px] font-black shrink-0">
                          PX
                        </div>
                        <div className="p-2.5 sm:p-3 rounded-2xl rounded-tl-sm bg-[#16295C]/80 border border-[#2651B9]/40 text-xs text-slate-200">
                          Who is your ideal customer?
                        </div>
                      </div>

                      {/* Bubble 4: Client Answer 2 */}
                      <div className="flex items-start gap-2.5 max-w-[85%] ml-auto justify-end">
                        <div className="p-2.5 sm:p-3 rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#FF8500] to-[#E66000] text-white text-xs font-medium shadow-md shadow-orange-500/15">
                          Founders &amp; operation teams at early-stage startups
                        </div>
                        <div className="w-6 h-6 rounded-md bg-slate-700 border border-white/20 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                          YOU
                        </div>
                      </div>

                      {/* Typing indicator */}
                      <div className="flex items-center gap-1.5 pl-8 pt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Storyboarding & Direction Deck Mockup */}
                  {idx === 1 && (
                    <div className="relative z-10 py-1">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {/* Card: Color Palette */}
                        <div className="p-3 rounded-xl bg-[#091535] border border-[#2651B9]/35 hover:border-[#FF8500]/40 transition-colors">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-2">
                            <Palette className="w-3 h-3 text-[#FF8500]" />
                            <span>Color Palette</span>
                          </div>
                          <div className="flex gap-1.5">
                            <span className="w-5 h-5 rounded-md bg-[#081330] border border-white/20" />
                            <span className="w-5 h-5 rounded-md bg-[#2452C7]" />
                            <span className="w-5 h-5 rounded-md bg-[#FF8500]" />
                            <span className="w-5 h-5 rounded-md bg-[#F8FAFC]" />
                          </div>
                        </div>

                        {/* Card: Motion Style */}
                        <div className="p-3 rounded-xl bg-[#091535] border border-[#2651B9]/35 hover:border-[#FF8500]/40 transition-colors">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-1.5">
                            <Film className="w-3 h-3 text-cyan-400" />
                            <span>Motion Style</span>
                          </div>
                          <div className="h-5 flex items-center gap-1">
                            <span className="w-1 h-3 bg-cyan-400/80 rounded-full" />
                            <span className="w-1 h-5 bg-cyan-400 rounded-full" />
                            <span className="w-1 h-2.5 bg-cyan-400/60 rounded-full" />
                            <span className="w-1 h-4 bg-cyan-400 rounded-full" />
                          </div>
                        </div>

                        {/* Card: Tone & Voice */}
                        <div className="p-3 rounded-xl bg-[#091535] border border-[#2651B9]/35 hover:border-[#FF8500]/40 transition-colors col-span-2 sm:col-span-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-1.5">
                            <Sliders className="w-3 h-3 text-emerald-400" />
                            <span>Tone &amp; Voice</span>
                          </div>
                          <div className="flex gap-1">
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-300 font-semibold border border-emerald-400/20">
                              Bold
                            </span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-400/10 text-blue-300 font-semibold border border-blue-400/20">
                              Clean
                            </span>
                          </div>
                        </div>

                        {/* Card: Scene Direction */}
                        <div className="p-3 rounded-xl bg-[#091535] border border-[#2651B9]/35 hover:border-[#FF8500]/40 transition-colors col-span-2 sm:col-span-2">
                          <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                            <span>Scene Direction</span>
                            <span className="text-[10px] font-mono text-[#FFA133]">04 Sections</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5 h-9">
                            <div className="rounded bg-[#16295C]/60 border border-blue-400/20 p-1 flex items-end">
                              <span className="text-[8px] font-mono text-slate-300 truncate">Intro</span>
                            </div>
                            <div className="rounded bg-[#16295C]/60 border border-blue-400/20 p-1 flex items-end">
                              <span className="text-[8px] font-mono text-slate-300 truncate">Core</span>
                            </div>
                            <div className="rounded bg-[#16295C]/60 border border-blue-400/20 p-1 flex items-end">
                              <span className="text-[8px] font-mono text-slate-300 truncate">Stats</span>
                            </div>
                            <div className="rounded bg-[#FF8500]/15 border border-[#FF8500]/40 p-1 flex items-end">
                              <span className="text-[8px] font-mono text-[#FFA133] truncate">CTA</span>
                            </div>
                          </div>
                        </div>

                        {/* Card: Visual Reference */}
                        <div className="p-3 rounded-xl bg-[#091535] border border-[#2651B9]/35 hover:border-[#FF8500]/40 transition-colors">
                          <div className="text-xs font-bold text-white mb-1">Visual Reference</div>
                          <div className="text-[9px] text-slate-400">Dark High-Tech UI</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Animation & Timeline Editor Mockup */}
                  {idx === 2 && (
                    <div className="relative z-10 py-1 space-y-2.5">
                      {/* Mini Preview Screen */}
                      <div className="p-2.5 rounded-xl bg-[#081330] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2452C7] to-[#FF8500] flex items-center justify-center text-white">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Interactive Production Track</div>
                            <div className="text-[9px] text-slate-400 font-mono">React 19 • GSAP Motion • CSS</div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                          Active
                        </span>
                      </div>

                      {/* Timeline Tracks */}
                      <div className="space-y-1.5 font-mono text-[10px]">
                        <div className="flex items-center gap-2">
                          <span className="w-16 text-slate-400 text-[9px] shrink-0">UI Engine</span>
                          <div className="flex-1 h-4 rounded bg-slate-900 border border-white/5 flex items-center overflow-hidden p-0.5">
                            <div className="h-full w-2/3 rounded bg-gradient-to-r from-blue-600 to-indigo-500 px-1.5 text-[8px] text-white flex items-center">
                              Components
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="w-16 text-slate-400 text-[9px] shrink-0">Motion</span>
                          <div className="flex-1 h-4 rounded bg-slate-900 border border-white/5 flex items-center overflow-hidden p-0.5">
                            <div className="h-full w-4/5 rounded bg-gradient-to-r from-[#FF8500] to-amber-500 px-1.5 text-[8px] text-slate-900 font-bold flex items-center">
                              Keyframes &amp; Easing
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="w-16 text-slate-400 text-[9px] shrink-0">Audio</span>
                          <div className="flex-1 h-4 rounded bg-slate-900 border border-white/5 flex items-center overflow-hidden p-0.5">
                            <div className="h-full w-1/2 rounded bg-gradient-to-r from-cyan-600 to-emerald-500 px-1.5 text-[8px] text-white flex items-center">
                              Sound Layers
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Delivery Package Mockup */}
                  {idx === 3 && (
                    <div className="relative z-10 py-1">
                      <div className="p-3.5 rounded-xl bg-[#091535] border border-[#2651B9]/35 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#FF8500] to-amber-400 p-0.5 shrink-0">
                            <div className="w-full h-full rounded-[6px] bg-[#081330] flex items-center justify-center text-[#FFA133]">
                              <Download className="w-5 h-5 stroke-[2.2]" />
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white font-agency tracking-wide">
                              pixim_master_deliverables.zip
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Master Vector Files • Figma • Source Code
                            </div>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold shrink-0">
                          Ready
                        </span>
                      </div>

                      {/* Format Badges */}
                      <div className="mt-3 grid grid-cols-4 gap-1.5 text-center">
                        <div className="p-2 rounded-lg bg-[#081330] border border-white/10 text-[10px] font-mono text-white">
                          .AI / .EPS
                        </div>
                        <div className="p-2 rounded-lg bg-[#081330] border border-white/10 text-[10px] font-mono text-[#FFA133]">
                          FIGMA
                        </div>
                        <div className="p-2 rounded-lg bg-[#081330] border border-white/10 text-[10px] font-mono text-cyan-400">
                          CODE
                        </div>
                        <div className="p-2 rounded-lg bg-[#081330] border border-white/10 text-[10px] font-mono text-emerald-400">
                          WARRANTY
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
