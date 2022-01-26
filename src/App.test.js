import React from 'react'
import {
  fireEvent,
  getByTitle,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import App from './App'
import Movies from './components/Movies'

describe('UI rendering', () => {
  test('render the search bar', () => {
    render(<App />)
    const searchBar = screen.getByTitle('searchBar')
    expect(searchBar).toBeInTheDocument()
  })

  test('change search bar input', () => {
    render(<App />)
    const input = screen.getByTitle('searchBar')
    expect(input.value).toBe('')
    fireEvent.change(input, {
      target: { value: 'Star Wars' },
    })
    expect(input.value).toBe('Star Wars')
  })

  test('render movie component', async () => {
    const mockClick = jest.fn()
    const mockStarClick = jest.fn()
    render(
      <Movies
        title="Spider-Man"
        poster="posterlink"
        year="2002"
        id="tt0848228"
        handleMovieClick={mockClick}
        handleStarClick={mockStarClick}
        watchList={[]}
      />
    )
    const movieElement = await waitFor(() =>
      screen.getByTitle('movie-title-container')
    )
    expect(movieElement).toHaveTextContent('Spider-Man')
  })

  test('click movie component', async () => {
    const mockClick = jest.fn()
    const mockStarClick = jest.fn()
    render(
      <Movies
        title="Spider-Man"
        poster="posterlink"
        year="2002"
        id="tt0848228"
        handleMovieClick={mockClick}
        handleStarClick={mockStarClick}
        watchList={[]}
      />
    )
    const movieElement = await waitFor(() =>
      screen.getByTitle('movie-title-container')
    )
    fireEvent.click(movieElement)
    expect(mockClick).toHaveBeenCalledTimes(1)
  })
})
