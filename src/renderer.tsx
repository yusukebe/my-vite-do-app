import { jsxRenderer } from 'hono/jsx-renderer'
import { useRequestContext } from 'hono/jsx-renderer'
import { Env } from './types'

export const renderer = jsxRenderer(({ children }) => {
  const c = useRequestContext<Env>()
  return (
    <html>
      <head>
        <link href={import.meta.env.PROD ? `/assets/style.css` : `/src/style.css`} rel="stylesheet" />
      </head>
      <body>
        <nav>
          <ul>
            <li>
              <a href={c.var.name ? `/?name=${c.var.name}` : '/'}>Top</a>
            </li>
            <li>
              <a href={c.var.name ? `/increment?name=${c.var.name}` : '/increment'}>Increment</a>
            </li>
            <li>
              <a href={c.var.name ? `/decrement?name=${c.var.name}` : '/decrement'}>Decrement</a>
            </li>
            <li>
              <form action="/" method="get">
                <input name="name" type="text" placeholder={c.var.name} autocomplete="off" />
              </form>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
})
