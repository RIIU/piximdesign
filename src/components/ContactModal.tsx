"use client";

import React, { useRef } from "react";
import { X } from "lucide-react";
import { ContactSection } from "./ContactSection";
import { useDialog } from "@/lib/useDialog";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNotes?: string;
  initialService?: string;
}

const ContactDialog: React.FC<Omit<ContactModalProps, "isOpen">> = ({ onClose, initialNotes = "", initialService = "" }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialog(dialogRef, onClose);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Send us your project brief"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white/90 dark:bg-[#0D1322]/90 backdrop-blur-2xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border border-[#2651B9]/25 dark:border-[#2651B9]/40 p-2 sm:p-4 shadow-2xl focus:outline-none"
      >
        {/* Close Button */}
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#FF8500]/50 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <ContactSection initialNotes={initialNotes} initialService={initialService} />
      </div>
    </div>
  );
};

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, ...props }) => {
  if (!isOpen) return null;
  // Remount per request so the form starts from the service and notes that opened it
  return <ContactDialog key={`${props.initialService}|${props.initialNotes}`} {...props} />;
};
