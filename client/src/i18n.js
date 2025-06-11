import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homeEn from "./locales/en/home.json";
import homeSw from "./locales/sw/home.json";
import navbarEn from "./locales/en/navbar.json";
import navbarSw from "./locales/sw/navbar.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      home: homeEn,
      navbar: navbarEn,
    },
    sw: {
      home: homeSw,
      navbar: navbarSw,
    },
  },
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  ns: ["home", "navbar"],         // declare namespaces
  defaultNS: "home",              // use home as default unless specified
  interpolation: { escapeValue: false },
});

export default i18n;
