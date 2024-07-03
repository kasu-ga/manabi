import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { Session } from "./session";

export const Code = sqliteTable("code", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at").notNull(),
  sessionId: text("session_id")
    .notNull()
    .references(() => Session.id),
  action: text("action").notNull(),
  value: text("value").notNull(),
});

export type InsertCode = typeof Code.$inferInsert;
export type SelectCode = typeof Code.$inferSelect;
