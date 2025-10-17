import {Env} from "./db/client";
import {Hono} from "hono";
import {cors} from "hono/cors";
import {articleRoutes} from "./routes/articles";


const routes = new Hono<{ Bindings: Env }>()
    .use("/*", cors({
        // FIXME: specify later
        origin: "*",
        allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
        maxAge: 864_000,
        credentials: true
    }))
    .get('/', (c) => {
        return c.json({ message: 'Hello Hono!' }, 200)
    })
    .post('/hello', async (c) => {
        const body = await c.req.json<{ name: string }>()
        return c.json({ message: `Hello ${body.name}` }, 200)
    })
    .route("/articles", articleRoutes);

export default routes;
export type AppType = typeof routes;
