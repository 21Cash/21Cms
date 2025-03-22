import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { databaseURL } from "../constants";

const db = drizzle(databaseURL, { schema });

export { db };
