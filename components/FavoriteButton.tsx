"use client";

//core
import { useState } from "react";
import { PiHeart, PiHeartFill } from "react-icons/pi";
//utils
import { updateBook } from "@/lib/actions/books";
import { cn } from "@/lib/utils";
//components
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

interface FavoriteButtonProps {
  bookId: string;
  isFavorite: boolean | null;
}

const FavoriteButton = ({ bookId, isFavorite }: FavoriteButtonProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const updateFavorite = async () => {
    if (loading) return;
    setFavorite((prev) => !prev);
    setLoading(true);

    try {
      await updateBook({ id: bookId, isFavorite: !favorite });
    } catch (error) {
      console.error(error);
      setFavorite((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("absolute top-2 right-2")}>
      {loading && <Loader />}
      <Button
        onClick={updateFavorite}
        size="icon"
        variant="icon"
        className="backdrop-blur-xs"
      >
        {favorite ? <PiHeartFill className="text-red-600" /> : <PiHeart />}
      </Button>
    </div>
  );
};
export default FavoriteButton;
