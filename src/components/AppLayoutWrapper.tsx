"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TakeFirstStepSection } from "./TakeFirstStepSection";
import { PaymentMethodsSection } from "./PaymentMethodsSection";
import { GlobalBackgroundAnimation } from "@/components/animations/GlobalBackgroundAnimation";

// Performance: the contact modal (form + validation) is split into its own chunk.
// It is fetched in the background once the page is idle, and only mounted when opened.
const loadContactModal = () => import("./ContactModal");
const ContactModal = dynamic(() => loadContactModal().then((m) => m.ContactModal), { ssr: false });

interface ContactContextType {
  openContact: (service?: string, notes?: string) => void;
  closeContact: () => void;
}

const ContactContext = createContext<ContactContextType>({
  openContact: () => {},
  closeContact: () => {},
});

export const useContactModal = () => useContext(ContactContext);

export const AppLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState("");
  const [modalNotes, setModalNotes] = useState("");

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    const prefetch = () => { loadContactModal().catch(() => {}); };
    if (w.requestIdleCallback) {
      const id = window.setTimeout(() => w.requestIdleCallback!(prefetch, { timeout: 4000 }), 2500);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(prefetch, 3500);
    return () => window.clearTimeout(id);
  }, []);

  const openContact = (service = "", notes = "") => {
    setModalService(service);
    setModalNotes(notes);
    setIsModalOpen(true);
  };

  const closeContact = () => {
    setIsModalOpen(false);
    setModalService("");
    setModalNotes("");
  };

  return (
    <ThemeProvider>
      <ContactContext.Provider value={{ openContact, closeContact }}>
        <div className="relative min-h-screen flex flex-col bg-[#081330] text-[#F8FAFC] selection:bg-[#FF8500]/25 selection:text-white overflow-x-clip">
          {/* Global Dynamic Ambient Background Animation across all pages */}
          <GlobalBackgroundAnimation />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          {/* Keyboard users can jump straight past the navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#FF8500] focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
          >
            Skip to main content
          </a>

          {/* Persistent Sticky Navbar across all pages */}
          <Navbar onOpenContact={() => openContact()} />

          {/* Page Content */}
          <main id="main-content" tabIndex={-1} className="flex-1 w-full focus:outline-none">
            {children}
          </main>

          {/* Pre-footer Closing Banner across all pages */}
          <TakeFirstStepSection onOpenContact={(svc, notes) => openContact(svc, notes)} />

          {/* Persistent Footer across all pages (includes Payment Methods & Company Deck) */}
          <Footer />
        </div>

        {/* Global Consultation & Inquiry Modal */}
        {isModalOpen && (
        <ContactModal
          isOpen={isModalOpen}
          onClose={closeContact}
          initialService={modalService}
          initialNotes={modalNotes}
        />
        )}
      </div>
    </ContactContext.Provider>
    </ThemeProvider>
  );
};
