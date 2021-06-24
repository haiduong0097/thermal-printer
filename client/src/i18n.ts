import i18n from "i18next";
import translate_en from "./translate/en/translate.json";
import translate_vi from "./translate/vi/translate.json";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  ns: ["translate"],
  defaultNS: "translate",
  fallbackLng: "en",
  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  lng: localStorage.getItem("appLang") || "vi",
  resources: {
    en: {
      translate: translate_en,
    },
    vi: {
      translate: translate_vi,
    },
  },
});

export default i18n;
