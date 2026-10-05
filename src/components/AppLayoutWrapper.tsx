"use client";

import React, { useState, createContext, useContext } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PaymentMethodsSection } from "./PaymentMethodsSection";
import { ContactModal } from "./ContactModal";
import { GlobalBackgroundAnimation } from "./animations";

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

          {/* Supported Payment Methods Section (Directly before Footer) */}
          <PaymentMethodsSection />

          {/* Persistent Footer across all pages */}
          <Footer />
        </div>

        {/* Global Consultation & Inquiry Modal */}
        <ContactModal
          isOpen={isModalOpen}
          onClose={closeContact}
          initialService={modalService}
          initialNotes={modalNotes}
        />
      </div>
    </ContactContext.Provider>
    </ThemeProvider>
  );
};
