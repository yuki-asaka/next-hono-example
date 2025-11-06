import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { schema } from "./db/schema.js";

export type Env = {
  Variables: {
    db: PostgresJsDatabase<typeof schema>;
  };
};
