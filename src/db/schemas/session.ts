import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { User } from "./user";

export const Session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => User.id),
  restricted: integer("restricted").notNull(),
  limited: integer("limited").notNull(),
});

export type InsertSession = typeof Session.$inferInsert;
export type SelectSession = typeof Session.$inferSelect;
