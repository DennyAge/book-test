"use client";
//core
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useLocale } from "use-intl";
import { Locale } from "next-intl";
//utils
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
//components
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSelect = () => {
  const t = useTranslations("LocaleSwitcher");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  const onSelectChange = (value: Locale) => {
    const nextLocale = value;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  return (
    <Select
      defaultValue={locale}
      disabled={isPending}
      onValueChange={(value) => onSelectChange(value)}
    >
      <SelectTrigger className="w-[80px] cursor-pointer dark:bg-input/30 border-input">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {routing.locales.map((cur) => (
            <SelectItem className="cursor-pointer" key={cur} value={cur}>
              {t("locale", { locale: cur })}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
