import { Hono } from 'hono'

/*
  The Worker in front of the static site. The portfolio has no server-side
  state: a health probe for uptime checks, then everything falls through to
  the built assets (single-page-application mode).
*/
type Env = { ASSETS: Fetcher }

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ ok: true }))
app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
