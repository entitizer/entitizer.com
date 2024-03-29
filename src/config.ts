export const Config = {
  api: {
    url: process.env.API_URL,
    locales: {
      ro: ["ro", "md"],
      ru: ["ru", "md"],
      bg: ["bg"],
      hu: ["hu"],
      cs: ["cz"],
      it: ["it"],
      en: ["in"],
      es: ["es"]
    },
    defaultLocale: {
      lang: "ro",
      country: "ro"
    },
    demoText:
      'Președintele Statelor Unite, Donald Trump, a sugerat, luni, că viitoarea sa întâlnire cu liderul regimului de la Phenian, Kim Jong-un, ar putea avea loc în "Casa Păcii", situată la granița dintre Coreea de Nord și Coreea de Sud, relatează site-ul agenției Yonhap'
  }
};
