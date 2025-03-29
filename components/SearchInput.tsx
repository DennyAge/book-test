"use client";

import { ChangeEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LuSearch } from "react-icons/lu";
import { GrFormClose } from "react-icons/gr";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

interface SearchInputProps {
  defaultSearch: string | string[];
  view?: string | string[];
}

const SearchInput = ({ defaultSearch, view }: SearchInputProps) => {
  const t = useTranslations();
  const [inputValue, setInputValue] = useState(defaultSearch);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleClear = () => {
    setInputValue("");
    router.push(`?view=${view}`);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <form action="/" method="get" className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        name="search"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={t("searchInputPlaceholder")}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary " +
            "selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full" +
            " min-w-0 rounded-md border bg-transparent pl-3 pr-14 py-1 text-base shadow-xs transition-[color,box-shadow]" +
            " outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium" +
            " disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ",
        )}
      />
      {inputValue && (
        <button
          onClick={handleClear}
          type="reset"
          className="absolute top-2 right-10 text-foreground text-xl cursor-pointer"
        >
          <GrFormClose />
        </button>
      )}
      <button
        type="submit"
        className="absolute top-0 right-0 bg-foreground text-background text-xl h-9 px-2 rounded-br-md rounded-tr-md cursor-pointer"
      >
        <LuSearch />
      </button>
    </form>
  );
};

export default SearchInput;
