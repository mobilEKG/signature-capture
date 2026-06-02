import { describe, expect, it } from 'vitest'
import { routeDefinitions } from './routes.tsx'

describe('route definitions', () => {
  it('has a branded catch-all route instead of the React Router default error screen', () => {
    const childPaths = routeDefinitions[0].children?.map((route) => route.path)

    expect(childPaths).toContain('*')
  })
})
