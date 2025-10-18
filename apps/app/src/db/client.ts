import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";


export interface Env {
    DATABASE_URL: string;
    FRONTEND_URL: string;
    NODE_ENV: string;
}

export function createClient(env: Env) {
    const databaseUrl = env.DATABASE_URL;

    const client = postgres(databaseUrl, {
        prepare: false,
        max: 1,
        idle_timeout: 20,
    });

    return drizzle(client);
}