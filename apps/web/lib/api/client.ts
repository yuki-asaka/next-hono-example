import type { AppType } from 'app'
import { hc } from 'hono/client'

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!)
