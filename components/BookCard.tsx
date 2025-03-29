//core
import Image from "next/image";
//utils
import { cn } from "@/lib/utils";
//components
import FavoriteButton from "@/components/FavoriteButton";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  images: string[];
  isFavorite: boolean | null;
  view: string | string[];
}

const BookCard = async ({
  id,
  title,
  author,
  price,
  images,
  isFavorite,
  view,
}: BookCardProps) => {
  return (
    <div
      className={cn(
        "border dark:bg-input/30 border-input rounded-lg relative shadow-sm group",
        view === "grid" ? "flex flex-col p-4" : "flex items-center space-x-4",
      )}
    >
      <Image
        src={images[0] || "/images/book3.jpg"}
        width="150"
        height="100"
        alt={title}
        loading="lazy"
        className={cn(
          view === "grid"
            ? " mx-auto h-60 w-50 rounded-lg mb-2"
            : "w-32 h-40 object-cover rounded-tl-lg rounded-bl-lg",
        )}
      />
      <div
        className={cn(
          view === "grid"
            ? "mt-2"
            : "flex-1 flex flex-col justify-between pr-4",
        )}
      >
        <p className="text-sm text-gray-500">{author}</p>
        <h3 className="font-semibold mb-3">{title}</h3>
        <p className={cn("text-lg", view !== "grid" && "text-right")}>
          {price} zł
        </p>
        <FavoriteButton bookId={id} isFavorite={isFavorite} />
      </div>
    </div>
  );
};

export default BookCard;
