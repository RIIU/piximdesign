"use client";

import React, { useState, createContext, useContext } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
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
          {/* Persistent Sticky Navbar across all pages */}
          <Navbar onOpenContact={() => openContact()} />

          {/* Page Content */}
          <main className="flex-1 w-full">{children}</main>

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
