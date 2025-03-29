interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  images: string[];
  isFavorite: boolean | null;
  createdAt: Date | null;
}

interface UpdatedBook {
  id?: string;
  title?: string;
  author?: string;
  price?: string;
  images?: string[];
  isFavorite?: boolean | null;
}
