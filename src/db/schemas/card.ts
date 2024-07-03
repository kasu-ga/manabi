import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { Desk } from "./desk";
import { relations } from "drizzle-orm";

export const Card = sqliteTable("card", {
  id: text("id").primaryKey(),

  deskId: text("desk_id")
    .notNull()
    .references(() => Desk.id),

  frontText: text("front_text"),
  frontReading: text("front_reading"),
  frontAudio: text("front_audio"),
  frontImage: text("front_image"),

  backText: text("back_text"),
  backReading: text("back_reading"),
  backAudio: text("back_audio"),
  backImage: text("back_image"),

  created_at: integer("created_at").default(Date.now()),
  updated_at: integer("updated_at").default(Date.now()),

  lastReviewDate: integer("last_review_date"),
  lastPerformanceRating: integer("last_performance_rating"),
  nextReviewDate: integer("next_review_date"),
  isNew: integer("is_new").default(0),
});

export type InsertCard = typeof Card.$inferInsert;
export type SelectCard = typeof Card.$inferSelect;
