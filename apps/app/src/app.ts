import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

const routes = app
    .use('*', cors({
        origin: '*'
    }))
    .get('/', (c) => {
        return c.json({ message: 'Hello Hono!' }, 200)
    })
    .post('/hello', async (c) => {
        const body = await c.req.json<{ name: string }>()
        return c.json({ message: `Hello ${body.name}` }, 200)
    })

export { routes as app }
export type AppType = typeof routes
