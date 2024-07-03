import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const User = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  language: text("language").notNull(),
  password: text("password").notNull(),
});

export type InsertUser = typeof User.$inferInsert;
export type SelectUser = typeof User.$inferSelect;
