import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homeEn from "./locales/en/home.json";
import homeSw from "./locales/sw/home.json";
import navbarEn from "./locales/en/navbar.json";
import navbarSw from "./locales/sw/navbar.json";
import communityEn from "./locales/en/community.json";
import communitySw from "./locales/sw/community.json";
import healthEn from "./locales/en/health.json";
import healthSw from "./locales/sw/health.json";
import supportEn from "./locales/en/support.json";
import supportSw from "./locales/sw/support.json";
import educationSw from "./locales/sw/education.json";
import educationEn from "./locales/en/education.json";
import footerEn from "./locales/en/footer.json";
import footerSw from "./locales/sw/footer.json";
import opportunitiesEn from "./locales/en/opportunities.json";
import opportunitiesSw from "./locales/sw/opportunities.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      home: homeEn,
      navbar: navbarEn,
      community: communityEn,
      health: healthEn,
      support: supportEn,
      education: educationEn,
      footer: footerEn,
      opportunities: opportunitiesEn,
    },
    sw: {
      home: homeSw,
      navbar: navbarSw,
      community: communitySw,
      health: healthSw,
      support: supportSw,
      education: educationSw,
      footer: footerSw,
      opportunities: opportunitiesSw,
    },
  },
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  ns: ["home", "navbar", "community", "health", "support", "education", "footer", "opportunities"], // declare namespaces
  defaultNS: "home", // use home as default unless specified
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export default i18n;
