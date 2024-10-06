import { headers } from "next/headers";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/types";
import { LanguageSwitcher } from "@/components/features/language-switcher";
import { DEFAULT_LOCALE } from "@/lib/constants";

export default async function Home() {
  const locale = headers().get("locale") || DEFAULT_LOCALE;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center w-full">
        <LanguageSwitcher locale={locale} />
        <div className="my-8 text-3xl">{dict.greeting}</div>
      </div>
    </main>
  );
}
