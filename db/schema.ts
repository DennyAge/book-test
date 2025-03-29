import {
  uuid,
  pgTable,
  varchar,
  timestamp,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  author: varchar("author", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  images: varchar("images", { length: 255 }).array().notNull(),
  isFavorite: boolean("isFavorite").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
