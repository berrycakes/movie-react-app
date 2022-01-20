import React from 'react'

const Movies = ({ title, poster, year, id, handleMovieClick }) => {
  return (
    <div className="movie-container" onClick={() => handleMovieClick(id)}>
      <div className="movies">
        <img className="poster-container" src={poster} alt={title} />
        <div className="title-container">{title}</div>
        <div className="year-container">{year}</div>
      </div>
    </div>
  )
}

export default Movies
