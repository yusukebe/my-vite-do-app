import { renderer } from './renderer'
import { Env } from './types'
import { Hono } from 'hono'

const app = new Hono<Env>()

app.use(renderer)

app.use(async (c, next) => {
  const name = c.req.query('name')
  if (!name) {
    return c.render(
      <>Select a Durable Object to contact by using the `name` URL query string parameter, for example, ?name=A</>
    )
  }
  c.set('name', name)
  const id = c.env.COUNTERS.idFromName(name)
  c.set('counters', c.env.COUNTERS.get(id))
  await next()
})

app.get('/', async (c) => {
  const count = await c.var.counters.getCounterValue()
  return c.render(
    <>
      Durable Object <b>{c.var.name}</b> count: <b>{count}</b>
    </>
  )
})

app.get('/increment', async (c) => {
  const count = await c.var.counters.increment()
  return c.render(
    <>
      Increment <b>{c.var.name}</b> count: <b>{count}</b>
    </>
  )
})

app.get('/decrement', async (c) => {
  const count = await c.var.counters.decrement()
  return c.render(
    <>
      Decrement <b>{c.var.name}</b> count: <b>{count}</b>
    </>
  )
})

export default app
export { Counter } from './counter'
