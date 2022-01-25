import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getMovieDetails } from '../getMovieDetails'

const server = setupServer(
  rest.get(`http://www.omdbapi.com/`, (req, res, ctx) => {
    const imdbID = req.url.searchParams.get('i')
    return res(ctx.status(200), ctx.json({ imdbID }))
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

describe('API for fetching movie details', () => {
  test('fetch movie list', async () => {
    const response = await getMovieDetails('tt0848228')
    expect(response).toEqual({ imdbID: 'tt0848228' })
  })

  test('catch error when id is invalid', async () => {
    server.use(
      rest.get(`http://www.omdbapi.com/`, (req, res, ctx) => {
        return res(ctx.status(404))
      })
    )
    await expect(getMovieDetails('Spider-Man123')).rejects.toThrow(
      'fetch error'
    )
  })
})
