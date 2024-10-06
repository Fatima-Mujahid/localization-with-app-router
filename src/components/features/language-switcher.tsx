"use client";
import React, { useState } from "react";
import Image from "next/image";
import { setCookie } from "cookies-next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface LanguageSwitcherI {
  locale: string;
}

const languages = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Spanish",
    value: "es",
  },
  {
    label: "Arabic",
    value: "ar",
  },
];

const LanguageSwitcher: React.FC<LanguageSwitcherI> = ({ locale }) => {
  const [language, setLanguage] = useState(locale);
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setCookie("language", lang);
    router.refresh();
  };

  return (
    <Select value={language} onValueChange={changeLanguage}>
      <SelectTrigger className="w-full max-w-40 ocus:ring-0 focus:ring-offset-0 focus:outline-none border-0 lg:border">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            <div className="flex gap-2 items-center justify-center">
              <Image
                src={`/${item.label.toLowerCase()}.png`}
                width={24}
                height={20}
                alt={item.label}
                className="min-h-5 min-w-6"
              />
              <p className="hidden md:block text-sm text-gray-600 font-sans">
                {item.label}
              </p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { LanguageSwitcher };
