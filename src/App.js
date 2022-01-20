import React, { useEffect, useState } from 'react'
import './App.css'
import Movies from './components/Movies'
import SearchBar from './components/SearchBar'
import MovieDetails from './components/MovieDetails'

const apiKey = process.env.REACT_APP_OMDB_API_KEY

function App(input) {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('spider man')
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const url = `http://www.omdbapi.com/?s=${query}/&apikey=${apiKey}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search)
      })
  }, [query])

  const addInput = (input) => {
    setQuery(input)
  }

  const handleModalClick = () => {
    setModalVisible(false)
  }

  const handleMovieClick = (id) => {
    console.log({ id })
    setSelectedMovieId(id)
    setModalVisible(true)
  }

  const sortBy = (a, b) => {
    return a['Year'] < b['Year'] ? 1 : a['Year'] > b['Year'] ? -1 : 0
  }
  console.log({ isModalVisible })
  return (
    <div className="App">
      <header>
        <h1>FetchFlix</h1>
        <SearchBar addInput={addInput} input={input} />
      </header>
      <main>
        {movies.sort(sortBy).map((movie, index) => (
          <Movies
            handleMovieClick={handleMovieClick}
            key={index}
            title={movie.Title}
            poster={movie.Poster}
            year={movie.Year}
            id={movie.imdbID}
          />
        ))}
      </main>
      {isModalVisible ? (
        <MovieDetails
          handleModalClick={handleModalClick}
          id={selectedMovieId}
        />
      ) : null}
    </div>
  )
}

export default App
