import { cn } from "@/lib/utils";
import BookCard from "@/components/BookCard";
import EmptyData from "@/components/EmptyData";

interface BookListProps {
  books: Book[] | null;
  view: string | string[];
}

const BookList = ({ books, view }: BookListProps) => {
  if (!books) return;

  return (
    <div className="container mx-auto px-4 md:px-0">
      <div
        className={cn(
          "grid gap-4 pt-4 dark:border-input border-t border-gray-200",
          view === "grid"
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            : "grid-cols-1",
          books.length === 0 && "flex w-full justify-center items-center",
        )}
      >
        {books.length === 0 ? (
          <EmptyData />
        ) : (
          books.map((book) => <BookCard key={book.id} {...book} view={view} />)
        )}
      </div>
    </div>
  );
};
export default BookList;
