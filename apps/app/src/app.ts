import {cors} from "hono/cors";
import type { Env } from "./types.js";
import {OpenAPIHono} from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import {articleRoute} from "./endpoints.js";
import {createClient} from "./db/client.js";


if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in the environment.");
}
const dbClient = createClient({ DATABASE_URL: process.env.DATABASE_URL });

const routes = new OpenAPIHono<Env>()
    .doc("/doc", {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Hono OpenAPI example",
            description: "OpenAPI for Hono example",
        }
    })
    .use("/*", cors({
        // FIXME: specify later
        origin: "*",
        allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        exposeHeaders: ["Content-Length"],
        maxAge: 864_000,
        credentials: true
    }))
    .use(async (c, next) => {
        c.set('db', dbClient);
        await next();
    })
    .get('/', (c) => {
        return c.json({ message: 'Hello Hono!' }, 200)
    })
    .get("/ui", swaggerUI({url: "/doc"}))
    .post('/hello', async (c) => {
        const body = await c.req.json<{ name: string }>()
        return c.json({ message: `Hello ${body.name}` }, 200)
    })
    .route("/articles", articleRoute)
    .onError((err, c) => {
        console.error("Unhandled error:", err);
        return c.json({ message: "Internal Server Error" }, 500)
    })

export default routes;
export type AppType = typeof routes;
