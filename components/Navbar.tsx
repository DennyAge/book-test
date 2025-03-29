//core
import { LuBookPlus } from "react-icons/lu";
import { useTranslations } from "next-intl";
import Image from "next/image";
//hooks
import { Link } from "@/i18n/navigation";
//utils
import { cn } from "@/lib/utils";
//components
import UserAvatar from "@/components/UserAvatar";

const Navbar = () => {
  const t = useTranslations();
  return (
    <header className="hidden md:flex fixed w-full h-20 z-20 top-0 backdrop-blur-lg">
      <div
        className={cn(
          "container mx-auto flex items-center justify-between w-full px-4 md:px-0 py-4 dark:border-input",
        )}
      >
        <Link href="/">
          <Image
            src="https://www.bookflea.co/logo.svg"
            alt="logo"
            width={100}
            height={40}
            className="logo invert w-auto h-auto"
            priority
          />
        </Link>
        <div className="flex items-center space-x-2">
          <Link
            className={cn(
              "flex items-center gap-x-2 px-4 text-sm md:text-base py-2  rounded-md border bg-foreground text-background  hover:opacity-80",
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
