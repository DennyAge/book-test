"use client";

//core
import { LuBookPlus } from "react-icons/lu";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
//hooks
import { Link } from "@/i18n/navigation";
//utils
import { cn } from "@/lib/utils";
//components
import UserAvatar from "@/components/UserAvatar";

const Navbar = () => {
  const { theme } = useTheme();
  const t = useTranslations();
  return (
    <header className="hidden md:flex sticky z-20 top-0 backdrop-blur-lg">
      <div
        className={cn(
          "container mx-auto flex items-center justify-between w-full px-4 md:px-0 py-4 border-b border-gray-200",
        )}
      >
        <Link href="/">
          <Image
            src="https://www.bookflea.co/logo.svg"
            alt="logo"
            width={100}
            height={40}
            className={cn(theme === "dark" ? "invert" : "")}
          />
        </Link>
        <div className="flex items-center space-x-2">
          <Link
            className={cn(
              "flex items-center gap-x-2 px-4 text-sm md:text-base py-2  rounded-md border ",
              theme === "dark"
                ? " bg-white text-black border-white hover:opacity-80"
                : "bg-black text-white border-white hover:opacity-80",
            )}
            href="/sell"
          >
            <LuBookPlus /> {t("sellBookBtnText")}
          </Link>
          <UserAvatar />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
