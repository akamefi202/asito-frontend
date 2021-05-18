/* eslint-disable import/prefer-default-export */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import nl from "./nl";

i18n.use(initReactI18next).init({
  fallbackLng: "nl",

  resources: {
    nl,
  },

  lng: "nl",

  ns: ["global"],
  defaultNS: "global",
  debug: false,
  // keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
/* eslint-enable import/prefer-default-export */
