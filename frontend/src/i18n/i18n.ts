import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./resources/en";
import pl from "./resources/pl";

export const resources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "pl"],
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
