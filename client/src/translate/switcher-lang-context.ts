import { createContext, useContext } from "react";
import i18n from "../i18n";

export type SwitcherLangContent = {
  changeLanguage: (lng: string) => void;
};

export const SwitcherLangContext = createContext<SwitcherLangContent>({
  changeLanguage: (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("appLang", lng);
  },
} as SwitcherLangContent);

export const useSwitcherLangContext = () => useContext(SwitcherLangContext);
