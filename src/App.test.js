import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App'
import React from 'react'

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
})
