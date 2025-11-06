import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import {schema} from "./schema.js";

export function createClient(env: { DATABASE_URL: string }) {
    const databaseUrl = env.DATABASE_URL;

    const client = postgres(databaseUrl, {
        prepare: false,
        max: 1,
        idle_timeout: 20,
    });

    return drizzle(client, { schema });
}