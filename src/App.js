import React, { useEffect, useState } from 'react'
import './App.css'
import Movies from './components/Movies'
import SearchBar from './components/SearchBar'
import MovieDetails from './components/MovieDetails'
import placeholderPoster from './film-poster-placeholder.png'
import Watchlist from './components/Watchlist'

const apiKey = process.env.REACT_APP_OMDB_API_KEY
// const apiKey = 'f07d13b6'

function App(input) {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('spider man')
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false)
  const [watchList, setWatchlist] = useState([])
  const [errorMessage, setErrorMessage] = useState('error')
  // TODO: watchlist component

  useEffect(() => {
    const url = `http://www.omdbapi.com/?s=${query}/&apikey=${apiKey}`
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === 'False') {
            setMovies([])
            setErrorMessage(data.Error)
          } else {
            setMovies(data.Search)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }, [query])

  const addInput = (input) => {
    setQuery(input)
  }

  const handleModalClick = () => {
    setModalVisible(false)
  }

  const handleMovieClick = (id) => {
    setSelectedMovieId(id)
    setModalVisible(true)
  }

  const handleStarClick = (id, title) => {
    !watchList.find((item) => item.id === id)
      ? setWatchlist([{ id: id, title: title }, ...watchList])
      : setWatchlist(watchList.filter((item) => item.id !== id))
    console.log(watchList)
  }

  const sortBy = (a, b) => {
    return a['Year'] < b['Year'] ? 1 : a['Year'] > b['Year'] ? -1 : 0
  }

  return (
    <div className="App">
      <header>
        <h1>
          <a href="/">FetchFlix</a>
        </h1>
        <Watchlist watchList={watchList} />
        <SearchBar addInput={addInput} input={input} />
      </header>
      <main>
        {movies && movies.length > 0 ? (
          movies
            .sort(sortBy)
            .map((movie, index) => (
              <Movies
                watchList={watchList}
                handleMovieClick={handleMovieClick}
                handleStarClick={handleStarClick}
                key={index}
                title={movie.Title}
                poster={
                  movie.Poster === 'N/A' ? placeholderPoster : movie.Poster
                }
                year={movie.Year}
                id={movie.imdbID}
              />
            ))
        ) : (
          <div className="movie-not-found">
            <img src={placeholderPoster}></img>
            <p>{errorMessage}</p>
          </div>
        )}
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
