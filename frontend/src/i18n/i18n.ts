import { initReactI18next } from "react-i18next";
import { format as formatDate, isDate } from "date-fns";
import { enUS, pl } from "date-fns/locale";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import englishResources from "./resources/en";
import polishResources from "./resources/pl";

const locales = { enUS, pl };

export const resources = {
  enUS: {
    translation: englishResources,
  },
  pl: {
    translation: polishResources,
  },
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "enUS",
    supportedLngs: ["enUS", "pl"],
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (isDate(value)) {
          const locale = locales[lng as "enUS" | "pl"];
          return formatDate(value, format || "MMM. d, yyyy", { locale });
        }
        return value;
      },
    },
    resources,
  });

export default i18n;
