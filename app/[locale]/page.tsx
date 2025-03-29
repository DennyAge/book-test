//core
import { Suspense } from "react";
import { db } from "@/db";
import { books } from "@/db/schema";
import { desc, ilike, and, or } from "drizzle-orm";

//components
import BookList from "@/components/BookList";
import Pagination from "@/components/Pagination";
import PageHeader from "@/components/PageHeader";
import BookListSkeleton from "@/components/BookListSkeleton";

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const limit = 10;
  const { search = "", page = "1", view = "grid" } = await searchParams;
  const currentPage = parseInt(page.toString(), 10);
  const offset = (currentPage - 1) * limit;

  const whereClause = and(
    or(ilike(books.title, `%${search}%`), ilike(books.author, `%${search}%`)),
  );

  const allBooks = await db
    .select()
    .from(books)
    .where(whereClause)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(books.createdAt));

  const totalBooksResult = await db.select().from(books).where(whereClause);
  const totalBooks = totalBooksResult.length;

  const totalPages = Math.ceil(totalBooks / limit);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <Suspense fallback={<BookListSkeleton view={view} />}>
      <section className="container mx-auto border-y border-gray-200">
        <PageHeader
          searchQuery={search}
          view={view}
          currentPage={currentPage}
        />
        <BookList books={allBooks} view={view} />
        <Pagination
          searchQuery={search}
          view={view}
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </section>
    </Suspense>
  );
};

export default HomePage;
