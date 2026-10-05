import React from "react";

/**
 * Renders both prices; CSS keyed on <html data-currency> shows the visitor's one.
 * This avoids a USD flash for Bangladesh visitors and any hydration mismatch.
 */
export const Price: React.FC<{ usd: string; bdt: string; className?: string }> = ({ usd, bdt, className = "" }) => (
  <>
    <span className={`cur-usd ${className}`}>{usd}</span>
    <span className={`cur-bdt ${className}`}>{bdt}</span>
  </>
);
