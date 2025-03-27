"use client";
//core
import { LuBookPlus, LuCircleUserRound, LuHouse } from "react-icons/lu";
import { useTranslations } from "next-intl";
//utils
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
//mookdata
import { navigation_links } from "@/constants";

const MobileNavbar = () => {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

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
    <div className="w-full fixed bottom-0 z-20 backdrop-blur-2xl p-4 flex justify-center items-center gap-x-18 md:hidden border-t border-muted-foreground">
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
    </div>
  );
};

export default MobileNavbar;
