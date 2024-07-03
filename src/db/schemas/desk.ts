import shortId from "short-uuid";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { User } from "./user";

export const Desk = sqliteTable("desk", {
  id: text("id").primaryKey().default(shortId.generate()),
  created_at: integer("created_at").default(Date.now()),
  updated_at: integer("updated_at").default(Date.now()),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => User.id),
  lastReviewDate: integer("last_review_date"),
});

export type InsertDesk = typeof Desk.$inferInsert;
export type SelectDesk = typeof Desk.$inferSelect;
