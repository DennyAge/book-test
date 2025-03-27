export const footer_links = ["faq", "startWithBookflea", "terms", "privacy"];

export const navigation_links = [
  { key: "home", href: "/", icon: "home" },
  { key: "sell", href: "/sell", icon: "book" },
  { key: "profile", href: "/profile", icon: "user" },
];

export const mockBooks = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Книга ${i + 1}`,
  author: `Автор ${i + 1}`,
  price: (Math.random() * 1000).toFixed(2),
  image: [`/images/book4.jpg`],
  isFavorite: false,
}));
