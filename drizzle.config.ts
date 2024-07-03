import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/db/schemas/**",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_DATABASE_AUTH_TOKEN!,
  },
};
