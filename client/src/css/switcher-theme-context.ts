import { createContext, useContext } from "react";

export type SwitcherThemeContent = {
  currentTheme: string;
  setTheme: (name: string) => void;
};

export const SwitcherThemeContext = createContext<SwitcherThemeContent>({
  currentTheme: "normal",
  setTheme: (name: string) => {
    localStorage.setItem("appTheme", name);
  },
} as SwitcherThemeContent);

export const useSwitcherThemeContext = () => useContext(SwitcherThemeContext);
