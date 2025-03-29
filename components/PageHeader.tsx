import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import SearchInput from "@/components/SearchInput";

interface PageHeaderProps {
  searchQuery: string | string[];
  view: string | string[];
  currentPage: number;
}

const PageHeader = ({ searchQuery, view, currentPage }: PageHeaderProps) => {
  const t = useTranslations();

  return (
    <div className="sticky top-0 bg-background z-10 px-4">
      <div className="container mx-auto flex justify-end md:justify-between items-center py-4 w-full">
        <h1 className="hidden md:block text-lg font-semibold">
          {t("homePageTitle")}
        </h1>
        <div className="flex items-center gap-x-4 w-full md:w-max">
          <SearchInput defaultSearch={searchQuery} view={view} />
          <Link
            className="p-2 border dark:bg-input/30 border-input rounded cursor-pointer "
            href={`?view=${view === "grid" ? "list" : "grid"}&page=${currentPage}&search=${searchQuery}`}
          >
            {view === "grid" ? <LuLayoutList /> : <LuLayoutGrid />}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PageHeader;
