import config from "@/lib/config";

export const addBook = async (
  data: Omit<Book, "id" | "isFavorite" | "createdAt">,
) => {
  try {
    await fetch(`${config.env.apiEndpoint}/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: data.author,
        title: data.title,
        price: data.price,
        images: data.images,
        isFavorite: false,
      }),
    });
  } catch (error: unknown) {
    console.error(error);
  }
};

export const updateBook = async (updatedData: UpdatedBook) => {
  try {
    await fetch(`${config.env.apiEndpoint}/api/books`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...updatedData,
      }),
    });
  } catch (error: unknown) {
    console.error(error);
  }
};
