"use client";
//core
import { LuBookPlus, LuCircleUserRound, LuHouse } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
//utils
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
//helpers
import { navigation_links } from "@/constants";

const MobileNavbar = () => {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
      ) {
        setAtBottom(true);
      } else {
        setAtBottom(false);
      }

      if (window.scrollY > lastScrollY) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const getIcon = (key: string) => {
    switch (key) {
      case "home":
        return <LuHouse className="w-6 h-6" />;
      case "profile":
        return <LuCircleUserRound className="w-6 h-6" />;
      default:
        return <LuBookPlus className="w-6 h-6" />;
    }
  };

  return (
    <nav
      className={cn(
        "w-full fixed bottom-0 z-20 bg-background p-4 flex justify-center items-center gap-x-18 " +
          "md:hidden dark:border-input border-t border-gray-200 transition-transform duration-300",
        scrollingDown && !atBottom
          ? "transform translate-y-full"
          : "transform translate-y-0",
      )}
    >
      {navigation_links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.key}
            href={link.href}
            className={cn(
              "flex flex-col justify-center items-center text-xs cursor-pointer hover:text-foreground",
              !isActive && "text-gray-400",
            )}
          >
            {getIcon(link.key)}

            <span className="mt-1">{t(link.key)}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNavbar;
