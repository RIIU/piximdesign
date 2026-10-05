"use client";

import { useSyncExternalStore } from "react";
import { CURRENCY_STORAGE_KEY } from "./currency-bootstrap";

export type Currency = "USD" | "BDT";

const CHANGE_EVENT = "pixim:currency-change";

function readCurrency(): Currency {
  return document.documentElement.dataset.currency === "BDT" ? "BDT" : "USD";
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    // Keep tabs in sync when the choice changes elsewhere
    if (event.key === CURRENCY_STORAGE_KEY && (event.newValue === "USD" || event.newValue === "BDT")) {
      document.documentElement.dataset.currency = event.newValue;
      onChange();
    }
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setCurrency(currency: Currency) {
  document.documentElement.dataset.currency = currency;
  try {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Current display currency. Server render and hydration use USD, then React switches to
 * the visitor's currency without a hydration mismatch.
 */
export function useCurrency() {
  const currency = useSyncExternalStore<Currency>(subscribe, readCurrency, () => "USD");
  return { currency, setCurrency };
}
