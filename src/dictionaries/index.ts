import "server-only";
import { Locale } from "@/types";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  es: () => import("./es.json").then((module) => module.default),
  ar: () => import("./ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
