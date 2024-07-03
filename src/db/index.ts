// import dotenv from "dotenv";

// dotenv.config();

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { Card } from "./schemas/card";
import { Desk } from "./schemas/desk";
import { Code } from "./schemas/code";
import { Session } from "./schemas/session";
import { User } from "./schemas/user";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_DATABASE_AUTH_TOKEN!,
});

export const db = drizzle(client, {
  schema: {
    card: Card,
    code: Code,
    desk: Desk,
    session: Session,
    user: User,
  },
});
