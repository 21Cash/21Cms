import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { databaseURL } from "../constants";

config({ path: ".env" });

export default defineConfig({
  schema: "src/database/schema.ts",
  out: "src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseURL,
  },
  verbose: true,
  strict: true,
});
