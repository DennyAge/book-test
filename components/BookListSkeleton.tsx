import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const BookListSkeleton = ({ view }: { view: string | string[] }) => {
  return (
    <div>
      <div className="container mx-auto flex justify-end md:justify-between items-center px-4 md:px-0 py-4 w-full">
        <div>
          <Skeleton className="hidden md:block w-50 h-10 rounded-md" />
        </div>
        <div className="flex items-center gap-x-4 overflow-hidden">
          <Skeleton className="w-100 h-10 rounded-md" />
          <Skeleton className="w-10 h-10 rounded-md" />
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
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn(
                "w-full rounded-lg",
                view === "grid" ? "h-80" : "h-40",
              )}
            />
          ))}
        </div>
        <div className="flex justify-center items-center gap-x-4  my-4">
          <Skeleton className=" w-15 h-10 rounded-lg" />
          <Skeleton className=" w-10 h-10 rounded-lg" />
          <Skeleton className=" w-15 h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
export default BookListSkeleton;
