//сore
import { useTranslations } from "next-intl";
//utils
import { Link } from "@/i18n/navigation";
//helpers
import { footer_links } from "@/constants";
//components
import LanguageSelect from "@/components/LanguageSelect";
import ThemeSwitch from "@/components/ThemeSwitch";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="pb-24 md:pb-4 container mx-auto flex justify-between md:items-center px-4 md:px-0 py-4 dark:border-input">
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm md:gap-x-8">
        <h5 className="md:w-max w-full text-nowrap font-semibold">
          © 2024 BookFlea.
        </h5>
        {footer_links.map((link) => (
          <Link
            key={link}
            href="/"
            className="text-muted-foreground hover:underline w-max text-nowrap"
          >
            {t(`${link}`)}
          </Link>
        ))}
      </div>

      <div className="flex items-start space-x-2 ">
        <LanguageSelect />
        <ThemeSwitch />
      </div>
    </footer>
  );
};
export default Footer;
