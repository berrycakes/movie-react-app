import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getMovieList } from '../getMovieList'

const server = setupServer(
  rest.get(`http://www.omdbapi.com/`, (req, res, ctx) => {
    const Title = req.url.searchParams.get('s')
    return res(ctx.status(200), ctx.json({ Title }))
  }),
  rest.get('*', (req, res, ctx) => {
    console.error(`please add request handler for ${req.url.toString()}`)
    return res(
      ctx.status(500),
      ctx.json({ error: 'Please add request handler' })
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('API for fetching movie list', () => {
  test('fetch movie list', async () => {
    const response = await getMovieList('Spider-Man')
    expect(response).toEqual({ Title: 'Spider-Man/' })
  })

  test('catch error when search query does not exist', async () => {
    server.use(
      rest.get(`http://www.omdbapi.com/`, (req, res, ctx) => {
        return res(ctx.status(404))
      })
    )
    await expect(getMovieList('Spider-Man123')).rejects.toThrow('fetch error')
  })
})
