//core
import Image from "next/image";
import { PiHeartFill, PiHeart } from "react-icons/pi";
//store
import { useBookStore } from "@/store/books";
//utils
import { cn } from "@/lib/utils";
//components
import { Button } from "@/components/ui/button";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  price: string;
  image: string[];
  isFavorite: boolean;
  view: "grid" | "list";
}

export const BookCard = ({
  id,
  title,
  author,
  price,
  image,
  isFavorite,
  view,
}: BookCardProps) => {
  const { toggleFavorite } = useBookStore();

  return (
    <div
      className={cn(
        "border dark:bg-input/30 border-input rounded-lg relative shadow-sm group",
        view === "grid" ? "flex flex-col  p-4" : "flex items-center space-x-4",
      )}
    >
      <Image
        src={image[0] || "/images/book3.jpg"}
        width="100"
        height="100"
        alt={title}
        loading="lazy"
        className={cn(
          view === "grid"
            ? "w-max mx-auto h-80 rounded-lg mb-2"
            : "w-32 h-40 object-cover rounded-lg",
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
        <div
          className={cn(
            "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity",
          )}
        >
          <Button size="icon" variant="icon" onClick={() => toggleFavorite(id)}>
            {isFavorite ? (
              <PiHeartFill className="text-red-600" />
            ) : (
              <PiHeart />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
