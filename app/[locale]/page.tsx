"use client";

//core
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
//store
import { useBookStore } from "@/store/books";
//components
import { Skeleton } from "@/components/ui/skeleton";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const { books, fetchBooks } = useBookStore();
  const t = useTranslations();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const booksPerPage = 10;

  useEffect(() => {
    setLoading(true);
    if (books.length <= 0) {
      fetchBooks();
    }
    setTimeout(() => setLoading(false), 1000);
  }, [books.length, fetchBooks]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedBooks = filteredBooks.slice(
    (page - 1) * booksPerPage,
    page * booksPerPage,
  );

  return (
    <section className="py-6">
      <div className="sticky top-0 bg-background z-10 px-4">
        <div className="container mx-auto flex justify-end md:justify-between items-center py-4 w-full">
          <h1 className="hidden md:block text-lg font-semibold">
            {t("homePageTitle")}
          </h1>
          <div className="flex items-center gap-x-4 w-full md:w-max">
            <Input
              placeholder={t("searchInputPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={() => setView(view === "grid" ? "list" : "grid")}
            >
              {view === "grid" ? <LuLayoutList /> : <LuLayoutGrid />}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-0">
        <div
          className={cn(
            "grid gap-4 pt-4 border-t border-gray-200",
            view === "grid"
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              : "grid-cols-1",
          )}
        >
          {loading
            ? Array.from({ length: booksPerPage }).map((_, index) => (
                <Skeleton key={index} className="w-full h-80 rounded-lg" />
              ))
            : paginatedBooks.map((book) => (
                <BookCard key={book.id} {...book} view={view} />
              ))}
        </div>

        {filteredBooks.length > booksPerPage && !loading && (
          <div className="flex justify-center mt-4 space-x-2">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <IoIosArrowRoundBack />
            </Button>
            <span className="px-4 py-1 border rounded">{page}</span>
            <Button
              disabled={page * booksPerPage >= filteredBooks.length}
              onClick={() => setPage(page + 1)}
            >
              <IoIosArrowRoundForward />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
