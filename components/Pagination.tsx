import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  view: string | string[];
  searchQuery: string | string[];
  prevPage: number | null;
  nextPage: number | null;
}

const Pagination = ({
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  view,
  searchQuery,
}: PaginationProps) => {
  return (
    <>
      {totalPages > 1 && (
        <div className="flex justify-center items-center my-4 space-x-4">
          <Link
            className={cn(
              "px-3 py-1 border-2 rounded-md bg-black border-black text-white dark:bg-input/30 dark:border-input dark:text-foreground  text-2xl  flex items-center justify-center cursor-pointer",
              !prevPage && "hidden",
            )}
            href={`?page=${prevPage}&view=${view}&search=${searchQuery}`}
          >
            <IoIosArrowRoundBack />
          </Link>
          <span className="px-4 py-1 border-2 dark:bg-input/30 border-input rounded-md text-md font-semibold text-foreground flex items-center justify-center">
            {currentPage}
          </span>
          <Link
            className={cn(
              "px-3 py-1 border-2 rounded-md bg-black border-black text-white dark:bg-input/30 dark:border-input dark:text-foreground  text-2xl  flex items-center justify-center cursor-pointer",
              !nextPage && "hidden",
            )}
            href={`?page=${nextPage}&view=${view}&search=${searchQuery}`}
          >
            <IoIosArrowRoundForward />
          </Link>
        </div>
      )}
    </>
  );
};
export default Pagination;
