import { Mixe } from "mixejs";
import { DrizzleSQLiteAdapter } from "@mixejs/drizzle";

import { db } from "@/db";
import { User } from "@/db/schemas/user";
import { Session } from "@/db/schemas/session";
import { Code } from "@/db/schemas/code";

export const MIXE_SECRET = process.env.MIXE_SECRET;

const adapter = new DrizzleSQLiteAdapter(db, {
  user: User,
  session: Session,
  code: Code,
});

export const mixe = new Mixe(adapter, {
  secret: MIXE_SECRET ?? "",
});
