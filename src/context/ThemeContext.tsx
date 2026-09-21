"use client";

import React, { createContext, useContext, useEffect } from "react";

type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
    try {
      localStorage.setItem("pixim_theme", "dark");
    } catch {}
  }, []);

  const toggleTheme = () => {};
  const setTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme: "dark", toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
